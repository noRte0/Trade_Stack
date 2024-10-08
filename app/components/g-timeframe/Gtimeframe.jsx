'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TradeGraphComponent = ({ tradeData }) => {
  const [summarizedData, setSummarizedData] = useState([]);

  useEffect(() => {
    // ฟังก์ชันในการสรุปข้อมูล
    const summarizeData = () => {
      const summary = tradeData.reduce((acc, curr) => {
        const { Timeframe, result } = curr;
        
        if (!acc[Timeframe]) {
          acc[Timeframe] = { Timeframe, win: 0, breakeven: 0, lose: 0 };
        }
        
        if (result === 'win') {
          acc[Timeframe].win += 1;
        } else if (result === 'breakeven') {
          acc[Timeframe].breakeven += 1;
        } else if (result === 'lose') {
          acc[Timeframe].lose += 1;
        } else if (result === 'Win') {
          acc[Timeframe].win += 1;
        } else if (result === 'Breakeven') {
          acc[Timeframe].breakeven += 1;
        } else if (result === 'Lose') {
          acc[Timeframe].lose += 1;
        }
        

        return acc;
      }, {});

      // เปลี่ยนผลลัพธ์เป็น array
      const summarizedArray = Object.values(summary);
      setSummarizedData(summarizedArray);
    };

    summarizeData();
  }, [tradeData]);

  return (
    <div className="graph-container pt-8">
      <h2 className="text-center font-bold text-xl mb-4">Timeframe result</h2>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart data={summarizedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Timeframe" label={{ value: 'Timeframe', position: 'insideBottomRight', offset: -10 }} />
          <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* สร้างแท่งแยกสำหรับ win */}
          <Bar dataKey="win" fill="#82ca9d" name="Win" />
          {/* สร้างแท่งแยกสำหรับ breakeven */}
          <Bar dataKey="breakeven" fill="#8884d8" name="Breakeven" />
          {/* สร้างแท่งแยกสำหรับ lose */}
          <Bar dataKey="lose" fill="#ff6347" name="Lose" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradeGraphComponent;
