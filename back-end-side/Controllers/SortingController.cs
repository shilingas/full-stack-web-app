using back_end_side.DbFiles;
using back_end_side.Models;
using back_end_side.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class SortingController : ControllerBase
    {
        private readonly ISorting _sorting;
        private readonly ISortingService _sortingService;

        public SortingController(ISorting sorting, ISortingService sortingService)
        {
            _sorting = sorting;
            _sortingService = sortingService;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public SortingModel Get()
        {
            var CurrentDate = DateTime.Now.ToString("yyyy-MM-dd").Substring(0, 7);

            return _sorting.SortToCategories(CurrentDate);
        }

        [HttpPut("{index:int}")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Put([FromBody] Record model, int index)
        {
            await _sortingService.ChangeCategory(model, index);
            return Ok(model);
        }
    }
}
