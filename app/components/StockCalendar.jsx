'use client'

import { useEffect } from 'react';

const StockCalendar = () => {
  useEffect(() => {
    // สร้างสคริปต์
    const script = document.createElement('script');
    script.src = 'https://www.cashbackforex.com/Content/remote/remote-calendar-widget.js';
    script.async = true;

    // กำหนดค่าให้กับ RemoteCalendar หลังจากที่สคริปต์โหลดเสร็จ
    script.onload = () => {
      RemoteCalendar({
        "DefaultTime": "today",
        "DefaultTheme": "plain",
        "Url":"https://www.cashbackforex.com",
        "SubPath":"economic-calendar",
        "IsShowEmbedButton": true,
        "ContainerId": "economic-calendar-838029"
      });
    };

    // เพิ่มสคริปต์ใน DOM
    document.body.appendChild(script);

    // ล้างข้อมูลเมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="economic-calendar-838029"></div>
  );
};

export default StockCalendar;
