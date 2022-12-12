using back_end_side.Models;
using System.Net;
using System.Text.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace back_end_side.Middleware
{
    public class ErrorMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorMiddleware> _logger;
        public ErrorMiddleware(ILogger<ErrorMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {


                context.Response.ContentType = "application/json";
                switch (ex)
                {
                    case BadHttpRequestException e:
                        context.Response.StatusCode = 400;
                        break;
                    default:
                        context.Response.StatusCode = 500;
                        break;
                }
                var result = JsonSerializer.Serialize(new ErrorModel() { Message = ex.Message, StatusCode = context.Response.StatusCode });
                await context.Response.WriteAsync(result);
                _logger.LogError($"Something went wrong...: {ex}");
            }
        }
    }
}
