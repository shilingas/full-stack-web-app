using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace back_end_side.Controllers
{   
    [EnableCors("corsapp")]
    [Route("api/[controller]")]
    [ApiController]
    
    public class UploadController : ControllerBase
    {
        [HttpPost ("ImportFile")]
        //[Produces("application/json")]
        public ActionResult Post([FromForm] FileModel file)
        {

            //return Ok(file);
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
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
