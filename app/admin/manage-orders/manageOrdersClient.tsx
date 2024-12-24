"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import { Heading } from "@/app/components/Heading";
import { Status } from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { ActionBtn } from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import moment from "moment";
import { RowOrderType } from "@/@types/table-types";
import { OrderFromUser } from "@/@types/order-types";

interface ManageOrdersClientProps {
  orders: OrderFromUser[];
}

export function mappingOrderToRows(orders: OrderFromUser[]): RowOrderType[] {
  return orders.map((order) => {
    return {
      id: order.id,
      customer: order.user.name,
      amount: formatPrice(order.amount / 100),
      paymentStatus: order.status,
      date: moment(order.createDate).fromNow(),
      deliveryStatus: order.deliveryStatus,
    };
  });
}

export const ManageOrdersClient = ({ orders }: ManageOrdersClientProps) => {
  const router = useRouter();
  const rows: RowOrderType[] = mappingOrderToRows(orders);

  const columns: GridColDef<RowOrderType>[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer", width: 130 },
    {
      field: "amount",
      headerName: "Amount(BRL)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className=" font-bold text-zinc-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return params.row.paymentStatus === "pending" ? (
          <div>
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-800"
            />
          </div>
        ) : params.row.paymentStatus === "complete" ? (
          <div>
            <Status
              text="complete"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-800"
            />
          </div>
        ) : (
          <></>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",

      width: 130,
      renderCell: (params) => {
        return params.row.deliveryStatus === "pending" ? (
          <div>
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-800"
            />
          </div>
        ) : params.row.deliveryStatus === "dispatched" ? (
          <div>
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-slate-800"
            />
          </div>
        ) : params.row.deliveryStatus === "delivered" ? (
          <div>
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          </div>
        ) : (
          <></>
        );
      },
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <div className=" flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDeliveryStatus(params.row.id, "dispatched");
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliveryStatus(params.row.id, "delivered");
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  // change the order delivery status
  const handleDeliveryStatus = useCallback(
    (orderId: string, status: "dispatched" | "delivered") => {
      axios
        .put("/api/order", {
          id: orderId,
          deliveryStatus: status,
        })
        .then((res) => {
          toast.success(`Order ${status}`);
          router.refresh();
        })
        .catch((error) => {
          toast.error("Oops! Something went wrong");
          console.log(error);
        });
    },
    [router]
  );

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading center title="Manage Orders" />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};
