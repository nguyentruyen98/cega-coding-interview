import React from "react";
import useSummary from "../../hooks/useSummary";
import { Row, Col } from "antd";
const Summary = () => {
  const { total, isLoading, errors } = useSummary();
  return (
    <div>
      <h1 className=" font-bold text-black mb-4">Transaction Balance</h1>
      <div className="space-y-2">
        <TotalLabel
          amount={total.totalEthereum}
          chainName="Ethereum"
          isLoading={isLoading}
          errors={errors}
        />
        <TotalLabel
          amount={total.totalSolana}
          chainName="Solana"
          isLoading={isLoading}
          errors={errors}
        />
      </div>
    </div>
  );
};
type TotalLabelProps = {
  amount: number;
  chainName: "Ethereum" | "Solana";
  isLoading: boolean;
  errors: string;
};
const TotalLabel = ({
  amount,
  chainName,
  isLoading,
  errors,
}: TotalLabelProps) => {
  return (
    <div>
      <Row className="grow" justify="space-between" align="middle" gutter={12}>
        <Col span={6} className="flex justify-start">
          <label className="text-lg text-black">{chainName}</label>
        </Col>
        <Col span={18}>
          <div className="flex grow justify-between space-x-2 items-center">
            <p className="px-4 py-2 border border-solid border-[#379237] bg-[#54B435] rounded-full grow hover:scale-105 cursor-pointer duration-300 shadow-md">
              <span className="font-bold text-center">
                {isLoading ? "Loading" : amount}
              </span>
            </p>
            <p className="text-lg h-8 font-semibold italic text-black">USDC</p>
          </div>
        </Col>
      </Row>
      {errors && (
        <p className="text-red-600 font-semibold italic">
          Something went wrong, please try again!
        </p>
      )}
    </div>
  );
};
export default Summary;
