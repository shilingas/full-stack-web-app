﻿using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Services
{
    public class FileService : IFileService
    {
        private readonly ExpensesContext _context;
        private readonly ISorting _sorting;
        public FileService(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }
        public Record[] GetFileData()
        {
            _sorting.SortToCategories();

            var CurrentDate = DateTime.Now.ToString("yyyy-MM-dd").Substring(0, 7);

            var CurrentMonthData = _context.Expenses
                .Where(x => x.Date.ToString().StartsWith(CurrentDate))
                .Select(x => x)
                .OrderBy(x => x.Date)
                .ToArray();
            return CurrentMonthData;
        }
    }
}
