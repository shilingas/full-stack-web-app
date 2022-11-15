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
        private readonly ISorting _sorting;

        public SortingController(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public SortingModel Get()
        {
            SortingModel data = _sorting.SortToCategories();
            return data;
        }

        [HttpPut("{index:int}")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Put([FromBody] Record model, int index)
        {
            var recordToUpdate = await _context.Expenses.FindAsync(index);
            try
            {
                if (recordToUpdate != null)
                {
                    recordToUpdate.Category = model.Category;
                    recordToUpdate.IsCategorized = model.IsCategorized;
                    await _context.SaveChangesAsync();
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
