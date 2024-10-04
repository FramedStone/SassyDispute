import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SassyJuggler_Module = buildModule("SassyToken", (m) => {
  const owner = "0xb7173e3dfdE30DCe071dDC5D181e17B77aEC5A01";
  const SassyJuggler = m.contract("SassyToken", [owner]);
  return { SassyJuggler };
});

export default SassyJuggler_Module;
