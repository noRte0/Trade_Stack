'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitLossByTechnique = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [profitLossData, setProfitLossData] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/graphplot');
        if (res.ok) {
          const data = await res.json();
          setTrades(data);
          calculateProfitLossByTechnique(data);
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

  const calculateProfitLossByTechnique = (trades) => {
    const techniqueProfitLossMap = {};

    trades.forEach((trade) => {
      const { technique, Pip, lotsize, result } = trade;

      const pipValue = parseFloat(Pip);
      const lotSizeValue = parseFloat(lotsize);
      const profitLoss = pipValue * lotSizeValue;

      if (!techniqueProfitLossMap[technique]) {
        techniqueProfitLossMap[technique] = { profit: 0, loss: 0 };
      }

      if (result === 'win') {
        techniqueProfitLossMap[technique].profit += profitLoss;
      } else if (result === 'lose') {
        techniqueProfitLossMap[technique].loss += profitLoss;
      } else if (result === 'Win') {
        techniqueProfitLossMap[technique].profit += profitLoss;
      } else if (result === 'Lose') {
        techniqueProfitLossMap[technique].loss += profitLoss;
      }
    });

    const formattedData = Object.keys(techniqueProfitLossMap).map((technique) => ({
      technique,
      profit: techniqueProfitLossMap[technique].profit,
      loss: techniqueProfitLossMap[technique].loss,
    }));

    setProfitLossData(formattedData);
  };

  return (
    <div className="graph-container pt-8">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Profit and Loss by Technique</h2>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart data={profitLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="technique" label={{ value: 'Technique', position: 'insideBottomRight', offset: -10 }} />
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

export default ProfitLossByTechnique;
