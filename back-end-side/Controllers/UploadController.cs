﻿using back_end_side.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Reflection;

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
            
            Console.WriteLine("BANK: " + file.Bank);
            ReportReader.bank = file.Bank;
            try
            {
                if (file.FormFile != null && file.FileName != null)
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "uploadedFiles", file.FileName); 
                    string newPath = Path.Combine(Directory.GetCurrentDirectory(), "uploadedFiles", "report.csv");
                   
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        file.FormFile.CopyTo(stream);
                        System.IO.File.Copy(path, newPath);
                    } 
                    RecordsFromFile.AddRange(ReportReader.ReadFromCsvFile());
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
