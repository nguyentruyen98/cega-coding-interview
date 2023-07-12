import { act, renderHook } from "@testing-library/react-hooks";
import useSummary from "./useSummary";
const mockResponse = [
  {
    id: 6,
    created_at: "2023-05-31T15:58:00.768661+00:00",
    transaction_type: "deposit",
    amount: 6000000,
    chain_name: "solana-mainnet",
  },
  {
    id: 5,
    created_at: "2023-01-31T15:58:00.768661+00:00",
    transaction_type: "withdraw",
    amount: 5000000,
    chain_name: "solana-mainnet",
  },
  {
    id: 4,
    created_at: "2023-01-30T10:08:24.031798+00:00",
    transaction_type: "deposit",
    amount: 4000000,
    chain_name: "ethereum-mainnet",
  },
  {
    id: 1,
    created_at: "2023-01-30T09:35:32.522875+00:00",
    transaction_type: "deposit",
    amount: 420420,
    chain_name: "ethereum-mainnet",
  },
  {
    id: 2,
    created_at: "2023-01-30T09:35:41.912627+00:00",
    transaction_type: "deposit",
    amount: 2000000,
    chain_name: "ethereum-mainnet",
  },
];
describe("useSummary", () => {
  it("success", async () => {
    function setupFetchStub() {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      });
    }
    jest.spyOn(global, "fetch").mockImplementation(setupFetchStub as any);

    const { result, waitForNextUpdate } = renderHook(() => useSummary());

    await waitForNextUpdate();
    expect(result.current.total.totalEthereum).toBe(6.42);
    expect(result.current.total.totalSolana).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errors).toBe("");
  });

  it("fail", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error("Fetch failed")));

    const { result, waitForNextUpdate } = renderHook(() => useSummary());

    await waitForNextUpdate();

    expect(result.current.total.totalEthereum).toBe(0);
    expect(result.current.total.totalSolana).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errors).toBe(
      "Something went wrong, please try again!"
    );
  });
  it("pending", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error("Fetch failed")));

    // Render the hook
    const { result } = renderHook(() => useSummary());
    act(() => {
      expect(result.current.total.totalEthereum).toBe(0);
      expect(result.current.total.totalSolana).toBe(0);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.errors).toBe("");
    });
  });
});
