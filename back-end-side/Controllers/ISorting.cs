﻿using back_end_side.Models;

namespace back_end_side.Controllers
{
    public interface ISorting
    {
        SortingModel SortToCategories(string pickedDate = "");
        String CheckInput(Record model);
    }
}