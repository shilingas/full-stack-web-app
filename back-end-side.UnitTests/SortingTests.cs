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
            var _contextOptions = new DbContextOptionsBuilder<ExpensesContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            using var context = new ExpensesContext(_contextOptions);
           
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var record1 = new Record { Seller = "maxima", Amount = 20.3 };
            var record2 = new Record { Seller = "maxima", Amount = 30.2 };
           
            context.AddRange(record1, record2);
            context.SaveChanges();

            var _sorting = new Sorting(context);
            var result = _sorting.SortToCategories();

            Assert.Equal(50.5, result.FoodSum);
          
        }

    }
}