"use client";
import { Heading } from "@/app/components/Heading";
import { Status } from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { OrderItem } from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className=" max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <span>Order ID: {order.id}</span>
      <div>
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>
      <div className=" inline-flex gap-2">
        <p>Payment status: </p>
        <div className="w-fit">
          {order.status === "pending" && (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-800"
            />
          )}
          {order.status === "complete" && (
            <Status
              text="complete"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-800"
            />
          )}
        </div>
      </div>
      <div className=" inline-flex gap-2">
        <p>Delivery status: </p>
        <div className="w-fit">
          {order.deliveryStatus === "pending" && (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-800"
            />
          )}
          {order.deliveryStatus === "dispatched" && (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-800"
            />
          )}
          {order.deliveryStatus === "delivered" && (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-800"
            />
          )}
        </div>
      </div>
      <span>Date: {moment(order.createDate).fromNow()}</span>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products orders</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order.products.map((item) => (
          <OrderItem product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
