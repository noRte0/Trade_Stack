'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Gcontractamount = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [contractCountData, setContractCountData] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/graphplot');
        if (res.ok) {
          const data = await res.json();
          setTrades(data);
          calculateContractCount(data);
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

  const calculateContractCount = (trades) => {
    const contractCountMap = {};

    trades.forEach((trade) => {
      const { Contract } = trade;

      if (!contractCountMap[Contract]) {
        contractCountMap[Contract] = 0;
      }

      contractCountMap[Contract] += 1;
    });

    const formattedData = Object.keys(contractCountMap).map((Contract) => ({
      Contract,
      count: contractCountMap[Contract],
    }));

    setContractCountData(formattedData);
  };

  return (
    <div className="graph-container pt-8">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Contract Count</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={contractCountData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Contract"
            label={{ value: 'Contract', position: 'insideBottomRight', offset: -10 }}
            angle={-45}  // Rotate X-axis labels
            textAnchor="end"
            interval={0}  // Ensure all labels are shown
            tick={{ fontSize: 12 }}  // Reduce font size of X-axis labels
          />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#2196f3" name="Contract Count"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gcontractamount;
