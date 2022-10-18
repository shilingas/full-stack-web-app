using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class ShowDataController : ControllerBase
    {
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody]Record model)
        {
            model.Category = Sorting.CheckInput(model);
            UploadController.RecordsFromFile.Add(model);
            UploadController.RecordsFromFile.Sort();
            return Ok(model);
        }
        [HttpGet]
        [EnableCors("corsapp")]
        public List<Record> GetAll()
        {
            return UploadController.RecordsFromFile;
        }
    }
}
