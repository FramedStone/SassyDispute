import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SassyJuggler_Module = buildModule("SassyJuggler", (m) => {
  const owner = "0xb7173e3dfdE30DCe071dDC5D181e17B77aEC5A01";
  const SassyJuggler = m.contract("SassyJuggler", [owner]);
  return { SassyJuggler };
});

const ERC20_Module = buildModule("SassyToken", (m) => {
  const { SassyJuggler } = m.useModule(SassyJuggler_Module);

  const initialOwner = "0xb7173e3dfdE30DCe071dDC5D181e17B77aEC5A01";
  const ERC20 = m.contract("SassyToken", [initialOwner, SassyJuggler]);
  return { ERC20 };
});

export default ERC20_Module;
