'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Gcontractwinlose = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [contractData, setContractData] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/graphplot');
        if (res.ok) {
          const data = await res.json();
          setTrades(data);
          calculateResultsByContract(data);
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

  const calculateResultsByContract = (trades) => {
    const contractResultsMap = {};

    trades.forEach((trade) => {
      const { Contract, result } = trade;

      if (!contractResultsMap[Contract]) {
        contractResultsMap[Contract] = { win: 0, lose: 0, breakeven: 0 };
      }

      if (result === 'win') {
        contractResultsMap[Contract].win += 1;
      } else if (result === 'lose') {
        contractResultsMap[Contract].lose += 1;
      } else if (result === 'breakeven') {
        contractResultsMap[Contract].breakeven += 1;
      } else if (result === 'Win') {
        contractResultsMap[Contract].win += 1;
      } else if (result === 'Lose') {
        contractResultsMap[Contract].lose += 1;
      } else if (result === 'Breakeven') {
        contractResultsMap[Contract].breakeven += 1;
      }
    });

    const formattedData = Object.keys(contractResultsMap).map((Contract) => ({
      Contract,
      win: contractResultsMap[Contract].win,
      lose: contractResultsMap[Contract].lose,
      breakeven: contractResultsMap[Contract].breakeven,
    }));

    setContractData(formattedData);
  };

  return (
    <div className="graph-container">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Results by Contract</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={contractData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Contract"
            label={{ value: 'Contract', position: 'insideBottomRight', offset: -10 }}
            angle={-45}  // Rotate X-axis labels
            textAnchor="end"
            interval={0}  // Ensure all labels are shown
          />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="win" fill="#4caf50" name="Win" />
          <Bar dataKey="lose" fill="#f44336" name="Lose" />
          <Bar dataKey="breakeven" fill="#ffa000" name="Breakeven" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gcontractwinlose;
