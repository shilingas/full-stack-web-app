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
    public class ShowDataController : ControllerBase
    {
        private readonly ExpensesContext _context;
        private readonly IShowDataService _showDataService;

        public ShowDataController(ExpensesContext context, IShowDataService showDataService)
        {
            _context = context;
            _showDataService = showDataService;
        }

        [HttpPost]
        [Produces("application/json")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Post([FromBody] Record model)
        {
            await _showDataService.AddRecord(model);
            return Ok(model);
        }
        [HttpGet]
        [EnableCors("corsapp")]
        public async Task<Record[]> GetAll()
        {
            var data = await _context.Expenses.ToArrayAsync();
            Array.Sort(data);
            return data;
        }

        [HttpPut("{id:int}")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Put([FromBody] Record model, int id)
        {
            await _showDataService.EditData(model, id);
            return Ok(model);
        }

        [HttpDelete("{id:int}")]
        [EnableCors("corsapp")]
        public async Task<IActionResult> Delete(int id)
        {
            await _showDataService.DeleteRecord(id);
            return Ok();
        }

        [HttpDelete]
        [EnableCors("corsapp")]
        public async Task<IActionResult> DeleteAll()
        {
            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE Expenses");
            _context.SaveChanges();
            return Ok();
        }
    }
}