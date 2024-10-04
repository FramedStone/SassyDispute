import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20_Module = buildModule("SassyToken", (m) => {
  const initialOwner = "0xb7173e3dfdE30DCe071dDC5D181e17B77aEC5A01";
  const ERC20 = m.contract("SassyToken", [initialOwner]);
  return { ERC20 };
});

export default ERC20_Module;
