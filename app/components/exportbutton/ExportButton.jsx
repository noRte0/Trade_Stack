'use client';

import React from 'react';

const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await fetch('/api/export-data');
      
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'trade_techniques.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className='py-5'> 
    <button class="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4  inline-flex items-center rounded-3xl shadow-xl" onClick={handleExport} >
      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
      Export to CSV
    </button>
    </div>
  );
};

export default ExportButton;
