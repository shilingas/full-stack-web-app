using back_end_side.Models;

namespace back_end_side.Services
{
    public interface IShowDataService
    {
        Task AddRecord(Record record);
        Task EditData(Record model, int id);
        Task DeleteRecord(int id);
    }
}