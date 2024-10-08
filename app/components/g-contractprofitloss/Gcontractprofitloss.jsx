'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Gcontractprofitloss = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [contractProfitLossData, setContractProfitLossData] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/graphplot');
        if (res.ok) {
          const data = await res.json();
          setTrades(data);
          calculateProfitLossByContract(data);
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

  const calculateProfitLossByContract = (trades) => {
    const contractResultsMap = {};

    trades.forEach((trade) => {
      const { Contract, Pip, Leverage, result } = trade;
      const pipValue = parseFloat(Pip) || 0;
      const leverageValue = parseFloat(Leverage) || 1;

      const profitLoss = pipValue * leverageValue;

      if (!contractResultsMap[Contract]) {
        contractResultsMap[Contract] = { profit: 0, loss: 0 };
      }

      if (result === 'win') {
        contractResultsMap[Contract].profit += profitLoss;
      } else if (result === 'lose') {
        contractResultsMap[Contract].loss += profitLoss;
      } else if (result === 'Win') {
        contractResultsMap[Contract].profit += profitLoss;
      } else if (result === 'Lose') {
        contractResultsMap[Contract].loss += profitLoss;
      }
      
    });

    const formattedData = Object.keys(contractResultsMap).map((Contract) => ({
      Contract,
      profit: contractResultsMap[Contract].profit,
      loss: contractResultsMap[Contract].loss,
    }));

    setContractProfitLossData(formattedData);
  };

  return (
    <div className="graph-container">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Profit and Loss by Contract</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={contractProfitLossData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Contract"
            label={{ value: 'Contract', position: 'insideBottomRight', offset: -10 }}
            angle={-45}  // Rotate X-axis labels
            textAnchor="end"
            interval={0}  // Ensure all labels are shown
            tick={{ fontSize: 12 }}  // Reduce font size of X-axis labels
          />
          <YAxis label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#4caf50" name="Profit" />
          <Bar dataKey="loss" fill="#f44336" name="Loss" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gcontractprofitloss;
