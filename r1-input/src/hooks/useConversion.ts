import { useEffect, useState } from "react";

const RATIO_API_ENDPOINT =
  " https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd";

function useConversion() {
  const [toggle, setToggle] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    fetchRatio();
  }, []);
  const fetchRatio = async () => {
    try {
      const response = await fetch(RATIO_API_ENDPOINT);
      const data = await response.json();
      setRatio(data.dogecoin.usd);
    } catch (err) {
      setErrors("Something went wrong, please try again!");
    }
  };
  const handleConvert = (values: number) => {
    setAmount(values / ratio);
  };
  const handleSwitch = (values: number) => {
    setRatio((prevState) => {
      const newRatio = 1 / prevState;
      setAmount(values / newRatio);
      return newRatio;
    });
    setToggle(!toggle);
  };

  return {
    setRatio,
    errors,
    handleConvert,
    amount,
    handleSwitch,
    toggle,
  };
}
export default useConversion;
