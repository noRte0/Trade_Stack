// pages/Text.js

"use client";
import React from "react";
import TWcharts from "../components/twcharts/TWcharts";
import TWticker from "../components/twticker/TWticker";
import TWtechana from "../components/twtechana/TWtechana";

export default function Text() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-screen space-y-4 overflow-y-auto">
      {/* Ticker at the top */}
      <div className="w-full">
        <TWticker />
      </div>

      {/* Main Content: Charts and Technical Analysis */}
      <div className="flex flex-col items-center justify-center space-y-4" style={{ width: "80vw" }}>
        {/* Chart in the middle */}
        <div style={{ height: "65vh", width: "100%" }}>
          <TWcharts />
        </div>

        {/* Technical Analysis below the chart */}
        <div style={{ height: "30vh", width: "100%" }}>
          <TWtechana />
        </div>
      </div>
    </div>
  );
}
