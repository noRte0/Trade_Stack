// components/twtechana/TWtechana.js

import { useEffect, useRef } from "react";

const TWtechana = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to add the TradingView script
    const loadScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        interval: "4h",
        width: "100%",
        isTransparent: false,
        height: "100%",
        symbol: "FXOPEN:XAUUSD",
        showIntervalTabs: true,
        displayMode: "single",
        locale: "en",
        colorTheme: "light",
      });

      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    };

    // Only load the script if the container exists
    if (containerRef.current) {
      // Clear previous content before adding the new script
      containerRef.current.innerHTML = ""; 
      loadScript();
    }

    // Clean up the script when the component is unmounted
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Clear previous widget
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ width: "100%", height: "100%", minHeight: "300px" }} // Ensure the container has a minimum height
    >
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TWtechana;
