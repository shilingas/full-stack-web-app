using back_end_side.DbFiles;
using back_end_side.Models;
using back_end_side.Services;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ISorting _sorting;

        public FileController(ExpensesContext context, ISorting sorting)
        {
            _context = context;
            _sorting = sorting;
        }

        [HttpGet]
        [EnableCors("corsapp")]
        [Authorize]
        public Record[] GetFile()
        {
            var fileService = new FileService(_context, _sorting);
            return fileService.GetFileData();
        }
    }
}
