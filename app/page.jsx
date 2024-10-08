"use client";
import React from "react";
import Card from "./components/card/Card";
import Cardlist from "./components/cardlist/Cardlist";
import TWtimeline from "./components/twtimeline/TWtimeline";
import TWcarlendar from "./components/twcalendar/TWcarlendar";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className="flex flex-row ">
      <div className="flex-1 p-4 ">
        <Cardlist page={page} />
      </div>
      <div className="flex-shrink-0 w-96 p-4 ">
      <TWcarlendar />
        <div className="pt-6">
        <TWtimeline />
        </div>
      </div>
    </div>
  );
}