"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { ChevronDown, ChevronUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface WalletDropdownProps {
  walletAddress: string;
  onDisconnect: () => void;
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

// const iconVariants = {
//   idle: { rotate: 0 },
//   connecting: {
//     rotate: 360,
//     transition: { duration: 1, repeat: Infinity, ease: "linear" },
//   },
//   connected: { rotate: 0 },
// };

export default function WalletDropdown({
  walletAddress,
  onDisconnect,
}: WalletDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(true);

  const handleDisconnect = () => {
    setIsDisconnecting(true);
    setShowMenuItems(false);

    setTimeout(() => {
      setIsDisconnecting(false);
      setShowMenuItems(true);
      onDisconnect();
    }, 2000);
  };

  const menuItems = [
    { label: "Home", onClick: () => {} },
    { label: "Profile", onClick: () => {} },
    { label: "Settings", onClick: () => {} },
    {
      label: "Disconnect Wallet",
      onClick: handleDisconnect,
      className: "text-red-600",
    },
  ];

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <motion.div
            // variants={iconVariants}
            animate={isDisconnecting ? "connecting" : "idle"}
            style={{ transformOrigin: "50% 50%" }}
          >
            <Wallet className="mr-2 h-4 w-4" />
          </motion.div>
          {shortenAddress(walletAddress)}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isDisconnecting ? (
          <DropdownMenuItem>Disconnecting...</DropdownMenuItem>
        ) : (
          showMenuItems &&
          menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <DropdownMenuItem
                onClick={item.onClick}
                className={item.className}
              >
                {item.label}
              </DropdownMenuItem>
            </motion.div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
