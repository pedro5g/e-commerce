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
import { useRouter } from "next/navigation";
import { RowOrderType } from "@/@types/table-types";
import { OrderFromUser } from "@/@types/order-types";
import { mappingOrderToRows } from "../admin/manage-orders/manageOrdersClient";

interface OrdersClientProps {
  orders: OrderFromUser[];
}

export const OrdersClient = ({ orders }: OrdersClientProps) => {
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
        if (!params.row.paymentStatus) return;

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
              color="text-purple-800"
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className=" flex justify-start gap-4 w-full">
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

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading center title="Your Orders" />
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
