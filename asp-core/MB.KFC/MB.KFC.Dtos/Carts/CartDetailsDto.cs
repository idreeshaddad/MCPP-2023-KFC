using MB.KFC.Dtos.Products;
using MB.KFC.Utils;

namespace MB.KFC.Dtos.Carts
{
    public class CartDetailsDto
    {
        public int Id { get; set; }
        public double TotalPrice { get; set; }

        public string CustomerFullName { get; set; }

        public CartStatus Status { get; set; }


        public List<ProductDto> Products { get; set; }
    }
}
