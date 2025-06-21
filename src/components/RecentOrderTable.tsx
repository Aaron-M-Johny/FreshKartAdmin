import React from 'react'

const RecentOrderTable = () => {
  return (
    <table className="min-w-full border border-green-200 rounded-md">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="text-left px-4 py-2">Order ID</th>
                <th className="text-left px-4 py-2">Order Date</th>
                <th className="text-left px-4 py-2">Price</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-green-200 hover:bg-green-50 transition">
                <td className="px-4 py-3 text-green-900">S3445FF</td>
                <td className="px-4 py-3 text-green-900">13 May 2025</td>
                <td className="px-4 py-3 text-green-900">$57</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr className="border-t border-green-200 hover:bg-green-50 transition">
                <td className="px-4 py-3 text-green-900">S3445FF</td>
                <td className="px-4 py-3 text-green-900">13 May 2025</td>
                <td className="px-4 py-3 text-green-900">$57</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr className="border-t border-green-200 hover:bg-green-50 transition">
                <td className="px-4 py-3 text-green-900">S3445FF</td>
                <td className="px-4 py-3 text-green-900">13 May 2025</td>
                <td className="px-4 py-3 text-green-900">$57</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr className="border-t border-green-200 hover:bg-green-50 transition">
                <td className="px-4 py-3 text-green-900">S3445FF</td>
                <td className="px-4 py-3 text-green-900">13 May 2025</td>
                <td className="px-4 py-3 text-green-900">$57</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr className="border-t border-green-200 hover:bg-green-50 transition">
                <td className="px-4 py-3 text-green-900">S3445FF</td>
                <td className="px-4 py-3 text-green-900">13 May 2025</td>
                <td className="px-4 py-3 text-green-900">$57</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr className="border-t border-green-200 hover:bg-green-50 transition">
                <td className="px-4 py-3 text-green-900">S3445FF</td>
                <td className="px-4 py-3 text-green-900">13 May 2025</td>
                <td className="px-4 py-3 text-green-900">$57</td>
                <td className="px-4 py-3">
                  <span className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
  )
}

export default RecentOrderTable