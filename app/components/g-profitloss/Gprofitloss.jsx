'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Gprofitloss = ({ tradeData }) => {
  const [profitLossData, setProfitLossData] = useState([]);

  useEffect(() => {
    // ฟังก์ชันในการคำนวณกำไร/ขาดทุน
    const calculateProfitLoss = () => {
      const summary = tradeData.reduce((acc, curr) => {
        const { Timeframe, Pip, lotsize, result } = curr;
        const pipValue = parseFloat(Pip);
        const lotSizeValue = parseFloat(lotsize);
        const profitLoss = pipValue * lotSizeValue;

        if (!acc[Timeframe]) {
          acc[Timeframe] = { Timeframe, profit: 0, loss: 0 };
        }

        if (result === 'win') {
          acc[Timeframe].profit += profitLoss;
        } else if (result === 'lose') {
          acc[Timeframe].loss += profitLoss;
        } else if (result === 'Win') {
          acc[Timeframe].profit += profitLoss;
        } else if (result === 'Lose') {
          acc[Timeframe].loss += profitLoss;
        }

        return acc;
      }, {});

      // เปลี่ยนผลลัพธ์เป็น array
      const profitLossArray = Object.values(summary).map(item => ({
        ...item,
        total: item.profit - item.loss // กำไรสุทธิ
      }));
      setProfitLossData(profitLossArray);
    };

    calculateProfitLoss();
  }, [tradeData]);

  return (
    <div className="graph-containe pt-8">
      <h2 className="text-center font-bold text-xl mb-4">profit/loss by Timeframe</h2>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart data={profitLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Timeframe" label={{ value: 'Timeframe', position: 'insideBottomRight', offset: -10 }} />
          <YAxis label={{ value: 'Profit/Loss', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* แท่งกราฟสำหรับกำไร */}
          <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
          {/* แท่งกราฟสำหรับขาดทุน */}
          <Bar dataKey="loss" fill="#ff6347" name="Loss" />
          {/* แท่งกราฟสำหรับกำไรสุทธิ (กำไร - ขาดทุน) */}
          <Bar dataKey="total" fill="#8884d8" name="Net Profit/Loss" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gprofitloss;
