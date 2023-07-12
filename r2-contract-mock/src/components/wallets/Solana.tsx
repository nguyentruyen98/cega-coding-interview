import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useState } from "react";
import React, { useMemo } from "react";
import { Address, DisconnectButton, DepositButton } from "./components";
import { Col, Row } from "antd";
import { PostDepositParams, postDeposit } from "./utils";
require("@solana/wallet-adapter-react-ui/styles.css");

export const Solana: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default Solana;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const { publicKey, disconnect } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const [depositError, setDepositError] = useState("");
  const [isDepositSuccess, setIsDepositSuccess] = useState(false);
  const handleDeposit = async ({ amount, chain_name }: PostDepositParams) => {
    const res = await postDeposit({ amount, chain_name });
    res.success
      ? setIsDepositSuccess(res.success)
      : setDepositError("Something went wrong, please try again!");
  };
  if (publicKey) {
    return (
      <div className="grow space-y-2">
        <Address address={base58} />
        <Row gutter={12}>
          <Col span={14}>
            <DepositButton
              onClick={() =>
                handleDeposit({ amount: 100000, chain_name: "solana-mainnet" })
              }
            >
              Deposit
            </DepositButton>
          </Col>
          <Col span={10}>
            <DisconnectButton onClick={() => disconnect()}>
              Disconnect
            </DisconnectButton>
          </Col>
        </Row>
        {isDepositSuccess && (
          <p className="text-green-800 font-semibold italic">Success!</p>
        )}
        {depositError && (
          <p className="text-red-600 font-semibold italic">{depositError}</p>
        )}
      </div>
    );
  }
  return (
    <WalletMultiButton className="!h-12 !border-none !bg-[#068FFF] !rounded-full !text-white !font-bold !shadow-lg !hover:scale-105 duration-300 !w-full flex justify-center" />
  );
};
