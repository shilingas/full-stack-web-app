using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpPut]
        [HttpPut("{workplace}")]
        [EnableCors("corsapp")]
        public IActionResult Put(string workplace)
        {
            var record = _context.Income.Where(x => x.Seller.Contains(workplace)).Select(x => x).ToList();
            foreach(var r in record)
            {
                var rec = _context.Income.Find(r.ID);
                rec.IsSelected = true;
                _context.SaveChanges();
            }
            
            return Ok();
        }

        [HttpDelete("{workplace}")]
        [EnableCors("corsapp")]
        public IActionResult Delete(string workplace)
        {
            var record = _context.Income.Where(x => x.Seller.Contains(workplace)).Select(x => x).ToList();
            foreach (var r in record)
            {
                var rec = _context.Income.Find(r.ID);
                rec.IsSelected = false;
                _context.SaveChanges();
            }
            return Ok();
        }
    }
}
