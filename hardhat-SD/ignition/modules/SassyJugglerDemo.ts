import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SassyJugglerDemo_Module = buildModule("SassyJugglerDemo", (m) => {
  const owner = "0xb7173e3dfdE30DCe071dDC5D181e17B77aEC5A01";
  const SassyJugglerDemo = m.contract("SassyJugglerDemo", [owner]);
  return { SassyJugglerDemo };
});

export default SassyJugglerDemo_Module;
