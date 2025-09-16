using System.Text.Json;

namespace WebAPI.Errors
{
    public class APIErrors
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorsTraces { get; set; }
        public APIErrors(int errorCode, string errorMessage, string errorsTraces = null)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            ErrorsTraces = errorsTraces;
        }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
