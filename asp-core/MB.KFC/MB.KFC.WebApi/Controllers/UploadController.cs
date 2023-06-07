using MB.KFC.WebApi.Attributes;
using MB.KFC.WebApi.Helpers.ImageUploader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MB.KFC.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IImageUploader _fileUploader;

        public UploadController(IImageUploader fileUploader)
        {
            _fileUploader = fileUploader;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload([AllowedExtensions()] IFormFile[] files)
        {
            if (files.Length > 0)
            {
                var imagesNames = _fileUploader.Upload(files);
                return Ok(new { imagesNames });
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
