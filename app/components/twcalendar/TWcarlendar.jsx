"use client";
import { useEffect } from 'react';

const TWcarlendar = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      isTransparent: false,
      width: '350',
      height: '550',
      locale: 'en',
      importanceFilter: '-1,0,1',
      countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
    });
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      if (document.querySelector('.tradingview-widget-container__widget')) {
        document.querySelector('.tradingview-widget-container__widget').removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>

    </div>
  );
};

export default TWcarlendar;
