// Fake data for testing
const warehouses = [
  {
    id: "1",
    name: "Warehouse A",
    location: "City A",
    phone: "12345678",
    email: "1234567890@3456",
    monday_start_time: "9:00",
    monday_end_time: "15:00",
    tuesday_start_time: "9:00",
    tuesday_end_time: "15:00",
    wednesday_start_time: "9:00",
    wednesday_end_time: "15:00",
    thursday_start_time: "9:00",
    thursday_end_time: "15:00",
    friday_start_time: "9:00",
    friday_end_time: "15:00",
    saturday_start_time: "9:00",
    saturday_end_time: "15:00",
    sunday_start_time: "9:00",
    sunday_end_time: "15:00",
  },
  {
    id: "2",
    name: "Warehouse B",
    location: "City B",
    phone: "12345678",
    email: "1234567890@3456",
    monday_start_time: "9:00",
    monday_end_time: "15:00",
    tuesday_start_time: "9:00",
    tuesday_end_time: "15:00",
    wednesday_start_time: "9:00",
    wednesday_end_time: "15:00",
    thursday_start_time: "9:00",
    thursday_end_time: "15:00",
    friday_start_time: "9:00",
    friday_end_time: "15:00",
    saturday_start_time: "9:00",
    saturday_end_time: "15:00",
    sunday_start_time: "9:00",
    sunday_end_time: "15:00",
  },
  {
    id: "3",
    name: "Warehouse C",
    location: "City C",
    phone: "12345678",
    email: "1234567890@3456",
    monday_start_time: "9:00",
    monday_end_time: "15:00",
    tuesday_start_time: "9:00",
    tuesday_end_time: "15:00",
    wednesday_start_time: "9:00",
    wednesday_end_time: "15:00",
    thursday_start_time: "9:00",
    thursday_end_time: "15:00",
    friday_start_time: "9:00",
    friday_end_time: "15:00",
    saturday_start_time: "9:00",
    saturday_end_time: "15:00",
    sunday_start_time: "9:00",
    sunday_end_time: "15:00",
  },
  // Add more fake data as needed
];

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="page-container pt-6">
        <div className="mt-4 flex justify-center">
          <div>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Add Warehouse
            </button>
          </div>
          <div className="ml-4">
            <input
              type="text"
              className="w-60 rounded bg-gray-200 px-4 py-2"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Display warehouses */}
        <div className="mt-8 flex flex-col items-center justify-start gap-4 p-4">
          {warehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className="flex w-full flex-col rounded-lg bg-white p-4 shadow-md md:w-2/3 md:flex-row"
            >
              {/* First Section: Name, Email, Phone Number */}
              <div className="mb-4 w-full md:mr-4 md:w-1/3">
                <p className="text-2xl font-semibold text-gray-800">
                  {warehouse.name}
                </p>
                <p className="text-gray-800">Phone number: {warehouse.phone}</p>
                <p className="text-gray-800">
                  Email address: {warehouse.email}
                </p>
              </div>
              {/* Second Section: Opening Times */}
              <div className="mb-4 w-full md:mr-4 md:w-1/3">
                <p className="text-lg font-semibold text-gray-800">
                  Opening Times
                </p>
                <p className="text-gray-800">
                  Monday: {warehouse.monday_start_time} -{" "}
                  {warehouse.monday_end_time}
                </p>
                <p className="text-gray-800">
                  Tuesday: {warehouse.tuesday_start_time} -{" "}
                  {warehouse.tuesday_end_time}
                </p>
                <p className="text-gray-800">
                  Wednesday: {warehouse.wednesday_start_time} -{" "}
                  {warehouse.wednesday_end_time}
                </p>
                <p className="text-gray-800">
                  Thursday: {warehouse.thursday_start_time} -{" "}
                  {warehouse.thursday_end_time}
                </p>
                <p className="text-gray-800">
                  Friday: {warehouse.friday_start_time} -{" "}
                  {warehouse.friday_end_time}
                </p>
                <p className="text-gray-800">
                  Saturday: {warehouse.saturday_start_time} -{" "}
                  {warehouse.saturday_end_time}
                </p>
                <p className="text-gray-800">
                  Sunday: {warehouse.sunday_start_time} -{" "}
                  {warehouse.sunday_end_time}
                </p>
              </div>
              {/* Third Section: Location */}
              <div className="w-full md:w-1/3">
                <p className="text-lg font-semibold text-gray-800">Location</p>
                <p className="text-gray-800">{warehouse.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
