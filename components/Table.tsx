import React from "react";
import { Product } from "@stripe/firestore-stripe-payments";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  products: Product[];
  selectedPlan: Product;
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map((product: Product) => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${
                  selectedPlan.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
              >
                AED{product.prices[0].unit_amount / 100}
              </td>
            );
          })}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((product: Product) => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${
                  selectedPlan.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
              >
                {product.metadata.videoQuality}
              </td>
            );
          })}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on you TV, computer,mobile phone and tablet{" "}
          </td>
          {products.map((product: Product) => {
            return (
              <td
                key={product.id}
                className={`tableDataFeature ${
                  selectedPlan.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
              >
                {product.metadata.portability === "true" && <CheckIcon />}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
