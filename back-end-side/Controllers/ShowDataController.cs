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
    public class ShowDataController : ControllerBase
    {
        private readonly ExpensesContext _context;
        private readonly ISorting _sorting;

        public ShowDataController(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }

        [HttpPost]
        [Produces("application/json")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Post([FromBody] Record model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    model.Category = _sorting.CheckInput(model);
                    _context.Add(model);
                    await _context.SaveChangesAsync();

                }
            }
            catch (DbUpdateException  ex )
            {
                Console.WriteLine(ex);
            }

            return Ok(model);
        }
        [HttpGet]
        [EnableCors("corsapp")]
        public async Task<Record[]> GetAll()
        {
            var data = await _context.Expenses.ToArrayAsync();
            return data;
        }

        [HttpPut("{id:int}")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Put([FromBody] Record model, int id)
        {
            var recordToUpdate = await _context.Expenses.FindAsync(id);
           
            try
            {
                if (recordToUpdate != null)
                {
                    recordToUpdate.Date = model.Date;
                    recordToUpdate.Seller = model.Seller;
                    recordToUpdate.Purpose = model.Purpose;
                    recordToUpdate.Amount = model.Amount;
                    recordToUpdate.Category = _sorting.CheckInput(model);
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException ex )
            {
                Console.WriteLine(ex);
            }
            return Ok(model);
        }
        [HttpDelete("{id:int}")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Delete(int id)
        {
            var record = await _context.Expenses.FindAsync(id);
            if (record == null)
            {
                Console.WriteLine("Couldn't find record");
                return Ok();
            }
            else
            {
                _context.Expenses.Remove(record);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
    }
}