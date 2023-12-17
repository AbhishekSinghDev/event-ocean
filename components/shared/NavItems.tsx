"use client";
import React from "react";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li key={link.route}>
            <Link
              href={link.route}
              className={`${
                isActive && "text-primary-500 font-medium whitespace-nowrap"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
