'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MostUsedTechniques = () => {
  const [techniqueData, setTechniqueData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechniqueData = async () => {
      try {
        const res = await fetch('/api/techniques-count');
        if (res.ok) {
          const data = await res.json();
          // ตรวจสอบโครงสร้างข้อมูลที่ได้รับ
          console.log(data);
          
          // แปลงข้อมูลให้เป็น array ที่สามารถใช้ได้ในกราฟ
          const formattedData = data.map(item => ({
            technique: item.technique,
            count: item._count.technique
          }));
          
          setTechniqueData(formattedData);
        } else {
          const errorMessage = await res.json();
          setError(errorMessage.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      }
    };

    fetchTechniqueData();
  }, []);

  return (
    <div className="graph-container pt-8">
      {error && (
        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
          {error}
        </div>
      )}
      <h2 className="text-center font-bold text-xl mb-4">Amount Technique</h2>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart data={techniqueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="technique" label={{ value: 'Technique', position: 'insideBottomRight', offset: -10 }} />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Usage Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MostUsedTechniques;
