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
                    ReportReader reportReader = new ReportReader(fileData: file.FormFile);
                    var dataFromFile = reportReader.ReadFromCsvFile();
                    dataFromFile.RemoveDuplicates(_context);
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
    }
}
