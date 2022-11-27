using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class IncomeController : Controller
    {
        private readonly ExpensesContext _context;
        private readonly IReportReader _reader;

        public IncomeController(ExpensesContext context, IReportReader reader)
        {
            _context = context;
            _reader = reader;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public IncomeModel[] Get()
        {
            var incomeArray = _context.Income.ToArray();
            return incomeArray;
        }
    }
}
