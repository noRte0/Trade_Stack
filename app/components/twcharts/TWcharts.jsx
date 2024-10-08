import React, { useEffect, useRef, memo } from 'react';

const TWcharts = () => {
  const container = useRef(null);

  useEffect(() => {
    // Only run on the client-side
    if (container.current) {
      const existingScript = document.getElementById('tradingview-widget-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-script';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
          autosize: true,
          symbol: 'OANDA:XAUUSD',
          interval: '240',
          timezone: 'Asia/Bangkok',
          theme: 'light',
          style: '1',
          locale: 'en',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          calendar: false,
          studies: ['STD;RSI'],
          hide_volume: true,
          support_host: 'https://www.tradingview.com'
        });
        container.current.appendChild(script);
      }
    }

    // Cleanup: Remove the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('tradingview-widget-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
    </div>
  );
};

export default memo(TWcharts);
