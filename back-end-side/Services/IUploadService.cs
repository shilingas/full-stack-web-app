﻿using back_end_side.Models;

namespace back_end_side.Services
{
    public interface IUploadService
    {
        Task GetFileData(FileModel file);
        Task GetIncomeData();
    }
}