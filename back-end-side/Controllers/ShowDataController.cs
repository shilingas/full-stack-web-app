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
       static List<InputModel> models = new List<InputModel>();
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody]InputModel model)
        {
            model.Category = Sorting.CheckInput(model);
            models.Add(model);
            return Ok(model);
        }
        [HttpGet]
        [EnableCors("corsapp")]
        public List<InputModel> GetAll()
        {
            return models;
        }
    }
}
