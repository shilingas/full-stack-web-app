using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class SortingController : ControllerBase
    {
        [HttpGet]
        [EnableCors("corsapp")]
        public SortingModel Get ()
        {
            SortingModel data = Sorting.SortToCategories();

            return data;
        }

        [HttpPut("{index:int}")]
        [EnableCors("corsapp")]
        public IActionResult Put([FromBody] Record model, int index)
        {
            UploadController.RecordsFromFile[index] = model;
            Console.WriteLine(UploadController.RecordsFromFile[index].IsCategorized);

            return Ok(model);
        }
    }
}
