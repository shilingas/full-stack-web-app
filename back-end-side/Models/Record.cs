using CsvHelper.Configuration.Attributes;

namespace back_end_side.Models
{
    public class Record
    {
        [Name("Data", "Data ir laikas", "DATA")]
        //[Name("Data ir laikas")]
        //[Name("DATA")]
        public DateTime Date { get; set; }
        //[Name("Gavėjas")]
        //[Name("Gavėjas / Mokėtojas")]
        [Name("MOKĖTOJO ARBA GAVĖJO PAVADINIMAS", "Gavėjas", "Gavėjas / Mokėtojas")]
        public string? Seller { get; set; }
        //[Name("Paaiškinimai")]
        //[Name("Paskirtis")]
        [Name("MOKĖJIMO PASKIRTIS", "Paaiškinimai", "Paskirtis")]
        public string? Purpose { get; set; }
        //[Name("Suma")]
        //[Name("Suma ir valiuta")]
        [Name("SUMA", "Suma", "Suma ir valiuta")]
        public double Amount { get; set; }
        [Name("TRANSAKCIJOS TIPAS")]
        [Ignore]
        public string? PaymentType { get; set; }

        [Ignore]
        public string? Category { get; set; }
    }
}
