using CsvHelper.Configuration.Attributes;

namespace back_end_side.Models
{
    public class IncomeModel : IComparable
    {
        public DateTime Date { get; set; }
        public string? Seller { get; set; }
        public string? Purpose { get; set; }
        public double Amount { get; set; }
        public string? ExpenseCode { get; set; }
        public int ID { get; set; }
        public bool IsSelected { get; set; } = false;
        public bool IsAdded { get; set; } = false;

        public int CompareTo(object? obj)
        {
            IncomeModel nextRecord = (IncomeModel)obj;
            return this.Date.CompareTo(nextRecord.Date);
        }
    }
}
