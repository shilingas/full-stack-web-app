using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Record = back_end_side.Models.Record;

namespace back_end_side.UnitTests.Services
{
    public class ShowDataServicesTests
    {
        [Fact]
        public async Task AddRecord_EmptyDatabaseExists_OneRecordOfCategoryFoodIsAdded()
        {
            var record1 = new Record
            {
                Seller = "maxima",
                Purpose = "duona",
                Date = new DateTime(2022 - 11 - 19),
                Amount = 5
            };
            var context = await GetDatabaseContext();
            var mockSorting = new Mock<ISorting>();
            mockSorting.Setup(x => x.CheckInput(record1)).Returns("food");
            var service = new ShowDataService(context, mockSorting.Object);

            await service.AddRecord(record1);

            var result = await context.Expenses.FindAsync(record1.ID);
            Assert.Equal(result.ID, record1.ID);

        }
        [Fact]
        public async Task EditData_recordFromMaximaAntItsIDIsPassed_RecordWithPassedIDIsUpdatedToRecordFromNorfa()
        {
            var record1 = new Record
            {
                ID = 1,
                Seller = "maxima",
                Purpose = "duona",
                Date = new DateTime(2022 - 11 - 19),
                Amount = 5
            };
            var record2 = new Record
            {
                Seller = "norfa",
                Purpose = "pienas",
                Date = new DateTime(2022 - 10 - 19),
                Amount = 10
            };

            var context = await GetDatabaseContext();
            context.Add(record1);
            context.SaveChanges();

            var mockSorting = new Mock<ISorting>();
            mockSorting.Setup(x => x.CheckInput(record1)).Returns("food");

            var service = new ShowDataService(context, mockSorting.Object);
            await service.EditData(record2, record1.ID);

            var actual = await context.Expenses.FindAsync(record1.ID);
            Assert.Equal(record2, actual);

        }
        [Fact]
        public async Task DeleteRecord_OneRecordExists_OneRecordIsDeleted()
        {
            var context = await GetDatabaseContext();
            var record1 = new Record
            {
                ID = 1,
                Seller = "maxima",
                Purpose = "duona",
                Date = new DateTime(2022 - 11 - 19),
                Amount = 5
            };
            context.Add(record1);
            context.SaveChanges();

            var mockSorting = new Mock<ISorting>();

            var service = new ShowDataService(context, mockSorting.Object);
            await service.DeleteRecord(record1.ID);


            var actual = await context.Expenses.AnyAsync();

            Assert.False(actual);

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
