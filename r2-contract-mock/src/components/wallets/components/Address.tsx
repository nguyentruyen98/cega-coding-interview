import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

type AddressProps = {
  address?: string;
};
export const Address = ({ address }: AddressProps) => {
  return (
    <div className=" border border-solid border-[#ddd] py-1 px-4 rounded-full bg-white flex items-center">
      <Text
        className="grow"
        style={{ width: 250 }}
        ellipsis={{ tooltip: address }}
        copyable={{ tooltips: false }}
      >
        {address}
      </Text>
    </div>
  );
};
