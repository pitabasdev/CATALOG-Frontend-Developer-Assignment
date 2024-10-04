import React,{useState} from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";

export default function BitCoinChart() {
  const [activeTab, setActiveTab] = useState("Chart"); // Default active tab

  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
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
              <p style={{ fontSize: "18px", color: "#32C48D" }}>
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
                      textDecoration:'none',
                      width:"30px",
                      color: activeTab === tab ? "#1e1e1e" : "#6c757d",
                      fontWeight: activeTab === tab ? "bold" : "normal",
                      borderBottom:
                        activeTab === tab ? "2px solid #4C6FFF" : "none", 
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>

          <Row className="justify-content-center mb-4">
            <Col md={8} className="text-center">
              <ButtonGroup>
                <Button variant="outline-secondary">1d</Button>
                <Button variant="outline-secondary">3d</Button>
                <Button
                  variant="primary"
                  style={{ backgroundColor: "#4C6FFF", borderColor: "#4C6FFF" }}
                >
                  1w
                </Button>
                <Button variant="outline-secondary">1m</Button>
                <Button variant="outline-secondary">6m</Button>
                <Button variant="outline-secondary">1y</Button>
                <Button variant="outline-secondary">max</Button>
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
