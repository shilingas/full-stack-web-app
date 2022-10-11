using back_end_side.Models;
using System;

namespace back_end_side.Controllers
{
    public class Sorting
    {

        public static SortingModel SortToCategories()
        {
            string[] Supermarkets = { "MAXIMA", "NORFA", "lIDL", "IKI", "RIMI", "AIBE", "KFC", "SUBWAY", "MEATBUSTERS", "Hesburger", "JAMMI", "CAN CAN", "NO FORKS", "ILUNCH", "TAU", "CHAIKA", "Kavinė", "CAFFEINE" };
            string[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
            string[] CarMaintenanceShops = { "CIRCLE K", "VIADA", "BOLT", "Stova", "RIDE SHARE", "SUSISIEKIMO PASLAUGOS", "CITYBEE" };
            string[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI", "CONSILIUM OPTIMUM", "tele2", "telia", "TOPO CENTRAS", "BITĖ", "GO3", "IKEA" };
            string[] EntertainmentShops = { "CYBERX", "SPOTIFY", "BasketNews", "Oculus Digital", "steam", "ŽALGIRIO KREPŠINIO CENTRAS" };

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
                foreach (var record in UploadController.RecordsFromFile)
                {
                    if (CheckType(record, Supermarkets))
                    {
                        record.Category = "food";
                        Model.FoodSum += record.Amount;
                    }
                    else if (CheckType(record, ClothesShops))
                    {
                        record.Category = "clothes";
                        Model.ClothesSum += record.Amount;
                    }
                    else if (CheckType(record, CarMaintenanceShops))
                    {
                        record.Category = "car";
                        Model.CarSum += record.Amount;
                    }
                    else if (CheckType(record, HouseMaintenanceShops))
                    {
                        record.Category = "house";
                        Model.HouseSum += record.Amount;
                    }
                    else if (CheckType(record, EntertainmentShops))
                    {
                        record.Category = "entertainment";
                        Model.EntertaintmentSum += record.Amount;
                    }
                    else
                    {
                        record.Category = "other";
                        Model.OtherSum += record.Amount;
                    }
                }
            }
            
            return Model;

        }

        public static List<Record> SortedList()
        {
            SortToCategories();
            return UploadController.RecordsFromFile;
        }

        public static Boolean CheckType(Record record, String[] shopNames)
        {
            foreach (String shopName in shopNames)
            {
                if (record.Seller != null && record.Seller.ToUpper().Contains(shopName.ToUpper()))
                {
                    return true;
                }

            }
            return false;
        }
        public static String CheckInput(InputModel model)
        {
            string[] Supermarkets = { "MAXIMA", "NORFA", "lIDL", "IKI", "RIMI", "AIBE", "KFC", "SUBWAY", "MEATBUSTERS", "Hesburger", "JAMMI", "CAN CAN", "NO FORKS", "ILUNCH", "TAU", "CHAIKA", "Kavinė", "CAFFEINE" };
            string[] ClothesShops = { "ZARA", "STRADIVARIUS", "H&M" };
            string[] CarMaintenanceShops = { "CIRCLE K", "VIADA", "BOLT", "Stova", "RIDE SHARE", "SUSISIEKIMO PASLAUGOS" };
            string[] HouseMaintenanceShops = { "JYSK", "MOKI VEZI", "SENUKAI", "CONSILIUM OPTIMUM", "tele2", "telia", "TOPO CENTRAS", "BITĖ", "GO3", "IKEA" };
            string[] EntertainmentShops = { "CYBERX", "SPOTIFY", "BasketNews", "Oculus Digital", "steam", "ŽALGIRIO KREPŠINIO CENTRAS" };  
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
            else return "noCategory";
        }


    }
}
