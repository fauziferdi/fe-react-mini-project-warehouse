import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const QrScannerComponent = ({ onScan }) => {
  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            handleScan(result.text);
          } else if (err) {
            console.log(err);
          }
        }}
      />
    </>
  );
};

export default QrScannerComponent;
