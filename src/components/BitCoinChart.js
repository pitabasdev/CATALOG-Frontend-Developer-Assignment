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
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CompareIcon from "@mui/icons-material/Compare";

export default function BitCoinChart() {
  const [activeTab, setActiveTab] = useState("Chart"); // Tracks the active tab
  const [activeButton, setActiveButton] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

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

    if (activeTab === "Chart") {
      fetchData();
    }
  }, [activeTab]); // Fetch data only when the "Chart" tab is active

  // Render the chart or alternative content based on the active tab
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
        return <p>Statistics Content Here</p>; // You can replace this with real stats or graph
      case "Analysis":
        return <p>Analysis Content Here</p>; // You can add your analysis data or charts here
      default:
        return null;
    }
  };

  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

  const handleClick = (button) => {
    setActiveButton(button);
  };

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

          <Row className="mb-2">
            <Col md={5}>
              <ButtonGroup className="w-100">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="link"
                    className="text-muted"
                    style={{
                      fontSize: "16px",
                      textDecoration: "none",
                      width: "30px",
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

          <Row className="ml-5 mt-4">
            <Col md={10} className="text-center">
              <ButtonGroup>
                <Button
                  variant="link"
                  style={getButtonStyles("1d")}
                  onClick={() => handleClick("1d")}
                >
                  1d
                </Button>
                <Button
                  variant="link"
                  style={getButtonStyles("3d")}
                  onClick={() => handleClick("3d")}
                >
                  3d
                </Button>
                <Button
                  variant="link"
                  style={getButtonStyles("1w")}
                  onClick={() => handleClick("1w")}
                >
                  1w
                </Button>
                <Button
                  variant="link"
                  style={getButtonStyles("1m")}
                  onClick={() => handleClick("1m")}
                >
                  1m
                </Button>
                <Button
                  variant="link"
                  style={getButtonStyles("6m")}
                  onClick={() => handleClick("6m")}
                >
                  6m
                </Button>
                <Button
                  variant="link"
                  style={getButtonStyles("1y")}
                  onClick={() => handleClick("1y")}
                >
                  1y
                </Button>
                <Button
                  variant="link"
                  style={getButtonStyles("max")}
                  onClick={() => handleClick("max")}
                >
                  max
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col
              md={10}
              className="border rounded p-4"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {renderContent()}
            </Col>
          </Row>

          <Row className="justify-content-between mt-4">
            <Col className="text-left">
              <h5 className="font-weight-bold" style={{ color: "#1e1e1e" }}>
                $64,850.35
              </h5>
            </Col>
            <Col className="text-right">
              <h5 className="font-weight-bold" style={{ color: "#1e1e1e" }}>
                $63,179.71
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
