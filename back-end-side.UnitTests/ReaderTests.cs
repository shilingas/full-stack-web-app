using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using back_end_side.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Record = back_end_side.Models.Record;

namespace back_end_side.UnitTests
{
    public class ReaderTests
    {
        
        [Fact]
        public async Task GetFileData_SEBfileWithTwoRecordsIsGiven_SavesTwoRecordsToDatabase()
        {
            FileModel fileModel = new FileModel
            {
                FileName = "seb.csv",
                FormFile = null
            };

            var context = GetDatabaseContext();
            var reader = new ReportReader();
            var uploadService = new UploadService(context, reader);

            var codeBaseUrl = new Uri(Assembly.GetExecutingAssembly().CodeBase);
            var codeBasePath = Uri.UnescapeDataString(codeBaseUrl.AbsolutePath);
            var dirPath = Path.GetDirectoryName(codeBasePath);

            var path = Path.Combine(dirPath, "testFiles\\seb.csv");

            using (var stream = File.OpenRead(path))
            {
                var file = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name));
                fileModel.FormFile = file;
                await uploadService.GetFileData(fileModel);
            }

            var pathSw = Path.Combine(dirPath, "testFiles\\swedbank.csv");

            using (var stream = File.OpenRead(pathSw))
            {
                var file = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name));
                fileModel.FormFile = file;
                fileModel.FileName = "swedbank.csv";
                await uploadService.GetFileData(fileModel);
            }

            var pathP = Path.Combine(dirPath, "testFiles\\paysera.csv");

            using (var stream = File.OpenRead(pathP))
            {
                var file = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name));
                fileModel.FormFile = file;
                fileModel.FileName = "paysera.csv";
                await uploadService.GetFileData(fileModel);
            }

            var expectedRecord = new Record
            {
                ID = 1,
                Date = new DateTime(2022, 09, 26),
                Seller = "Firmine parduotuve\\Tilzes g. 133\\Siauliai\\76349     LTULTU",
                Purpose = "24/09/2022 15:32 kortelė...665348 Firmine parduotuve/Siauliai/LTU #456000, dok. nr. CLR4729223, operacijos nr. RO856568306L01",
                Amount = 5.6,
                PaymentType = "D",
                ExpenseCode = "RO856568306L01"
            };

            var actualRecord = context.Expenses.Find(1);

            var SEBEx = JsonConvert.SerializeObject(expectedRecord);
            var SEBAc = JsonConvert.SerializeObject(actualRecord);
            
            var expectedRecordSw = new Record
            {
                ID = 3,
                Date = new DateTime(2022, 10, 01),
                Seller = "X-097 MAXIMA\\MINDAUGO G. 11/2\\VILNIUS\\\\LTULTU",
                Purpose = "PIRKINYS 516793******5265 2022.09.30 1.19 EUR (805312) X-097 MAXIMA\\MINDAUGO G. 11/2\\VILNIUS\\\\LTULTU",
                Amount = 1.19,
                PaymentType = "D",
                ExpenseCode = "2022100100459572"
            };

            var actualRecordSw = context.Expenses.Find(3);

            var SwedExp = JsonConvert.SerializeObject(expectedRecordSw);
            var SwedAc = JsonConvert.SerializeObject(actualRecordSw);

            var expectedRecordP = new Record
            {
                ID = 5,
                Date = new DateTime(2021, 09, 04, 11, 40, 21, DateTimeKind.Local),
                Seller = "Hesburger Vilnius Ukmerge ",
                Purpose = "Pirkinys 2021-09-02 23:09:00 Hesburger Vilnius Ukmerge, 07160, Vilnius, LT CD 1335 (230854)",
                Amount = 10.7,
                PaymentType = "D",
                ExpenseCode = "990309762"
            };

            var actualRecordP = context.Expenses.Find(5);

            var PayseraExp = JsonConvert.SerializeObject(expectedRecordP);
            var PayseraAc = JsonConvert.SerializeObject(actualRecordP);

            Assert.Equal(SEBEx, SEBAc);
            Assert.Equal(SwedExp, SwedAc);
            Assert.Equal(PayseraExp, PayseraAc);
        }

        private ExpensesContext GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<ExpensesContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var context = new ExpensesContext(options);
            context.Database.EnsureCreated();

            return context;
        }
    }
}
