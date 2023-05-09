namespace MB.KFC.Dtos.Orders
{
    public class OrderListDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Note { get; set; }
        public DateTime OrderDate { get; set; }

        public string CustomerFullName { get; set; }
    }
}
