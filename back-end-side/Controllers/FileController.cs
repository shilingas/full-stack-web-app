using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corsapp")]
    public class FileController : ControllerBase
    {
        private readonly ExpensesContext _context;

        public FileController(ExpensesContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        public async Task<Record[]> GetFile()
        {
            var FileData = await _context.Expenses.ToArrayAsync();
            return FileData;
        }
    }
}
