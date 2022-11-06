using back_end_side.Controllers;
using back_end_side.DbFiles;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Linq;
//System.Diagnostics.Debug.WriteLine("my string");
//ReadingController rc = new ReadingController();
//rc.ReadFromFile();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ExpensesContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("ExpensesContext")));
builder.Services.AddControllers();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ExpensesContext>();
    context.Database.EnsureCreated();

    //UploadController uploadController = new UploadController(context);

    //DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();