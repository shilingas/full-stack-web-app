﻿using CsvHelper.Configuration.Attributes;

namespace back_end_side.Models
{
    public class Record
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

        [Ignore]
        public string? Category { get; set; } = "other";
    }
}
