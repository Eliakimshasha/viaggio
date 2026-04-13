"use client"
import { Button } from "../../../../components/ui/Button"
import { Badge } from "../../../../components/ui/Badge"
import { paymentsData } from "../../../../components/lib/data"

export default function PaymentsPage() {
  return (
    <div className="max-w-full ">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">Track your payment history and outstanding balances</p>
      </div>

      <div className=" rounded-lg bg-white max-w-full p-9 relative overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentsData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.location}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.adults}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.children}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.startDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.endDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.cost}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{payment.balance}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge
                      variant="secondary"
                      className={
                        payment.balance === "$0"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-black/5 text-black"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {payment.balance !== "$0" && (
                      <button size="sm" className="bg-black text-[12px] text-white hover:bg-gray-800 px-2 rounded-full" >
                        Pay Now
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Button variant="link" className="text-blue-600 bg-white p-0">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paymentsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No payment records found</p>
          </div>
        )}
      </div>
    </div>
  )
}
