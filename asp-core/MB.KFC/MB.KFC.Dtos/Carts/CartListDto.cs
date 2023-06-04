using MB.KFC.Utils;

namespace MB.KFC.Dtos.Carts
{
    public class CartListDto
    {
        public int Id { get; set; }
        public double TotalPrice { get; set; }

        public string CustomerFullName { get; set; }

        public CartStatus Status { get; set; }
    }
}
