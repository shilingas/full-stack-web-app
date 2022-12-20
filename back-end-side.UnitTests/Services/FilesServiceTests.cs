using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;
using Record = back_end_side.Models.Record;

namespace back_end_side.UnitTests.Services
{
    public class FileServiceTests
    {
        [Fact]
        public void GetFileData_twoRecordsExist_oneRecordFromDecemberIsReturned()
        {
            var context = GetDatabaseContext();
            var record1 = new Record
            {
                ID = 1,
                Seller = "zara",
                Purpose = "jeans",
                Date = new DateTime(2022, 11, 19),
                Amount = 20,
                Category = "clothes",
                IsCategorized = true
            };
            var record2 = new Record
            {
                ID = 2,
                Seller = "maixma",
                Purpose = "kazkas",
                Date = new DateTime(2022, 12, 19),
                Amount = 50,
                Category = "food",
                IsCategorized = true
            };

            context.AddRange(record1, record2);
            context.SaveChanges();

            var mockSorting = new Mock<ISorting>();
            mockSorting.Setup(x => x.SortToCategories("")).Returns(null);

            var fileService = new FileService(context, mockSorting.Object);
            var result = fileService.GetFileData();

            var expected = JsonConvert.SerializeObject(record2);
            var actual = JsonConvert.SerializeObject(result[0]);

            Assert.Equal(expected, actual);
            Assert.Single(result);
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
