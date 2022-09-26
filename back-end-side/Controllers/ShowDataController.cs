using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowDataController : ControllerBase
    {
        List<InputModel> models = new List<InputModel>();
        [HttpPost]
        [DisableCors]
        [Produces("application/json")]
        public IActionResult Post([FromBody]InputModel model)
        {
            models.Add(model);
            return Ok(model);
        }
    }
}
