'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Glongshortcount = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [longCount, setLongCount] = useState(0);
  const [shortCount, setShortCount] = useState(0);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/graphplot');
        if (res.ok) {
          const data = await res.json();
          setTrades(data);
          calculateTradeCounts(data);
        } else {
          const errorMessage = await res.json();
          setError(errorMessage.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      }
    };

    fetchTrades();
  }, []);

  const calculateTradeCounts = (trades) => {
    let longCount = 0;
    let shortCount = 0;

    trades.forEach(trade => {
      if (trade.LongShort === 'Long') {
        longCount += 1;
      } else if (trade.LongShort === 'Short') {
        shortCount += 1;
      } else if (trade.LongShort === 'long') {
        longCount += 1;
      } else if (trade.LongShort === 'short') {
        shortCount += 1;
      }


    });

    setLongCount(longCount);
    setShortCount(shortCount);
  };

  // Prepare data for the chart
  const chartData = [
    { type: 'Long', count: longCount },
    { type: 'Short', count: shortCount },
  ];

  return (
    <div className="graph-container pt-8">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Trade Count Summary</h2>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" label={{ value: 'Trade Type', position: 'insideBottomRight', offset: -10 }} />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Glongshortcount;
