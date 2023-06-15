namespace MB.KFC.Entities.Products
{
    public class Product
    {
        public Product()
        {
            Orders = new List<Order>();
            Carts = new List<Cart>();
            Images = new List<ProductImage>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public List<Order> Orders { get; set; }

        public List<Cart> Carts { get; set; }

        public List<ProductImage> Images { get; set; }
    }
}
