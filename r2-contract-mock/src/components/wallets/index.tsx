import React from "react";
import { Tabs, TabsProps } from "antd";
import Ethereum from "./Ethereum";
import Solana from "./Solana";
const Wallets = () => {
  const tabs: TabsProps["items"] = [
    { label: <TabLabel label="Ethereum" />, key: "1", children: <Ethereum /> },
    { label: <TabLabel label="Solana" />, key: "2", children: <Solana /> },
  ];
  return (
    <div className="mt-6">
      <h1 className="font-bold text-black mb-2">Connect to Wallet</h1>
      <Tabs tabPosition="left" items={tabs} />
    </div>
  );
};

type TabLabelProps = {
  label: "Ethereum" | "Solana";
};
const TabLabel = ({ label }: TabLabelProps) => {
  return <div className="text-lg font-semibold">{label}</div>;
};
export default Wallets;
