using back_end_side.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics;
using System.Reflection;
using System.Text;

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
            try
            {
                if (file.FormFile != null && file.FileName != null)
                {
                    ReportReader reportReader = new ReportReader(file.Bank, file.FormFile);
                    RecordsFromFile.AddRange(reportReader.ReadFromCsvFile());
                }

                return Ok(RecordsFromFile);
            }
            catch (Exception)
            {
                return BadRequest(RecordsFromFile);
            }
        }
    }
}
