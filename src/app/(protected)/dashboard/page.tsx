export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">Revenue</h2>
            <p className="text-2xl font-bold">$12,400</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">New Users</h2>
            <p className="text-2xl font-bold">328</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">Active Sessions</h2>
            <p className="text-2xl font-bold">1,204</p>
          </div>
        </div>
      </div>
    );
  }
  