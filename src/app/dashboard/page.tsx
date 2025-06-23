import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table-tabs";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm @container/card mx-4 lg:mx-6">
            <div className="px-4 flex items-center justify-between lg:px-6">
              <div className="leading-none font-semibold">Low Stock Alert</div>
              <Link href="/editStock" className="underline">
                Manage stocks
              </Link>
            </div>

            <DataTable data={data} checkbox={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
