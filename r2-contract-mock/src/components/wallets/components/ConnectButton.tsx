import React from "react";
import { Button, ButtonProps } from "antd";
export const ConnectButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      block
      className="h-12 border-none bg-[#068FFF] rounded-full text-white font-bold shadow-lg hover:scale-105 duration-300"
      {...props}
    >
      {children}
    </Button>
  );
};
