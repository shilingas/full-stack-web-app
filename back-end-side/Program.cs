using back_end_side.Controllers;
using CsvHelper;
using System.Globalization;
using System.Linq;
//System.Diagnostics.Debug.WriteLine("my string");
//ReadingController rc = new ReadingController();
//rc.ReadFromFile();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//ReportReader.ReadFromCsvFile();  // Read files from csv
/*Sorting sorting = new Sorting();
sorting.SortToCategories();
Console.WriteLine("\nFood sum: " + sorting.foodSum +
    "\nClothes Sum: " + sorting.clothesSum +
    "\nCar maintenance sum: " + sorting.carSum +
    "\nHouse maintenance sum: " + sorting.houseSum +
    "\nEntertainment sum: " + sorting.entertainmentSum +
    "\nOther expenses sum: " + sorting.otherSum);*/

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();