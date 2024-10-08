'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Gwinlose = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [winLossData, setWinLossData] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/graphplot');
        if (res.ok) {
          const data = await res.json();
          setTrades(data);
          calculateWinLossData(data);
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

  const calculateWinLossData = (trades) => {
    const results = { win: 0, lose: 0,breakeven: 0 };

    trades.forEach((trade) => {
      const { result } = trade;
      if (result === 'win') {
        results.win += 1;
      } else if (result === 'lose') {
        results.lose += 1;
      } else if (result === 'breakeven') {
        results.breakeven += 1;
      } else if (result === 'Win') {
        results.win += 1;
      } else if (result === 'Lose') {
        results.lose += 1;
      } else if (result === 'Breakeven') {
        results.breakeven += 1;
      }

    });

    setWinLossData([
      { result: 'Win', count: results.win },
      { result: 'Lose', count: results.lose },
      { result: 'Breakeven', count: results.breakeven },
    ]);
  };

  return (
    <div className="graph-container pt-8">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Total Win/Loss</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={winLossData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="result"
            label={{ value: 'Result', position: 'insideBottomRight', offset: -10 }}
            tick={{ fontSize: 14 }} // Adjust font size as needed
          />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#2196f3" name="Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gwinlose;
