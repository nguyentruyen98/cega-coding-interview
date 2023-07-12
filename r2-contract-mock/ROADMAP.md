# Road map for Application
## 1. Add/change
-   Add more wallets instead of the current only 2 wallets, MetaMask and Phatom.
-   UI/UX improvements.
-   Improves the performance of functions such as `calculatorTotal`...
-   Add some test cases.
-   Take a closer look at the related wallet libraries.
-   Refactor code.
-   Fix console warning.
-   ...

## 2. Some test case
```
test 1: useSummary
    case1: useSummary is pending
        expect(isLoading) is true 
        expect(total) is {totalEthereum: 0, totalSolana: 0}
        expect(errors) is "" 
    case2: useSummary is success
        expect(isLoading) is false 
        expect(total) is {totalEthereum: number, totalSolana: number}
        expect(errors) is "" 
    case3: useSummary is fail
        expect(isLoading) is false 
        expect(total) is {totalEthereum: 0, totalSolana: 0}
        expect(errors) is "Something went wrong, please try again!" 
```
For more detail, please see: `src/hooks/useSumnary.test.tsx`
## 3. Some documents
-   Wagmi
    -   [Example](https://wagmi.sh/examples/connect-wallet)
    -   [Github](https://github.com/wagmi-dev/wagmi)

-   Solana Lab's Wallet Adapater
    -   [Github](https://github.com/solana-labs/wallet-adapter)
    -   [Demo](https://solana-labs.github.io/wallet-adapter/example/)
