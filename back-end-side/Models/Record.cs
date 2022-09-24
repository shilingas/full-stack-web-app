using CsvHelper.Configuration.Attributes;

namespace back_end_side.Models
{
    public class Record
    {
        [Name("date")]
        public DateTime Date { get; set; }
        [Name("seller")]
        public string? Seller { get; set; }
        [Name("purpose")]
        public string? Purpose { get; set; }
        [Name("amount")]
        public double Amount { get; set; }
    }
}
