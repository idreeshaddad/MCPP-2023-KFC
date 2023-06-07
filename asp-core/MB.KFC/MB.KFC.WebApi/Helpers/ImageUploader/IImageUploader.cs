namespace MB.KFC.WebApi.Helpers.ImageUploader
{
    public interface IImageUploader
    {
        public List<string> Upload(IFormFile[] files);
    }
}
