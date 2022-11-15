using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{   

    [EnableCors("corsapp")]
    [Route("api/[controller]")]
    [ApiController]
    
    public class UploadController : ControllerBase
    {

        private readonly ExpensesContext _context;

        public UploadController(ExpensesContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] FileModel file)
        {
            try
            {
                if (file.FormFile != null && file.FileName != null)
                {
                    ReportReader reportReader = new ReportReader(fileData: file.FormFile, _context);
                    var dataFromFile = reportReader.ReadFromCsvFile(RemoveDuplicates);
                    _context.Expenses.AddRange(dataFromFile);
                    await _context.SaveChangesAsync();
                } 

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private void RemoveDuplicates(List<Record> list, ExpensesContext context)
        {
            //removing duplicates in list
            var uniqueList = list.Where(i => i.ExpenseCode != null).DistinctBy(i => i.ExpenseCode).ToList();
            var nullList = list.Where(i => i.ExpenseCode == null).ToList();
            uniqueList.AddRange(nullList);
            list.Clear();
            list.AddRange(uniqueList);
            //removing records that duplicate with database records
            list.RemoveAll(record => context.Expenses.SingleOrDefault(r => r.ExpenseCode == record.ExpenseCode) != null);

        }
    }
}
