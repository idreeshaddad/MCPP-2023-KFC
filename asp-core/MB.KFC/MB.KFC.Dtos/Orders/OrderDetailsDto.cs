using MB.KFC.Dtos.Products;

namespace MB.KFC.Dtos.Orders
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Note { get; set; }
        public DateTime OrderDate { get; set; }

        public int CustomerFullName { get; set; }

        public List<ProductListDto> Products { get; set; }
    }
}
