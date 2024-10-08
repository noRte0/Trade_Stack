import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function TradeGraph() {
  const [tradeData, setTradeData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const res = await fetch('/api/graphplot');
      const data = await res.json();
      
      // Process data to get long/short order counts and win/loss results
      const processedData = processTradeData(data);
      setTradeData(processedData);
    };

    fetchData();
  }, []);

  const processTradeData = (trades) => {
    let longWins = 0, longLosses = 0, shortWins = 0, shortLosses = 0;

    trades.forEach(trade => {
      // แปลงตัวพิมพ์เล็กใหญ่เป็นพิมพ์เล็กทั้งหมดเพื่อเปรียบเทียบ
      const longShort = trade.LongShort.toLowerCase();
      const result = trade.result.toLowerCase();

      if (longShort === 'long') {
        if (result === 'win') {
          longWins++;
        } else if (result === 'lose') {
          longLosses++;
        }
      } else if (longShort === 'short') {
        if (result === 'win') {
          shortWins++;
        } else if (result === 'lose') {
          shortLosses++;
        }
      }
    });

    return [
      { name: 'Long Wins', wins: longWins, losses: longLosses },
      { name: 'Short Wins', wins: shortWins, losses: shortLosses }
    ];
  };

  return (
    <div>
    <h2 className="text-center font-bold text-xl mb-4 pt-6">Long/Short result</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={tradeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* แท่งสีเขียวสำหรับการชนะ */}
        <Bar dataKey="wins" fill="#4CAF50" name="Wins" />
        {/* แท่งสีแดงสำหรับการแพ้ */}
        <Bar dataKey="losses" fill="#F44336" name="Losses" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
