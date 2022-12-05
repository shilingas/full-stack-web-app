using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Controllers
{
    
    [ApiController]
    [EnableCors("corsapp")]
    [Route("api/[controller]/[action]")]
    public class IncomeController : Controller
    {
        private readonly ExpensesContext _context;

        public IncomeController(ExpensesContext context)
        {
            _context = context;
        }

        [HttpGet("{date}")]
        [EnableCors("corsapp")]
        public IncomeModel[] Get(string date)
        {
            IncomeModel[] incomeArray = new IncomeModel[5];
            if (date.Equals("total"))
            {
                incomeArray = _context.Income.OrderBy(x => x.Date).ToArray();
            }
            else
            {
                var selectedDate = Convert.ToDateTime(date);
                incomeArray = _context.Income
                    .Where(x => x.Date.Year == selectedDate.Year && x.Date.Month == selectedDate.Month)
                    .Select(x => x)
                    .OrderBy(x => x.Date).ToArray();
            }
            
            return incomeArray;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public IncomeModel[] GetAll()
        {
            var incomeArray = _context.Income.OrderBy(x => x.Date).ToArray();
            return incomeArray;
        }


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

        [HttpPut("{id:int}")]
        [EnableCors("corsapp")]
        public IActionResult Edit([FromBody] IncomeModel model, int id)
        {
            var recordToUpdate = _context.Income.Find(id);

            try
            {
                if (recordToUpdate != null)
                {
                    recordToUpdate.Date = model.Date;
                    recordToUpdate.Seller = model.Seller;
                    recordToUpdate.Purpose = model.Purpose;
                    recordToUpdate.Amount = model.Amount;
                    recordToUpdate.IsSelected = model.IsSelected;
                    recordToUpdate.IsAdded = model.IsAdded;
                    _context.SaveChanges();
                }
            }
            catch (DbUpdateException ex)
            {
                Logger.WriteLog(ex.ToString());
            }
            return Ok();
        }

        [HttpPut("{id}")]
        [EnableCors("corsapp")]
        public IActionResult AddRecord(int id)
        {
            var record = _context.Income.Find(id);
            if (record != null)
            {
                record.IsAdded= true;
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

        [HttpDelete("{id}")]
        [EnableCors("corsapp")]
        public IActionResult Remove(int id)
        {
            var record = _context.Income.Find(id);
            record.IsSelected = false;
            record.IsAdded = false;
            _context.SaveChanges();
            return Ok();
        }

    }
}
