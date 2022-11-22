using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Services
{
    public class ShowDataService : IShowDataService
    {
        private readonly ExpensesContext _context;
        private readonly ISorting _sorting;
        public ShowDataService(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }

        private readonly SemaphoreSlim someLock = new SemaphoreSlim(1, 1);

        public async Task AddRecord(Record record)
        {
            await someLock.WaitAsync();
            try
            {
                try
                {
                    //if (ModelState.IsValid)
                    record.Category = _sorting.CheckInput(record);
                    _context.Add(record);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    Console.WriteLine(ex);
                }
            }
            finally
            {
                someLock.Release();
            }
        }

        public async Task EditData(Record model, int id)
        {
            await someLock.WaitAsync();
            try
            {
                var recordToUpdate = await _context.Expenses.FindAsync(id);

                try
                {
                    if (recordToUpdate != null)
                    {
                        recordToUpdate.Date = model.Date;
                        recordToUpdate.Seller = model.Seller;
                        recordToUpdate.Purpose = model.Purpose;
                        recordToUpdate.Amount = model.Amount;
                        recordToUpdate.Category = _sorting.CheckInput(model);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (DbUpdateException ex)
                {
                    Console.WriteLine(ex);
                }
            }
            finally
            {
                someLock.Release();
            }
        }

        public async Task DeleteRecord(int id)
        {
            await someLock.WaitAsync();
            try
            {
                var record = await _context.Expenses.FindAsync(id);
                if (record == null)
                {
                    Console.WriteLine("Couldn't find record");
                }
                else
                {
                    _context.Expenses.Remove(record);
                    await _context.SaveChangesAsync();
                }
            }
            finally
            {
                someLock.Release();
            }
        }
    }
}
