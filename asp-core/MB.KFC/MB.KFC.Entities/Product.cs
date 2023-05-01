namespace MB.KFC.Entities
{
    public class Product
    {
        public Product()
        {
            Orders = new List<Order>();    
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public List<Order> Orders { get; set; }
    }
}
