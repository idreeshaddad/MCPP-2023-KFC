using MB.KFC.Dtos.Uploaders;

namespace MB.KFC.Dtos.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }

        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public List<UploaderImageDto> Images { get; set; }
    }
}
