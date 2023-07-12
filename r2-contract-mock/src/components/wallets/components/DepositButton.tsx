import { Button, ButtonProps } from "antd";
export const DepositButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      block
      className="h-8 border-none bg-[#82CD47] rounded-full text-white font-bold shadow-lg hover:scale-105 duration-300"
      {...props}
    >
      {children}
    </Button>
  );
};
