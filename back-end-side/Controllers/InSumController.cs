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

        [HttpGet]
        [EnableCors("corsapp")]
        public double Get()
        {
            var sum = _context.Income.Where(x => x.IsSelected == true).Select(x => x.Amount).Sum();
            Console.WriteLine(sum);
            return sum;
        }


    }
}
