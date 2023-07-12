import { useState } from "react";
import {
  WagmiConfig,
  createConfig,
  mainnet,
  useAccount,
  useConnect,
  useDisconnect,
  configureChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { PostDepositParams, postDeposit } from "./utils";
import {
  ConnectButton,
  Address,
  DisconnectButton,
  DepositButton,
} from "./components";
import { Col, Row } from "antd";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  // We can add more wallet, for this Demo a just use MetaMask
  connectors: [new MetaMaskConnector({ chains })],
});
const Ethereum = () => {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  );
};

function Profile() {
  const { address, isConnected } = useAccount();
  const [depositError, setDepositError] = useState("");
  const [isDepositSuccess, setIsDepositSuccess] = useState(false);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const handleDeposit = async ({ amount, chain_name }: PostDepositParams) => {
    const res = await postDeposit({ amount, chain_name });
    res.success
      ? setIsDepositSuccess(res.success)
      : setDepositError("Something went wrong, please try again!");
  };
  if (isConnected) {
    return (
      <div className="grow space-y-2">
        <Address address={address} />
        <Row gutter={12}>
          <Col span={14}>
            <DepositButton
              onClick={() =>
                handleDeposit({
                  amount: 100000,
                  chain_name: "ethereum-mainnet",
                })
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
    <div className="grow">
      {connectors.map((connector) => (
        <ConnectButton
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </ConnectButton>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}

export default Ethereum;
