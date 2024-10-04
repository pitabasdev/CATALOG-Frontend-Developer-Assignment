import React, { useState, useEffect } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const timeframes = {
  "1d": 1,
  "3d": 3,
  "1w": 7,
  "1m": 30,
  "6m": 180,
  "1y": 365,
  max: "max",
};

export default function BitCoinChart() {
  const [activeTab, setActiveTab] = useState("Chart");
  const [activeButton, setActiveButton] = useState("1w");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeframes[activeButton]}`
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

    if (activeTab === "Chart") {
      fetchData();
    }
  }, [activeTab, activeButton]);

  const renderContent = () => {
    switch (activeTab) {
      case "Chart":
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        );
      case "Statistics":
        return <p>Statistics Content Here</p>;
      case "Analysis":
        return <p>Analysis Content Here</p>;
      default:
        return null;
    }
  };

  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
  const getButtonStyles = (button) => {
    return {
      color: activeButton === button ? "#ffffff" : "#6c757d",
      textDecoration: "none",
      padding: "0.5rem 1rem",
      fontWeight: activeButton === button ? "bold" : "normal",
      backgroundColor: activeButton === button ? "#4C6FFF" : "transparent",
      borderRadius: activeButton === button ? "5px" : "0",
    };
  };
  return (
    <div>
      <div>
        <Container className="mt-4">
          <Row className="mb-4">
            <Col md={10} className="text-left">
              <h1
                className="display-6"
                style={{ fontWeight: "bold", color: "#1e1e1e" }}
              >
                63,179.71 <sup style={{ color: "#D3D3D3" }}>USD</sup>
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "#32C48D",
                  fontWeight: "bold",
                }}
              >
                +2,161.42 (3.54%)
              </p>
            </Col>
          </Row>

          {/* Tab Navigation */}
          <Row className="mb-2">
            <Col md={5}>
              <ButtonGroup className="w-100 tab-buttons">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="link"
                    className="text-muted"
                    style={{
                      fontSize: "16px",
                      textDecoration: "none",
                      color: activeTab === tab ? "#1e1e1e" : "#6c757d",
                      fontWeight: activeTab === tab ? "bold" : "normal",
                      borderBottom:
                        activeTab === tab ? "3px solid #4C6FFF" : "none",
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>

          <Row>
            <Col md={11}>
              <hr
                style={{
                  marginTop: "-9px",
                  backgroundColor: "#E0FFFF",
                  marginLeft: "5px",
                }}
              ></hr>
            </Col>
          </Row>

          {/* Time-frame buttons */}
          <Row className="ml-5 mt-4 mb-2">
            <Col md={10} className="text-center">
              <ButtonGroup>
                {Object.keys(timeframes).map((time) => (
                  <Button
                    key={time}
                    variant="link"
                    style={getButtonStyles(time)}
                    onClick={() => setActiveButton(time)}
                  >
                    {time}
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>

          {/* Chart/Content */}
          <Row className="justify-content-center">
            <Col
              md={10}
              className="border rounded p-4"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
