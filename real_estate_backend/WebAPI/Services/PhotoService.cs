using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class PhotoService : IPhotoInterface
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IConfiguration config)
        {
            Account account = new Account(
                config.GetSection("CloudinarySettings:my_cloud_name").Value,
                config.GetSection("CloudinarySettings:my_api_key").Value,
                config.GetSection("CloudinarySettings:my_api_secret").Value);

            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo)
        {
            var uploadResult = new ImageUploadResult();

            if(photo.Length > 0)
            {
                using(var stream = photo.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(photo.FileName, stream),
                        Transformation = new Transformation().Height(500).Width(800)
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            return uploadResult;
        }
    }
}
