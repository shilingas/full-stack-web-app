namespace back_end_side.Models
{
    public class FileModel
    {
        public string? FileName { get; set; }
        public IFormFile? FormFile { get; set; }
        public int Bank { get; set; }
    }
}
