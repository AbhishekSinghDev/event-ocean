import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <p className="font-bold text-lg">EventOcean</p>
        </Link>

        <div>
          <p className="flex items-center justify-center gap-2 font-medium w-full text-center text-sm">
            Made with{" "}
            <Image
              src="/assets/icons/love.svg"
              alt="love"
              height={20}
              width={20}
            />
            by{" "}
            <span className="text-orange-600 cursor-pointer font-bold">
              Abhishek Singh
            </span>
          </p>

          <p className="font-medium text-sm">
            2023 EventOcean. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
