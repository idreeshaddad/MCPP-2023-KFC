using MB.KFC.Dtos.Orders;
using MB.KFC.Dtos.Uploaders;

namespace MB.KFC.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public int Age { get; set; }
        public string FullName { get; set; }
        public List<UploaderImageDto> Images { get; set; }


        //TODO List<ProductDto>
        public List<OrderListDto> Orders { get; set; }
    }
}
