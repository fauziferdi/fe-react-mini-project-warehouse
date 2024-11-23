import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const QrScannerComponent = ({ onScan }) => {
  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  return (
    <div className="text-center">
      <BarcodeScannerComponent
        width={400}
        height={400}
        onUpdate={(err, result) => {
          if (result) {
            handleScan(result.text);
          } else if (err) {
            console.log(err);
          }
        }}
      />
    </div>
  );
};

export default QrScannerComponent;
