using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using back_end_side.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;
using Record = back_end_side.Models.Record;

namespace back_end_side.UnitTests.Services
{
    public class UploadServiceTests
    {
        [Fact]
        public async Task GetIncomeData_IncomeDatabaseIsEmpty_OneRecordIsAdded()
        {
            var context = await GetDatabaseContext();

            var incomeList = new List<Record> {
                new Record
                {
                    ID = 1,
                    Date = new DateTime(2022,11,19),
                    Seller = "Workplace",
                    Purpose = "Salary",
                    Amount = 1000
                }
            };
            var mockReader = new Mock<IReportReader>();
            mockReader.Setup(m => m.GetIncomeList()).Returns(incomeList);

            var income = new IncomeModel
            {
                ID = 1,
                Date = new DateTime(2022, 11, 19),
                Seller = "Workplace",
                Purpose = "Salary",
                Amount = 1000
            };

            var uploadService = new UploadService(context, mockReader.Object);
            await uploadService.GetIncomeData();
            var result = await context.Income.FindAsync(1);

            var expected = JsonConvert.SerializeObject(income);
            var actual = JsonConvert.SerializeObject(result);

            Assert.Equal(expected, actual);

        }
        private async Task<ExpensesContext> GetDatabaseContext()
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
