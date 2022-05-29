import { useEffect, useState } from "react";
import "./index.css";
import AccountExportPrivateKey from "./AccountExportPrivateKey";
import AccountInfo from "./AccountInfo";
import { Dialog } from "@mui/material";

function AccountDetails({ Account, open, onClose }) {
  const [exportprivatekey, setExportprivatekey] = useState(false);

  const openExport = () => {
    if (Account) setExportprivatekey(true);
  };

  const closeExport = () => {
    setExportprivatekey(false);
  };

  useEffect(() => {
    if (!open) {
      setExportprivatekey(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      {!exportprivatekey ? (
        <AccountInfo
          openExport={openExport}
          Account={Account}
          onClose={onClose}
        />
      ) : (
        <>
          {Account ? (
            <AccountExportPrivateKey
              Account={Account}
              onClose={onClose}
              onBack={closeExport}
            />
          ) : null}
        </>
      )}
    </Dialog>
  );
}

export default AccountDetails;
