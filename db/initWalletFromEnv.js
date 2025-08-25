import fs from "fs";
import os from "os";
import path from "path";

export function initWalletFromEnv() {
  const walletDir = path.join(os.tmpdir(), "wallet");
  if (!fs.existsSync(walletDir)) fs.mkdirSync(walletDir);

  const files = [
    ["tnsnames.ora", process.env.WALLET_TNSNAMES_ORA],
    ["sqlnet.ora",   process.env.WALLET_SQLNET_ORA],
    ["cwallet.sso",  process.env.WALLET_CWALLET_SSO],
    ["ewallet.p12",  process.env.WALLET_EWALLET_P12],
  ];

  for (const [name, b64] of files) {
    const clean = b64.replace(/\s+/g, "");
    fs.writeFileSync(path.join(walletDir, name), Buffer.from(clean, "base64"));
  }

  process.env.TNS_ADMIN = walletDir;
}