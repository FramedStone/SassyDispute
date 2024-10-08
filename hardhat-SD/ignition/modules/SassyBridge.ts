import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SassyBridge_ModuleV2 = buildModule("SassyBridgeV2", (m) => {
  const initialOwner = "0xb7173e3dfdE30DCe071dDC5D181e17B77aEC5A01";
  const SassyBridge = m.contract("SassyBridgeV2", [initialOwner]);
  return { SassyBridge };
});

export default SassyBridge_ModuleV2;
