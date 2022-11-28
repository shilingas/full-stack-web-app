using back_end_side.DbFiles;
using back_end_side.Models;
using back_end_side.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class SumsByMonthController : ControllerBase
    {
        private readonly ISorting _sorting;

        public SumsByMonthController(ISorting sorting)
        {
            _sorting = sorting;
        }

        [HttpGet("{PickedDate}")]
        [EnableCors("corsapp")]
        public SortingModel Get(string PickedDate)
        {
            if (!PickedDate.Equals("total"))
            {
                return _sorting.SortToCategories(PickedDate);
            }
            else
            {
                return _sorting.SortToCategories();
            }
        }

    }
}
