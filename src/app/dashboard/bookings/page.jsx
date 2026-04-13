"use client"
import { Button } from "../../../../components/ui/Button"
import { Badge } from "../../../../components/ui/Badge"
import { bookingsData } from "../../../../components/lib/data"

export default function BookingsPage() {
  return (
    <div className="max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage your travel bookings</p>
      </div>

      <div className="bg-white rounded-lg  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adults
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingsData.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.trip}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.adults}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.children}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.startDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.endDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.cost}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge
                      variant={booking.status === "Full Paid" ? "default" : "secondary"}
                      className={
                        booking.status === "Full Paid"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="  whitespace-nowrap text-sm">
                    <Button variant="link" className="text-blue-500 bg-white">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookingsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  )
}
