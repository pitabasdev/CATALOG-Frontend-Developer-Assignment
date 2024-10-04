import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CompareIcon from '@mui/icons-material/Compare';
import axios from "axios";
import './App.css';

function App() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Chart'); // Tracks the active tab

  // Fetch data from API (for Chart tab)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
        );
        const data = await response.json();

        const prices = data.prices.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          value: item[1],
        }));

        setChartData(prices);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
      setLoading(false);
    };

    if (activeTab === 'Chart') {
      fetchData();
    }
  }, [activeTab]); // Fetch data only when the "Chart" tab is active

  // Render the chart or alternative content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Chart':
        return (
          <div className="chart-container">
            {loading ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        );
      case 'Statistics':
        return <p>Statistics Content Here</p>; // You can replace this with real stats or graph
      case 'Analysis':
        return <p>Analysis Content Here</p>; // You can add your analysis data or charts here
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>$63,179.71 USD</h1>
        <p className="subtext">+2,161.42 (3.54%)</p>
      </div>

      {/* Menu */}
      <div className="menu">
        <span className={activeTab === 'Chart' ? 'active' : ''} onClick={() => setActiveTab('Chart')}>Chart</span>
        <span className={activeTab === 'Statistics' ? 'active' : ''} onClick={() => setActiveTab('Statistics')}>Statistics</span>
        <span className={activeTab === 'Analysis' ? 'active' : ''} onClick={() => setActiveTab('Analysis')}>Analysis</span>
      </div>

      {/* Chart Controls */}
      {activeTab === 'Chart' && (
        <div className="controls">
          <div className="left-controls">
            <FullscreenIcon />
            <CompareIcon />
          </div>
          <div className="right-controls">
            <span>1d</span>
            <span>3d</span>
            <span className="active">1w</span>
            <span>1m</span>
            <span>6m</span>
            <span>1y</span>
            <span>max</span>
          </div>
        </div>
      )}


      {renderContent()}

      {activeTab === 'Chart' && (
        <div className="price-points">
          <span className="point" style={{ left: '20%' }}>64,850.35</span>
          <span className="point" style={{ left: '80%' }}>63,179.71</span>
        </div>
      )}
    </div>
  );
}

export default App;
