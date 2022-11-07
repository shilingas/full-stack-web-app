using back_end_side.DbFiles;
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
    public class SortingController : ControllerBase
    {
        private readonly ExpensesContext _context;

        public SortingController(ExpensesContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public SortingModel Get()
        {
            var sorting = new Sorting(_context);
            SortingModel data = sorting.SortToCategories();

            return data;
        }

        [HttpPut("{index:int}")]
        [EnableCors("corsapp")]
        public IActionResult Put([FromBody] Record model, int index)
        {
            var sorting = new Sorting(_context);
            var recordToUpdate = _context.Expenses.FirstOrDefault(r => r.ID == index);
            try
            {
                if (recordToUpdate != null)
                {
                    recordToUpdate.Category = model.Category;
                    recordToUpdate.IsCategorized = model.IsCategorized;
                    _context.SaveChanges();
                }
            }
            catch (DbUpdateException ex )
            {
                Console.WriteLine(ex);
            }

            return Ok(model);
        }
    }
}
