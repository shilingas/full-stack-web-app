using back_end_side.Models;
using System;
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
    }
    public class Sorting
    {
        public static readonly string[] Supermarkets = { "MAXIMA", "NORFA", "LIDL", "IKI", "RIMI", "AIBE", "KFC", "SUBWAY", "MEATBUSTERS", "HESBURGER", "JAMMI", "CAN CAN", "NO FORKS", "ILUNCH", "TAU", "CHAIKA", "Kavinė", "CAFFEINE" };
        public static readonly string[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
        public static readonly string[] CarMaintenanceShops = { "CIRCLE K", "VIADA", "BOLT", "STOVA", "RIDE SHARE", "SUSISIEKIMO PASLAUGOS", "CITYBEE" };
        public static readonly string[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI", "CONSILIUM OPTIMUM", "TELE2", "telia", "TOPO CENTRAS", "BITĖ", "GO3", "IKEA" };
        public static readonly string[] EntertainmentShops = { "CYBERX", "SPOTIFY", "BASKETNEWS", "OCULUS DIGITAL", "STEAM", "ŽALGIRIO KREPŠINIO CENTRAS" };
        public static SortingModel SortToCategories()
        {
            SortingModel Model = new()
            {
                CarSum = 0,
                EntertaintmentSum = 0,
                OtherSum = 0,
                HouseSum = 0,
                ClothesSum = 0,
                FoodSum = 0
            };
            if (UploadController.RecordsFromFile != null)
            {

                Model.FoodSum = queryMethod("food", Supermarkets);
                Model.ClothesSum = queryMethod("clothes", ClothesShops);
                Model.CarSum = queryMethod("car", CarMaintenanceShops);
                Model.EntertaintmentSum = queryMethod("entertainment", EntertainmentShops);
                Model.HouseSum = queryMethod("house", HouseMaintenanceShops);

                double sumOfOther = 0;
                foreach (var record in UploadController.RecordsFromFile)
                {
                    if (record.Category.Equals("other"))
                    {
                        sumOfOther += record.Amount;
                    }
                }

                Model.OtherSum = sumOfOther;
            }

            return Model;

        }

        public static double queryMethod(string category, string[] shops)
        {
            double Sum = 0;
            (from record in UploadController.RecordsFromFile
             where record.Seller != null && shops.Any(record.Seller.ToUpper().Contains) && !record.IsCategorized
             select record).ToList().ForEach(record => {
                 record.Category = category;
             });

            Sum = UploadController.RecordsFromFile
                .Where(r => r.Category != null && r.Category
                .Equals(category))
                .Select(r => r.Amount)
                .Sum();

            return Sum;
        }

        public static List<Record> SortedList()
        {
            SortToCategories();
            return UploadController.RecordsFromFile;
        }

        public static String CheckInput(Record model)
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