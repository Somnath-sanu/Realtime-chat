import Image from "next/image";
import React from "react";

type Props = {
  size?: number;
};

function LodingLogo({ size = 100 }: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        src="/logo.svg"
        alt="logo"
        width={size}
        height={size}
        className="animate-pulse duration-700"
        priority = {true}
      />
    </div>
  );
}

export default LodingLogo;
