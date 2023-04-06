import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import UseAuth from "../hooks/UseAuth";
import UseSubscription from "../hooks/UseSubscription";
import { goToBillingPortal } from "../lib/stripe";

const Membership = () => {
  const { user } = UseAuth();
  const subscription = UseSubscription(user);
  const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false);

  const manageSubscription = () => {
    if (subscription) {
      setIsBillingLoading(true);
      goToBillingPortal();
    }
  };
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-b-0 md:border-t md:px-0">
      <div className="space-y-2 py-4 flex flex-col">
        <h className="text-lg text-[gray]">Membership & Billing</h>
        <button
          disabled={isBillingLoading || !subscription}
          className="h-10 w-2/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
          onClick={manageSubscription}
        >
          {isBillingLoading ? (
            <CircularProgress
              size
              sx={{ color: "gray", width: "30px", height: "30px" }}
            />
          ) : (
            "Cancel Membership"
          )}
        </button>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col justify-between py-4 md:flex-row border-b border-white/10">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">Password:*********</p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Change email</p>
            <p className="membershipLink">Change password</p>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4 md:flex-row md:pb-0">
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? "Your membership will end on"
                : "Your next billing date on"}
              {subscription?.current_period_end}
            </p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Manage payment info</p>
            <p className="membershipLink">Add backup payment method</p>
            <p className="membershipLink">Billing details</p>
            <p className="membershipLink">Change billing day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
