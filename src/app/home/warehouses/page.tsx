export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="page-container">
        <div className="mt-4 flex justify-center">
          <div>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Add Warehouse
            </button>
          </div>
          <div>
            <input
              type="text"
              className="w-96 rounded bg-gray-200 px-4 py-2"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
