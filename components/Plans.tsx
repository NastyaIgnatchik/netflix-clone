import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../public/netflix.png";
import Link from "next/link";
import UseAuth from "../hooks/UseAuth";
import CheckIcon from "@mui/icons-material/Check";
import { Product } from "@stripe/firestore-stripe-payments";
import Table from "./Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { session } from "../lib/stripe";

const Plans = ({ products }: Product[] | any) => {
  const { logout, user } = UseAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null | any>(products[2]);
  const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false);

  const subscribePlan = () => {
    if (!user) return;
    session(selectedPlan?.prices[0].id);
    setIsBillingLoading(true);
  };
  return (
    <div>
      <Head>
        <title>Netflix</title>
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <Image
            src={logo}
            width={100}
            alt='logo'
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>

        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          log out
        </button>
      </header>
      <main className="pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10 mx-auto">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you{" "}
        </h1>
        <ul>
          <li className="flex item-center gap-x-2 text-lg">
            <CheckIcon className="text-[#e50914]" />
            Watch all you want. Ad-free
          </li>
          <li className="flex item-center gap-x-2 text-lg">
            <CheckIcon className="text-[#e50914]" />
            Recommendation just for you
          </li>
          <li className="flex item-center gap-x-2 text-lg">
            <CheckIcon className="text-[#e50914]" />
            Change or cancel yore plan anytime{" "}
          </li>
        </ul>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center md:w-3/5 self-end">
            {products.map((product: Product | any) => {
              return (
                <div
                  key={product.id}
                  className={`planBox ${
                    selectedPlan.id === product.id
                      ? "opacity-100"
                      : "opacity-60"
                  }`}
                  onClick={() => setSelectedPlan(product)}
                >
                  {product.name}
                </div>
              );
            })}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto mt-0 w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribePlan}
          >
            {isBillingLoading ? (
              <Box>
                <CircularProgress sx={{ color: "gray" }} />
              </Box>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
