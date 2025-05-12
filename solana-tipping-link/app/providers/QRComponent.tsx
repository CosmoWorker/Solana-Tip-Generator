// components/QrCodeComponent.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";

type QrCodeProps = {
  value: string;
  size?: number;
  className?: string;
  bgColor?: string;
  fgColor?: string;
};

export default function QrCodeComponent({
  value,
  size = 200,
  className,
  bgColor = "white",
  fgColor = "black",
}: QrCodeProps) {
  return (
    <div className={className}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level="H"
        includeMargin={false}
      />
    </div>
  );
}