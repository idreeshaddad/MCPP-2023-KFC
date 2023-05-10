namespace MB.KFC.Dtos.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Note { get; set; }

        public int CustomerId { get; set; }

        public List<int> ProductIds { get; set; }
    }
}
