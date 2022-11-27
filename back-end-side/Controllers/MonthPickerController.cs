using back_end_side.DbFiles;
using back_end_side.Models;
using back_end_side.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Buffers;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class MonthPickerController : ControllerBase
    {
        private readonly ExpensesContext _context;

        public MonthPickerController(ExpensesContext context)
        {
            _context = context;
        }

        [HttpGet("{PickedDate}")]
        [EnableCors("corsapp")]
        public Record[] Get(string PickedDate)
        {
            Console.WriteLine(PickedDate);

            if (!PickedDate.Equals("total")) {
                var sortedByMonth = _context.Expenses
                                .Where(x => x.Date.ToString().StartsWith(PickedDate))
                                .Select(x => x)
                                .ToArray();

                return sortedByMonth;
            } else
            {
                var sortedByMonth = _context.Expenses.ToArray();
                Array.Sort(sortedByMonth);
                return sortedByMonth;
            }

        }

    }
}
