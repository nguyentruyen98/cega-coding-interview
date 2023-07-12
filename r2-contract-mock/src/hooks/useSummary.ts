import { useEffect, useState } from "react";

const TRANSACTION_LIST_ENDPOINT =
  "https://shadowed-harmonious-receipt.glitch.me/ledger";

type TransactionType = {
  id: number;
  chain_name: "ethereum-mainnet" | "solana-mainnet";
  created_at: string;
  amount: number;
  transaction_type: "deposit" | "withdraw";
};
function useSummary() {
  const [total, setTotal] = useState({ totalEthereum: 0, totalSolana: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    fetchListTransaction();
  }, []);
  const fetchListTransaction = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(TRANSACTION_LIST_ENDPOINT);
      const data = await response.json();
      const { totalEthereum, totalSolana } = calculatorTotal(data);
      setTotal({ totalEthereum, totalSolana });
    } catch (error) {
      setErrors("Something went wrong, please try again!");
    } finally {
      setIsLoading(false);
    }
  };
  return { total, isLoading, errors };
}
export default useSummary;

const calculatorTotal = (list: TransactionType[]) => {
  let totalEthereum = 0;
  let totalSolana = 0;
  for (const item of list) {
    if (item.chain_name === "ethereum-mainnet") {
      if (item.transaction_type === "deposit") totalEthereum += item.amount;
      else totalEthereum -= item.amount;
    } else {
      if (item.transaction_type === "deposit") totalSolana += item.amount;
      else totalSolana -= item.amount;
    }
  }

  totalEthereum = Math.round((totalEthereum * 100) / 1000000) / 100;
  totalSolana = Math.round((totalSolana * 100) / 1000000) / 100;
  return { totalEthereum, totalSolana };
};
