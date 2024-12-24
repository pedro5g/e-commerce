"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/fomatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType<T extends string = string> = Record<
  T,
  { label: string; digit: number }
>;

const initialSummaryData = {
  sale: {
    label: "Total Sale",
    digit: 0,
  },
  products: {
    label: "Total Product",
    digit: 0,
  },
  orders: {
    label: "Total Orders",
    digit: 0,
  },
  paidOrders: {
    label: "Paid Orders",
    digit: 0,
  },
  unpaidOrders: {
    label: "Unpaid Orders",
    digit: 0,
  },
  users: {
    label: "Total Users",
    digit: 0,
  },
};

export const Summary = ({ orders, products, users }: SummaryProps) => {
  const [summaryData, setSummaryData] =
    useState<SummaryDataType<keyof typeof initialSummaryData>>(
      initialSummaryData
    );

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        }
        return acc;
      }, 0);

      const paidOrders = orders.filter((o) => o.status === "complete");
      const unpaidOrders = orders.filter((o) => o.status === "pending");

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData) as Array<
    keyof typeof initialSummaryData
  >;

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
        <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {summaryKeys.length &&
            summaryKeys.map((key, i) => (
              <div
                key={key + i}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total Sale"
                    ? formatPrice(summaryData[key].digit)
                    : formatNumber(summaryData[key].digit)}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
