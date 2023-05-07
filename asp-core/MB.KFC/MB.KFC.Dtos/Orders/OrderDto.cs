namespace MB.KFC.Dtos.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Note { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        public int CustomerId { get; set; }

        public List<int> ProductIds { get; set; }
    }
}
