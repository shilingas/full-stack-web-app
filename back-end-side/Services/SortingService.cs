using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Services
{
    public class SortingService : ISortingService
    {
        private readonly ExpensesContext _context;
        private readonly ISorting _sorting;

        public SortingService(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }




        public async Task ChangeCategory(Record model, int index)
        {
            var recordToUpdate = await _context.Expenses.FindAsync(index);
            try
            {
                if (recordToUpdate != null)
                {
                    recordToUpdate.Category = model.Category;
                    recordToUpdate.IsCategorized = model.IsCategorized;
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
