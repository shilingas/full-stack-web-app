﻿using back_end_side.Models;
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
            try
            {
                if (file.FormFile != null && file.FileName != null)
                {
                    ReportReader reportReader = new ReportReader(fileData: file.FormFile, bank: file.Bank);
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
