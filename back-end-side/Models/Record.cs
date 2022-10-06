using CsvHelper.Configuration.Attributes;

namespace back_end_side.Models
{
    public class Record
    {
        //[Name("Data")]
        //[Name("Data ir laikas")]
        [Name("DATA")]
        public DateTime Date { get; set; }
        //[Name("Gavėjas")]
        //[Name("Gavėjas / Mokėtojas")]
        [Name("MOKĖTOJO ARBA GAVĖJO PAVADINIMAS")]
        public string? Seller { get; set; }
        //[Name("Paaiškinimai")]
        //[Name("Paskirtis")]
        [Name("MOKĖJIMO PASKIRTIS")]
        public string? Purpose { get; set; }
        //[Name("Suma")]
        //[Name("Suma ir valiuta")]
        [Name("SUMA")]
        public double Amount { get; set; }
        [Name("TRANSAKCIJOS TIPAS")]
        public string? PaymentType { get; set; }

        [Ignore]
        public string? Category { get; set; }
    }
}
