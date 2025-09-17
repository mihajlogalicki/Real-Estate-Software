using System.Net;
using WebAPI.Errors;

namespace WebAPI.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly IHostEnvironment _env;

        public ExceptionHandlerMiddleware(
            RequestDelegate next, 
            ILogger<ExceptionHandlerMiddleware> logger,
            IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                APIErrors response;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                string message = string.Empty;
                var exceptionType = ex.GetType();

                if(exceptionType == typeof(UnauthorizedAccessException))
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorized.";
                } 
                else if(exceptionType == typeof(BadHttpRequestException))
                {
                    statusCode = HttpStatusCode.BadRequest;
                    message = "Invalid data, server error occured.";
                }
                else
                {
                    message = ex.Message;
                }

                if (_env.IsDevelopment())
                {
                    response = new APIErrors((int)statusCode, message, ex.StackTrace.ToString());
                }
                else
                {
                    response = new APIErrors((int)statusCode, message);
                }

                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response.ToString());
            }
        }
    }
}
