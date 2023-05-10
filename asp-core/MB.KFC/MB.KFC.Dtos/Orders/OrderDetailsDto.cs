using MB.KFC.Dtos.Products;

namespace MB.KFC.Dtos.Orders
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public double TotalPrice { get; set; }
        public string Note { get; set; }
        public DateTime OrderDate { get; set; }

        public string CustomerFullName { get; set; }

        public List<ProductListDto> Products { get; set; }
    }
}
