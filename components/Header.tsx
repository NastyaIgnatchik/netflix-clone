import React, { useEffect, useState } from "react";
import logo from "../public/netflix.png";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import BasicMenu from "./BasicMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <div>
      <header className={`${isScrolled && "bg-[#141414]"} `}>
        <div className="flex items-center space-x-2 md:space-x-10">
          <Image
            src={logo}
            alt='logo'
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
          <BasicMenu />
          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          <SearchIcon className="hidden sm:inline" />
          <p className="hidden lg:inline">Kids</p>
          <NotificationsIcon />
          <Link href="/account">
            <PersonIcon />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
