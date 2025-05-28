"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "Category1", value: 65 },
  { name: "Category2", value: 20 },
  { name: "Category3", value: 15 },
];

const COLORS: string[] = ["#40BA81", "#4DA5E9", "#EAB308"]; // Light green shades

const DonutChart: React.FC = () => {
  return (
    <div className="bg-white p-6 w-fit min-w-[400px] rounded-2xl shadow-md border border-green-100">
      <h2 className="text-xl font-semibold mb-4 text-green-800">
        Total sales
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            activeShape={undefined} // 👈 prevents the weird box on click/hover
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
