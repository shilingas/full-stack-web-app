﻿using back_end_side.Models;
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
        public SortingModel Get ()
        {
            SortingModel data = Sorting.SortToCategories();

            return data;
        }
    }
}