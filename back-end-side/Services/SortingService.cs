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

        public SortingService(ExpensesContext context)
        {
            _context = context;
        }

        private readonly SemaphoreSlim someLock = new SemaphoreSlim(1, 1);

        public async Task ChangeCategory(Record model, int index)
        {
            await someLock.WaitAsync();
            try
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
                    Logger.WriteLog(ex.ToString());
                }
            }
            finally
            {
                someLock.Release();
            }
        }
    }
}
