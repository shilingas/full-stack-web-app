using back_end_side.DbFiles;
using back_end_side.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System;
using System.Globalization;
using System.Reflection;

namespace back_end_side.Controllers
{
    public struct SortingModel
    {
        public double FoodSum { get; set; }
        public double ClothesSum { get; set; }
        public double CarSum { get; set; }
        public double HouseSum { get; set; }
        public double EntertaintmentSum { get; set; }
        public double OtherSum { get; set; }
        public double PreviousFoodSum { get; set; }
        public double PreviousClothesSum { get; set; }
        public double PreviousCarSum { get; set; }
        public double PreviousHouseSum { get; set; }
        public double PreviousEntertaintmentSum { get; set; }
        public double PreviousOtherSum { get; set; }
        public double PreviousYearFoodSum { get; set; }
        public double PreviousYearClothesSum { get; set; }
        public double PreviousYearCarSum { get; set; }
        public double PreviousYearHouseSum { get; set; }
        public double PreviousYearEntertaintmentSum { get; set; }
        public double PreviousYearOtherSum { get; set; }
        public bool Empty { get; set; }
    }
    public class Sorting : ISorting
    {
        private readonly ExpensesContext _context;

        public Sorting(ExpensesContext context)
        {
            _context = context;
        }

        public readonly string[] Supermarkets = { "MAXIMA", "NORFA", "LIDL", "IKI", "RIMI", "AIBE", "KFC", "SUBWAY", "MEATBUSTERS", "HESBURGER", "JAMMI", "CAN CAN", "NO FORKS", "ILUNCH", "TAU", "CHAIKA", "Kavinė", "CAFFEINE" };
        public readonly string[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
        public readonly string[] CarMaintenanceShops = { "CIRCLE K", "VIADA", "BOLT", "STOVA", "RIDE SHARE", "SUSISIEKIMO PASLAUGOS", "CITYBEE" };
        public readonly string[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI", "CONSILIUM OPTIMUM", "TELE2", "telia", "TOPO CENTRAS", "BITĖ", "GO3", "IKEA" };
        public readonly string[] EntertainmentShops = { "CYBERX", "SPOTIFY", "BASKETNEWS", "OCULUS DIGITAL", "STEAM", "ŽALGIRIO KREPŠINIO CENTRAS" };
        public SortingModel SortToCategories(string pickedDate = "")
        {
            SortingModel Model = new()
            {
                CarSum = 0,
                EntertaintmentSum = 0,
                OtherSum = 0,
                HouseSum = 0,
                ClothesSum = 0,
                FoodSum = 0,
                PreviousCarSum = 0,
                PreviousEntertaintmentSum = 0,
                PreviousOtherSum = 0,
                PreviousHouseSum = 0,
                PreviousClothesSum = 0,
                PreviousFoodSum = 0,
                PreviousYearCarSum = 0,
                PreviousYearEntertaintmentSum = 0,
                PreviousYearOtherSum = 0,
                PreviousYearHouseSum = 0,
                PreviousYearClothesSum = 0,
                PreviousYearFoodSum = 0,
                Empty = true
            };


            if (_context.Expenses != null)
            {
                if (_context.Expenses.Any())
                {
                    Model.Empty = false;
                }

                var currentDate = DateTime.Now;
                var dateFromFront = DateTime.Now;
                var previousMonth = DateTime.Now;
                var previousYear = DateTime.Now;

                if (string.IsNullOrEmpty(pickedDate))
                {
                    dateFromFront = DateTime.MinValue;
                    previousMonth = DateTime.MinValue;
                    previousYear = DateTime.MinValue;
                }
                else if (currentDate.ToString("yyyy-MM").StartsWith(pickedDate))
                {
                    dateFromFront = new DateTime(currentDate.Year, currentDate.Month, 1);
                    previousYear = dateFromFront.AddYears(-1);
                    previousMonth = dateFromFront.AddMonths(-1);
                }
                else
                {
                    dateFromFront = DateTime.ParseExact(pickedDate, "yyyy-MM", null);
                    previousYear = dateFromFront.AddYears(-1);
                    previousMonth = dateFromFront.AddMonths(-1);
                }

                Model.FoodSum = queryMethod("food", Supermarkets, dateFromFront);
                Model.ClothesSum = queryMethod("clothes", ClothesShops, dateFromFront);
                Model.CarSum = queryMethod("car", CarMaintenanceShops, dateFromFront);
                Model.EntertaintmentSum = queryMethod("entertainment", EntertainmentShops, dateFromFront);
                Model.HouseSum = queryMethod("house", HouseMaintenanceShops, dateFromFront);

                Model.PreviousFoodSum = queryMethod("food", Supermarkets, previousMonth);
                Model.PreviousClothesSum = queryMethod("clothes", ClothesShops, previousMonth);
                Model.PreviousCarSum = queryMethod("car", CarMaintenanceShops, previousMonth);
                Model.PreviousHouseSum = queryMethod("house", HouseMaintenanceShops, previousMonth);
                Model.PreviousEntertaintmentSum = queryMethod("entertainment", EntertainmentShops, previousMonth);

                Model.PreviousYearFoodSum = queryMethod("food", Supermarkets, previousYear);
                Model.PreviousYearClothesSum = queryMethod("clothes", ClothesShops, previousYear);
                Model.PreviousYearCarSum = queryMethod("car", CarMaintenanceShops, previousYear);
                Model.PreviousYearEntertaintmentSum = queryMethod("entertainment", EntertainmentShops, previousYear);
                Model.PreviousYearHouseSum = queryMethod("house", HouseMaintenanceShops, previousYear);

                double sumOfOther = 0;
                double sumOfPreviousOther = 0;
                double sumOfPreviousYearOther = 0;

                if (!string.IsNullOrEmpty(pickedDate))
                {
                    foreach (var record in _context.Expenses)
                    {
                        if (record.Category.Equals("other") && record.Date.ToString().StartsWith(pickedDate))
                        {
                            sumOfOther += record.Amount;
                        }

                        if (record.Category.Equals("other") && record.Date >= previousMonth && record.Date < previousMonth.AddMonths(1))
                        {
                            sumOfPreviousOther += record.Amount;
                        }

                        if (record.Category.Equals("other") && record.Date >= previousYear && record.Date < previousYear.AddMonths(1))
                        {
                            sumOfPreviousYearOther += record.Amount;
                        }
                    }
                }
                else
                {
                    foreach (var record in _context.Expenses)
                    {
                        if (record.Category.Equals("other"))
                        {
                            sumOfOther += record.Amount;
                        }
                    }
                }

                Model.OtherSum = sumOfOther;
                Model.PreviousOtherSum = sumOfPreviousOther;
            }

            return Model;

        }

        public double queryMethod(string category, string[] shops, DateTime pickedDate)
        {
            double Sum = 0;

            foreach (var record in _context.Expenses)
            {
                if (record.Seller != null && shops.Any(record.Seller.ToUpper().Contains) && !record.IsCategorized)
                {
                    record.Category = category;
                }
            }
            _context.SaveChanges();

            if (pickedDate == DateTime.MinValue)
            {
                Sum = _context.Expenses
                .Where(r => r.Category != null && r.Category.Equals(category))
                .Select(r => r.Amount)
                .Sum();
            }
            else
            {
                Sum = _context.Expenses
                .Where(r => r.Category != null && r.Category.Equals(category) && r.Date >= pickedDate && r.Date < pickedDate.AddMonths(1))
                .Select(r => r.Amount)
                .Sum();
            }

            return Sum;
        }

        public DbSet<Record> SortedList()
        {
            SortToCategories();
            return _context.Expenses;
        }

        public String CheckInput(Record model)
        {
            if (model.Seller != null && Supermarkets.Any(model.Seller.ToUpper().Contains))
                return "food";
            if (model.Seller != null && ClothesShops.Any(model.Seller.ToUpper().Contains))
                return "clothes";
            if (model.Seller != null && CarMaintenanceShops.Any(model.Seller.ToUpper().Contains))
                return "car";
            if (model.Seller != null && HouseMaintenanceShops.Any(model.Seller.ToUpper().Contains))
                return "house";
            if (model.Seller != null && EntertainmentShops.Any(model.Seller.ToUpper().Contains))
                return "entertainment";
            else return "other";
        }
    }
}