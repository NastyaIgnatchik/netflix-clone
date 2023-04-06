import React from "react";
import Head from "next/head";
import logo from "../public/netflix.png";
import Image from "next/image";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";
import UseAuth from "../hooks/UseAuth";
import UseSubscription from "../hooks/UseSubscription";
import {
  getProducts,
  Product,
} from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import Membership from "../components/Membership";

const Account = ({ products }: Product[]) => {
  const { user,logout } = UseAuth();
  const subscription = UseSubscription(user);

  return (
    <div>
      <Head>
        <title>Account Setting</title>
      </Head>
      <header className="bg-[#141414]">
        <Link href="/">
          <Image
              alt='logo'
            src={logo}
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <div className="space-x-2.5">
          <Link href="/account">
            <PersonIcon className="cursor-pointer rounded mb-1" />
          </Link>
          <button
            className="text-lg font-medium hover:underline"
            onClick={logout}
          >
            log out
          </button>
        </div>
      </header>
      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className=" flex item-center gap-x-1.5 mt-1.5">
            <ScheduleSharpIcon sx={{ color: "#e50914" }} />
            <p className="text-xs text-semibold text-[#555] pt-2.5">
              Member since{subscription?.created}
            </p>
          </div>
        </div>
        <Membership />
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>Plan Details</h4>
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product?.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            Change Plan
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Setting</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all device
          </p>
        </div>
      </main>
    </div>
  );
};

export default Account;

export const getStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((e) => {
      console.log(e.message);
    });

  return {
    props: {
      products,
    },
  };
};
