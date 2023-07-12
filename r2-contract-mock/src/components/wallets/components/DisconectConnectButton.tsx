import React from "react";
import { Button, ButtonProps } from "antd";
export const DisconnectButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      block
      className="h-8 border-none bg-[#B70404] rounded-full text-white font-bold shadow-lg hover:scale-105 duration-300"
      {...props}
    >
      Disconnect
    </Button>
  );
};
