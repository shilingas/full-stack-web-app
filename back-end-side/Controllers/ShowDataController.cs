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

        public ShowDataController(ExpensesContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Produces("application/json")]
        [EnableCors("corsapp")]
        public IActionResult Post([FromBody] Record model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var sorting = new Sorting(_context);
                    model.Category = sorting.CheckInput(model);
                    _context.Add(model);
                    _context.SaveChanges();

                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                /*ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");*/
            }

            return Ok(model);
        }
        [HttpGet]
        [EnableCors("corsapp")]
        public DbSet<Record> GetAll()
        {
            return _context.Expenses;
        }

        [HttpPut("{id:int}")]
        [EnableCors("corsapp")]
        public IActionResult Put([FromBody] Record model, int id)
        {
            var sorting = new Sorting(_context);
            var recordToUpdate = _context.Expenses.FirstOrDefault(r => r.ID.Equals(id));
           
            try
            {
                if (recordToUpdate != null)
                {
                    recordToUpdate.Date = model.Date;
                    recordToUpdate.Seller = model.Seller;
                    recordToUpdate.Purpose = model.Purpose;
                    recordToUpdate.Amount = model.Amount;
                    recordToUpdate.Category = sorting.CheckInput(model);
                    _context.SaveChanges();
                }

                //UploadController.RecordsFromFile.Sort();
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.)
                /*ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator.");*/
            }
            return Ok(model);
        }
        [HttpDelete("{id:int}")]
        [EnableCors("corsapp")]
        public IActionResult Delete(int id)
        {
            var record = _context.Expenses.AsNoTracking().FirstOrDefault(r => r.ID.Equals(id));
            if (record == null)
            {
                return NotFound();
            }
            else
            {
                _context.Expenses.Attach(record);
                _context.Expenses.Remove(record);
                _context.SaveChanges();
            }
            return Ok();
        }
    }
}