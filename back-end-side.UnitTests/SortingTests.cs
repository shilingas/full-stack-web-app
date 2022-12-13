using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Moq;
using System;
using System.Reflection.Metadata;
using Record = back_end_side.Models.Record;

namespace back_end_side.UnitTests
{
    public class SortingTests
    {

        [Fact]
        public void SortToCateories_TwoRecordsFromMaximaExists_ReturnsSumOfTheRecordsAmount()
        {
            using var context = GetDatabaseContext();

            context.Database.EnsureCreated();

            var record1 = new Record { Seller = "maxima", Amount = 20.3 };
            var record2 = new Record { Seller = "maxima", Amount = 30.2 };
            var record3 = new Record
            {
                Date = new DateTime(2022,12,10),
                Seller = "Kazkas",
                Amount = 20
            };
            var record4 = new Record
            {
                Date = new DateTime(2022,12,05),
                Seller = "Parduotuve",
                Amount = 30
            };
            var record5 = new Record
            {
                Date = new DateTime(2022,11,19),
                Seller = "Mama",
                Amount = 10
            };

            context.AddRange(record1, record2, record3, record4, record5);
            context.SaveChanges();

            var _sorting = new Sorting(context);
            var result = _sorting.SortToCategories();
            var resultDec = _sorting.SortToCategories("2022-12");

            Assert.Equal(50.5, result.FoodSum);
            Assert.Equal(60, result.OtherSum);
            Assert.Equal(50, resultDec.OtherSum);
            Assert.Equal("other", record3.Category);
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