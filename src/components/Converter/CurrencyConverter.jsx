import React, { useState, useEffect } from "react";
import { getMarketData } from "../../api/fetchData";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CurrencyChart from "./CurrencyChart";
import "../Converter/CurrencyConverter.css";

const CurrencyConverter = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EGP");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getMarketData();
        setData(rates.rates);
        setLoading(false);

        const chart = Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          price: rates.rates[fromCurrency] * (0.98 + Math.random() * 0.04)
        }));
        setChartData(chart);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const fromRate = data[fromCurrency];
      const toRate = data[toCurrency];
      if (!fromRate || !toRate) return;
      const converted = (amount / fromRate) * toRate;
      setResult(converted.toFixed(2));

      const chart = Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        price: fromRate * (0.98 + Math.random() * 0.04)
      }));
      setChartData(chart);
    }
  }, [amount, fromCurrency, toCurrency, data]);

  if (loading) return <p>Loading...</p>;

  return (
   <section className="converter-section d-flex align-items-center justify-content-center">
  <Container>
    <Row className="align-items-stretch justify-content-center">
      {/* الجزء الأيسر: الفورم */}
      <Col xs={12} lg={6} className="mb-4">
        <Card
          className="p-4 shadow card custom-card"
          text="light"
          style={{ minHeight: "400px" }}
        >
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title className="mb-4 text-warning text-center">
              Currency Converter
            </Card.Title>
            <Form>
              <Row className="align-items-center g-3">
                <Col xs={12} md={4}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Form.Select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {Object.keys(data).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} md={1} className="text-center fw-bold fs-4">
                  ➡
                </Col>
                <Col xs={12} md={3}>
                  <Form.Select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {Object.keys(data).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form>

            <p className="mt-4 fs-5 text-center">
              {amount} {fromCurrency} ={" "}
              <span className="text-warning">{result}</span> {toCurrency}
            </p>

            <p className="text-center text-secondary mb-0">
              Last update: {new Date().toLocaleString()}
            </p>
          </Card.Body>
        </Card>
      </Col>

      {/* الجزء الأيمن: الشارت */}
      <Col xs={12} lg={6} className="mb-4">
        <Card className="p-4 shadow card custom-card">
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title className="mb-4 text-center text-warning">
              {fromCurrency}/EGP Price Chart
            </Card.Title>
            <CurrencyChart data={chartData} currency={fromCurrency} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

  );
};

export default CurrencyConverter;
