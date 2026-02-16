"use client";

import Image from "next/image";

export default function CommonHero({
  imageSrc = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww", // Default Palace Image
}) {
  return (
    <div className=" w-full">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt="Page Header"
        height={900}
        width={900}
        className="object-cover h-120 w-full " // Thoda dark kiya taaki text pop kare
        priority
      />
    </div>
  );
}
