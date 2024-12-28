"use client";

import StockCards from "@/containers/StockCards/StockCards";

export default function Dashboard() {
  return (
    <div className="w-full h-screen flex items-center flex-col">
      <h1>Dashboard</h1>
      <StockCards />
    </div>
  );
}
