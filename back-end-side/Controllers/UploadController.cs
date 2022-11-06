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
            new FileController(context);
        }


        [HttpPost]
        public ActionResult Post([FromForm] FileModel file)
        {
            try
            {
                if (file.FormFile != null && file.FileName != null)
                {
                    
                    ReportReader reportReader = new ReportReader(fileData: file.FormFile);
                    
                    //RecordsFromFile.Sort();
                    _context.Expenses.AddRange(reportReader.ReadFromCsvFile());
                    _context.RemoveDuplicates();
                    _context.SaveChanges();
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
