using MB.KFC.Utils;

namespace MB.KFC.Entities
{
    public class Cart
    {
        public Cart()
        {
            Products = new List<Product>();
        }

        public int Id { get; set; }
        public double TotalPrice { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public CartStatus Status { get; set; }


        public List<Product> Products { get; set; }
    }
}
