using CloudinaryDotNet.Actions;

namespace WebAPI.Interfaces
{
    public interface IPhotoInterface
    {
        Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
