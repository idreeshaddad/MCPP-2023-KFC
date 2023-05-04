namespace MB.KFC.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public int Age { get; set; }
        public string FullName { get; set; }

        //TODO List<ProductDto>
    }
}
