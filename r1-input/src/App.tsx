import React from "react";
import "./App.css";
import { Form, InputNumber, Row, Col, Button } from "antd";
import useConversion from "./hooks/useConversion";
const DOGECOIN_IMAGE =
  "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256";
function App() {
  const { errors, toggle, amount, handleConvert, handleSwitch } =
    useConversion();
  const [form] = Form.useForm<{ amount: number }>();
  const inputValue = Form.useWatch("amount", form);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#AAC8A7] to-[#E9FFC2]">
      <div className="p-6 w-96 bg-white rounded-md flex flex-col shadow-xl text-[#0079FF]">
        <h1 className="text-lg font-bold text-center uppercase mb-4">
          Currency Conversion
        </h1>
        <Form form={form} onFinish={(values) => handleConvert(values.amount)}>
          <label className="text-base font-semibold">
            {toggle ? "Dogecoin" : "USD"}
          </label>
          <div className="flex flex-row w-full space-x-2">
            <Form.Item className="grow mb-0" name="amount">
              <InputNumber className="w-full h-12 grow" placeholder="Please enter your amount" />
            </Form.Item>
            {toggle && (
              <img src={DOGECOIN_IMAGE} className="w-12 h-12" alt="Dogecoin" />
            )}
          </div>
          <p className="mt-4 mb-2">{conversionText(amount, toggle)}</p>
          {errors && <p className="text-red-600 italic">{errors}</p>}
          <Row gutter={12} className="mt-2">
            <Col span={14}>
              <Button
                className="bg-[#00DFA2] border-none h-12 text-lg font-bold text-white hover:scale-105 shadow-lg"
                block
                htmlType="submit"
                disabled={!inputValue}
              >
                Convert
              </Button>
            </Col>
            <Col span={10}>
              <Button
                className="bg-[#0079FF] border-none h-12 text-lg font-bold text-white hover:scale-105 shadow-lg"
                block
                onClick={() => handleSwitch(inputValue)}
                disabled={!inputValue}
              >
                Switch
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default App;
const conversionText = (amount: number, toggle: boolean) => {
  if (toggle)
    return (
      <p>
        Amount of USD:{" "}
        <span className="font-bold">${Math.round(amount * 100) / 100}</span>{" "}
        USD.
      </p>
    );
  return (
    <p>
      Amount of Dogecoin:{" "}
      <span className="font-bold">
        {Math.round(amount * 100000000) / 100000000}
      </span>{" "}
      tokens.
    </p>
  );
};
