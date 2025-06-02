"use client"

import { GroceryInterface } from "@/interfaces/interfaces"
import axios from "axios"
import { useEffect, useState } from "react"

const FewStock = () => {
  const [lowStockItems, setLowStockItems] = useState<GroceryInterface[]>([])

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get("./api/dashboard/lowStock")
      const sortedData = res.data.data.sort((a: GroceryInterface, b: GroceryInterface) => a.Stock - b.Stock);
      
      setLowStockItems(sortedData)
    }
    fetchApi()
  }, [])

  return (
    <table className="min-w-full border border-green-200 rounded-md text-sm text-left text-green-900">
      <thead className="bg-green-100 text-green-800">
        <tr>
          <th className="px-4 py-2 font-semibold">Product</th>
          <th className="px-4 py-2 font-semibold">Category</th>
          <th className="px-4 py-2 font-semibold">Sub Category</th>
          <th className="px-4 py-2 font-semibold">Quantity</th>
          <th className="px-4 py-2 font-semibold">Stock Left</th>
          <th className="px-4 py-2 font-semibold">Price</th>
        </tr>
      </thead>
      <tbody>
        {lowStockItems.map((item, key) => (
          <tr
            key={key}
            className="border-t border-green-200 hover:bg-green-50 transition"
          >
            <td className="px-4 py-3">{item.Brand} {item.ProductName}</td>
            <td className="px-4 py-3">{item.Category}</td>
            <td className="px-4 py-3">{item.SubCategory}</td>
            <td className="px-4 py-3">{item.Quantity}</td>
            <td className="px-4 py-3 text-red-600 font-semibold">
              {item.Stock} left
            </td>
            <td className="px-4 py-3 text-left">
              <span className="text-green-700 font-bold">${item.DiscountPrice}</span>
              <span className="line-through text-gray-400 mr-2 text-left">
                ${item.Price}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FewStock