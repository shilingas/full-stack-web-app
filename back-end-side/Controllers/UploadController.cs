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
        public static readonly List<Record> RecordsFromFile = new List<Record>();

        [HttpPost]
        public ActionResult Post([FromForm] FileModel file)
        {
            ReportReader reportReader = new ReportReader(file.Bank);
            try
            {
                if (file.FormFile != null && file.FileName != null)
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "uploadedFiles", file.FileName); 
                    string newPath = Path.Combine(Directory.GetCurrentDirectory(), "uploadedFiles", "report.csv");
                   
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    file.FormFile.CopyTo(stream);
                    System.IO.File.Copy(path, newPath);
                     
                    RecordsFromFile.AddRange(reportReader.ReadFromCsvFile());
                    if (System.IO.File.Exists(path) && System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(Path.Combine(path));
                        System.IO.File.Delete(Path.Combine(newPath));

                    }
                }

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
