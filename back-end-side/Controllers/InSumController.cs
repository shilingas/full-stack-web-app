using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class InSumController : Controller
    {
        private readonly ExpensesContext _context;

        public InSumController(ExpensesContext context, IReportReader reader)
        {
            _context = context;
        }

        [HttpGet("{date}")]
        [EnableCors("corsapp")]
        public double Get(string date)
        {
            double sum;
            if (date.Equals("total"))
            {
                sum = _context.Income.Where(x => x.IsSelected == true || x.IsAdded == true).Select(x => x.Amount).Sum();
            }
            else
            {
                var selectedDate = Convert.ToDateTime(date);
                sum = _context.Income
                    .Where(x => x.Date.Year == selectedDate.Year && x.Date.Month == selectedDate.Month && (x.IsSelected == true || x.IsAdded == true))
                    .Select(x => x.Amount)
                    .Sum();
            }
            return sum;
        }


    }
}
