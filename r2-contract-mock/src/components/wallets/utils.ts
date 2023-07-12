const DEPOSIT_API_ENDPOINT =
  "https://shadowed-harmonious-receipt.glitch.me/ledger/transaction_type";

export type PostDepositParams = {
  chain_name: "ethereum-mainnet" | "solana-mainnet";
  amount: number;
};
async function postDeposit({ chain_name, amount }: PostDepositParams) {
  try {
    const rawResponse = await fetch(DEPOSIT_API_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_type: "deposit",
        amount,
        chain_name,
      }),
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return error;
  }
}
export { postDeposit };
