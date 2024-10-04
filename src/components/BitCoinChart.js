import React, { useState } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";

export default function BitCoinChart() {
  const [activeTab, setActiveTab] = useState("Chart"); 
  const [activeButton, setActiveButton] = useState(null); 

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
        {" "}
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
              <div className="chart-placeholder" style={{ height: "250px" }}>
                <p className="text-muted text-center">
                  Chart will be displayed here
                </p>
              </div>
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
