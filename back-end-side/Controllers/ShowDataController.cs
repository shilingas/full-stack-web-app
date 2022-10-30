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
        [EnableCors("corsapp")]
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
        [HttpPut("{id:int}")]
        [EnableCors("corsapp")]
        public IActionResult Put([FromBody] Record model, int id)
        {
            // pirma - nustatom kategorija, tada pakeiciam tam tikru indexo value ir tada sortinam
            model.Category = Sorting.CheckInput(model);
            UploadController.RecordsFromFile[id] = model;
            UploadController.RecordsFromFile.Sort();
            return Ok(model);
        }
        [HttpDelete("{id:int}")]
        [EnableCors("corsapp")]
        public IActionResult Remove(int id)
        {
            UploadController.RecordsFromFile.RemoveAt(id);
            return Ok();
        }
    }
}
