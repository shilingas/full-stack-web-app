using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class CheckController : ControllerBase
    {
        CheckModel[] products = new CheckModel[]
                {
new CheckModel { id = 1, marketName = "maxima" },

new CheckModel { id = 2, marketName = "norfa" },

new CheckModel { id = 3, marketName = "lidl" },

new CheckModel { id = 4, marketName = "test" },
new CheckModel { id = 5, marketName = "aha" },

new CheckModel { id = 6, marketName = "XD" },
new CheckModel { id = 7, marketName = "LOL" },
new CheckModel { id = 8, marketName = "testuoju"}
                };
        [HttpGet]
        public List<CheckModel> Get()
        {
            return products.ToList();
        }

    }
}
