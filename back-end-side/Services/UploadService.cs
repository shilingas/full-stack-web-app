using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Services
{
    public class UploadService : IUploadService
    {
        private readonly ExpensesContext _context;
        private readonly IReportReader _reader;

        public UploadService(ExpensesContext context, IReportReader reader)
        {
            _context = context;
            _reader = reader;
        }

        private readonly SemaphoreSlim someLock = new SemaphoreSlim(1, 1);

        public async Task GetFileData(FileModel file)
        {
            await someLock.WaitAsync();
            try
            {
                try
                {
                    if (file.FormFile != null && file.FileName != null)
                    {
                        var dataFromFile = _reader.ReadFromCsvFile(file.FormFile, RemoveDuplicates);
                        if (dataFromFile != null)
                            _context.Expenses.AddRange(dataFromFile);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception e)
                {
                    Logger.WriteLog(e.ToString());
                }
            }
            finally
            {
                someLock.Release();
            }
        }

        public async Task GetIncomeData()
        {
            var data = _reader.GetIncomeList();
            var incomeList = new List<IncomeModel>();
            foreach (var item in data)
            {
                var income = new IncomeModel
                {
                    Date = item.Date,
                    Seller = item.Seller,
                    Purpose = item.Purpose,
                    Amount = item.Amount,
                    ExpenseCode = item.ExpenseCode,
                };
                incomeList.Add(income);
            }
            await _context.Income.AddRangeAsync(incomeList);
            await _context.SaveChangesAsync();
        }

        private void RemoveDuplicates(List<Record> list)
        {
            //removing duplicates in list
            var uniqueList = list.Where(i => i.ExpenseCode != null).DistinctBy(i => i.ExpenseCode).ToList();
            var nullList = list.Where(i => i.ExpenseCode == null).ToList();
            uniqueList.AddRange(nullList);
            list.Clear();
            list.AddRange(uniqueList);
            //removing records that duplicate with database records
            list.RemoveAll(record => _context.Expenses.SingleOrDefault(r => r.ExpenseCode == record.ExpenseCode) != null);
        }
    }
}
