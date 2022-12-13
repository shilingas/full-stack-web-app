using back_end_side.Controllers;
using back_end_side.DbFiles;
using back_end_side.Middleware;
using back_end_side.Services;
using CsvHelper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
builder.Services.AddScoped<ISorting, Sorting>();
builder.Services.AddScoped<IReportReader, ReportReader>();
builder.Services.AddScoped<IShowDataService, ShowDataService>();
builder.Services.AddScoped<ISortingService, SortingService>();
builder.Services.AddScoped<IUploadService, UploadService>();
builder.Services.AddControllers();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["Auth0:Authority"];
    options.Audience = builder.Configuration["Auth0:Audience"];
    options.RequireHttpsMetadata = false;
});
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddLogging();
builder.Services.AddTransient<ErrorMiddleware>();
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

}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ErrorMiddleware>();
app.MapControllers();

app.Run();