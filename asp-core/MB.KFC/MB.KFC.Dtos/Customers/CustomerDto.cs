using MB.KFC.Dtos.Uploaders;

namespace MB.KFC.Dtos.Customers
{
    public class CustomerDto
    {
        public CustomerDto()
        {
            Images = new List<UploaderImageDto>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<UploaderImageDto> Images { get; set; }
    }
}
