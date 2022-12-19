using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end_side.Models
{
    public class Record : IComparable
    {
        [Name("Data", "Data ir laikas", "DATA")]
        public DateTime Date { get; set; }
        [Name("MOKĖTOJO ARBA GAVĖJO PAVADINIMAS", "Gavėjas", "Gavėjas / Mokėtojas")]
        public string? Seller { get; set; }
        [Name("MOKĖJIMO PASKIRTIS", "Paaiškinimai", "Paskirtis")]
        public string? Purpose { get; set; }
        [Name("SUMA", "Suma", "Suma ir valiuta")]
        public double Amount { get; set; }
        [Name("Kreditas / Debetas", "D/K", "DEBETAS/KREDITAS")]
        public string? PaymentType { get; set; }
        [Name("Įrašo Nr.", "TRANSAKCIJOS KODAS", "Išrašo nr.")]
        public string? ExpenseCode { get; set; }
        [Ignore]
        public int ID { get; set; }
        [Ignore]
        public string Category { get; set; } = "other";

        [Ignore]
        public bool IsCategorized { get; set; } = false;
        
        public int CompareTo(object? obj)
        {
            Record nextRecord = (Record)obj;
            return this.Date.CompareTo(nextRecord.Date);
        }
        [Ignore]
        public DateTime CreatedOnUtc { get; set; }
    }
}