using MB.KFC.Dtos.Uploaders;
using MB.KFC.WebApi.Attributes;
using MB.KFC.WebApi.Helpers.ImageUploader;
using Microsoft.AspNetCore.Mvc;

namespace MB.KFC.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        #region Data and Const

        private readonly IImageUploader _fileUploader;

        public UploadController(IImageUploader fileUploader)
        {
            _fileUploader = fileUploader;
        }

        #endregion

        #region Services

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload([AllowedExtensions()] IFormFile[] files)
        {
            if (files.Length > 0)
            {
                var imagesNames = _fileUploader.Upload(files);

                var imagesDtos = GetImageDtos(imagesNames);

                return Ok(imagesDtos);
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion

        #region Private Methods

        private List<UploaderImageDto> GetImageDtos(List<string> imagesNames)
        {
            var imagesNamesDtos = new List<UploaderImageDto>();

            foreach (var imageName in imagesNames)
            {
                var villaImage = new UploaderImageDto();
                villaImage.Id = 0;
                villaImage.Name = imageName;

                imagesNamesDtos.Add(villaImage);
            }

            return imagesNamesDtos;
        }

        #endregion
    }
}
