using back_end_side.DbFiles;
using back_end_side.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Record = back_end_side.Models.Record;

namespace back_end_side.UnitTests.Services
{
    public class SortingServiceTests
    {
        [Fact]
        public async Task ChangeCategory_OneRecordFromZaraExists_RecordFromZaraCategoryisChangedToEntertainment()
        {
            var context = await GetDatabaseContext();
            var record1 = new Record
            {
                ID = 1,
                Seller = "zara",
                Purpose = "jeans",
                Date = new DateTime(2022 - 11 - 19),
                Amount = 20,
                Category = "clothes",
                IsCategorized = true
            };
            var record2 = new Record
            {
                ID = 1,
                Seller = "zara",
                Purpose = "jeans",
                Date = new DateTime(2022 - 11 - 19),
                Amount = 20,
                Category = "entertainment",
                IsCategorized = true
            };
            context.Add(record1);
            var service = new SortingService(context);
            service.ChangeCategory(record2, record2.ID);

            Assert.Equal(record1.Category, record2.Category);

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
