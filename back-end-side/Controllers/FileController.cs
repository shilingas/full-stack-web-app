﻿using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class FileController : ControllerBase
    {
        private readonly ExpensesContext _context;
        private readonly ISorting _sorting;

        public FileController(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public async Task<Record[]> GetFile()
        {
            _sorting.SortToCategories();
            var FileData = await _context.Expenses.ToArrayAsync();
            Array.Sort(FileData);

            var CurrentDate = DateTime.Now.ToString("yyyy-MM-dd").Substring(0, 7);

            var CurrentMonthData = _context.Expenses
                .Where(x => x.Date.ToString().StartsWith(CurrentDate))
                .Select(x => x)
                .ToArray();
            return CurrentMonthData;
        }
    }
}
