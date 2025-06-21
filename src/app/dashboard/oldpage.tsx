"use client"
import DonutChart from "@/components/DonutChart";
import FewStock from "@/components/FewStockTable";
import RecentOrderTable from "@/components/RecentOrderTable";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState<number>()

  useEffect(() => {
    const fetchAPI=async()=>{
      const res=await axios.get("/api/dashboard/totalProducts")
      setTotalProducts(res.data.data)
    }
    fetchAPI()
    console.log(totalProducts)
  
  }, [])
  
  return (
    <div className="h-full w-[full] overflow-y-scroll p-6 text-black bg-gray-50 flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Today's Orders", value: 23 },
          { title: "Today's Sales", value: 500 },
          { title: "Total Products", value: totalProducts||"XXXX" },
          { title: "Users", value: 54 },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 rounded-2xl shadow-md bg-white"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {item.title}
              </p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
            <div className="h-16 w-16 flex justify-center items-center bg-[#b9fbc0] text-white rounded-xl">
              {getIcon(index)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md mt-5 rounded-2xl p-3 border gap-5 border-green-100 flex items-center">
        <DonutChart />

        <div className="overflow-x-auto w-full">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Recent Orders
          </h2>
          <RecentOrderTable/>
        </div>
      </div>

      <div className="bg-white shadow-md mt-5  rounded-2xl p-4 border border-green-100">
        <p className="text-lg font-semibold text-green-800 mb-4">Few Stock left <span className="text-sm text-gray-400 ">(less than 20)</span></p>

        <div className="">
          <FewStock/>
        </div>
      </div>
    </div>
  );
};

const getIcon = (index: number) => {
  switch (index) {
    case 0:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4.34 16.878L3.179 9.936c-.19-1.13-.284-1.694.007-2.065c.292-.371.83-.371 1.906-.371H18.91c1.076 0 1.614 0 1.906.37c.29.372.196.936.007 2.066l-1.163 6.942c-.41 2.448-.615 3.672-1.427 4.397S16.253 22 13.92 22h-3.84c-2.333 0-3.5 0-4.312-.725c-.812-.724-1.017-1.949-1.427-4.397M7 7.5V7a5 5 0 0 1 10 0v.5m-12.5 10h15" />
        </svg>
      );
    case 1:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.025 21q-.425 0-.712-.288T11.025 20v-1.15Q9.9 18.6 9.05 17.975t-1.375-1.75q-.175-.35-.012-.737t.587-.563q.35-.15.725.013t.575.537q.425.75 1.075 1.138t1.6.387q1.025 0 1.737-.462t.713-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V4q0-.425.288-.713T12.025 3t.713.288t.287.712v1.1q.95.15 1.65.613t1.15 1.137q.225.325.088.725t-.563.575q-.35.15-.725.013t-.7-.488t-.763-.537t-1.087-.188q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V20q0 .425-.288.713t-.712.287" />
        </svg>
      );
    case 2:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M16 22q-2.5 0-4.25-1.75T10 16t1.75-4.25T16 10t4.25 1.75T22 16t-1.75 4.25T16 22m0-2q1.65 0 2.825-1.175T20 16t-1.175-2.825T16 12t-2.825 1.175T12 16t1.175 2.825T16 20M4 20q-.825 0-1.412-.587T2 18v-7.6q0-.2.038-.4t.112-.4l2-4.6H4q-.425 0-.712-.288T3 4V3q0-.425.288-.712T4 2h7q.425 0 .713.288T12 3v1q0 .425-.288.713T11 5h-.15l1.65 3.8q-.475.25-.9.525t-.8.625L8.7 5H6.3L4 10.4V18h4.25q.125.525.337 1.038T9.1 20zM16 9q-1.05 0-1.775-.725T13.5 6.5t.725-1.775T16 4zq0-1.05.725-1.775T18.5 6.5t1.775.725T21 9z" />
        </svg>
      );
    case 3:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="9.001" cy={6} r={4} />
          <ellipse cx="9.001" cy="17.001" rx={7} ry={4} />
          <path d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001" />
        </svg>
      );
    default:
      return null;
  }
};

export default Dashboard;
