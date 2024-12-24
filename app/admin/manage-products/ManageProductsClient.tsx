"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import { Heading } from "@/app/components/Heading";
import { Status } from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { ActionBtn } from "@/app/components/ActionBtn";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { firebaseApp } from "@/libs/firebase";
import { RowProductType } from "@/@types/table-types";
import { ImageType, Product } from "@/@types/product-types";

interface ManageProductsClient {
  products: Product[];
}

function mappingProductsToRows(products: Product[]): RowProductType[] {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      images: product.images,
    };
  });
}

export const ManageProductsClient = ({ products }: ManageProductsClient) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  const rows: RowProductType[] = mappingProductsToRows(products);

  const columns: GridColDef<RowProductType>[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(BRL)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className=" font-bold text-zinc-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-red-200"
                color="text-red-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <div className=" flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              animate={animate}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDeleteProduct(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  // handle events
  const handleToggleStock = useCallback(
    // toggles the status of product
    (id: string, inStock: boolean) => {
      setAnimate(true);
      axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then(() => {
          toast.success("Product status changed.");
          setAnimate(false);
          router.refresh();
        })
        .catch((err) => {
          toast.error("Oops! Something went wrong");
          console.error(err);
        });
    },
    [router]
  );

  const handleDeleteProduct = useCallback(
    async (id: string, images: ImageType[]) => {
      toast("Deleting product, please wait!");

      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image as string);
              await deleteObject(imageRef);
              console.log("image deleted", item.image);
            }
          }
        } catch (err) {
          return console.log("Deleting images error", err);
        }
      };

      await handleImageDelete();

      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          toast.success("Product deleted.");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Failed to delete product");
          console.error(err);
        });
    },
    [router, storage]
  );

  return (
    <>
      <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
          <Heading center title="Manage Products" />
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
    </>
  );
};
