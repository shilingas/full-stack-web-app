using back_end_side.Models;

namespace back_end_side.Services
{
    public interface ISortingService
    {
        Task ChangeCategory(Record model, int index);
    }
}