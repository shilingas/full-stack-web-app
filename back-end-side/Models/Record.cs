using CsvHelper.Configuration.Attributes;

namespace back_end_side.Models
{
    public class Record
    {
        [Name("Data")]
        public DateTime Date { get; set; }
        [Name("Gavėjas")]
        public string? Seller { get; set; }
        [Name("Paaiškinimai")]
        public string? Purpose { get; set; }
        [Name("Suma")]
        public double Amount { get; set; }
        [Ignore]
        public string? Category { get; set; }
    }
}
