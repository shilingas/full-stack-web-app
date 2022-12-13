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

            var expected = "Firmine parduotuve\\Tilzes g. 133\\Siauliai\\76349     LTULTU";
            var actual = context.Expenses.Find(1).Seller;
            Assert.Equal(expected, actual);

            var expectedSwed = "X-097 MAXIMA\\MINDAUGO G. 11/2\\VILNIUS\\\\LTULTU";
            var actualSwed = context.Expenses.Find(3).Seller;
            Assert.Equal(expectedSwed, actualSwed);

            var expectedPay = "Hesburger Vilnius Ukmerge ";
            var actualPay = context.Expenses.Find(5).Seller;
            Assert.Equal(expectedPay, actualPay);

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
