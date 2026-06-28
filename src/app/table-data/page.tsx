"use client";
import { useState } from "react";
import { columns } from "@/components/tables/Columns";
import { DataTable } from "@/components/tables/TableComponent";
import { ViewProductDetail } from "@/components/ui/view-detail-product";
import {
  useDeleteProductByUuidMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "@/services/ecommerce";
import { toast } from "sonner";

export default function DataTablePage() {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const { data } = useGetAllProductQuery({
    page: 0,
    size: 10000,
  });
  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProductByUuid, { isLoading: isDeleting }] =
    useDeleteProductByUuidMutation();

  const handleViewDetail = (uuid: string) => {
    setSelectedUuid(uuid);
  };

  const handleClose = () => {
    setSelectedUuid(null);
  };

  const product = {
    name: "Kert ey men",
    description:
      "Premium ultrabook with high performance, designed for developers and creative professionals.",
    stockQuantity: 25,
    priceIn: 1450,
    priceOut: 1899,
    discount: 5,
    color: [
      {
        color: "Platinum Silver",
        images: [
          "https://example.com/images/dell-xps-15/silver-1.jpg",
          "https://example.com/images/dell-xps-15/silver-2.jpg",
        ],
      },
      {
        color: "Graphite Black",
        images: [
          "https://example.com/images/dell-xps-15/black-1.jpg",
          "https://example.com/images/dell-xps-15/black-2.jpg",
        ],
      },
    ],
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
    warranty: "2 years international warranty",
    availability: true,
    images: [
      "https://example.com/images/dell-xps-15/main-1.jpg",
      "https://example.com/images/dell-xps-15/main-2.jpg",
      "https://example.com/images/dell-xps-15/main-3.jpg",
    ],
    categoryUuid: "462d9f60-8346-45ab-b8b3-a597d240965b",
    supplierUuid: "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
    brandUuid: "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb",
  };

  const handleUpdateProduct = async (uuid: string) => {
  try {
    await updateProduct({
      uuid,
      accessToken,
      updateProduct: product,
    }).unwrap();

    toast.success("Product updated successfully!");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update product.");
  }
};

  const handleDeleteProduct = async (uuid: string) => {
  try {
    await deleteProductByUuid({
      uuid,
      accessToken,
    }).unwrap();

    toast.success("Product deleted successfully!");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to delete product.");
  }
};

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({
          onViewDetail: handleViewDetail,
          onUpdate: handleUpdateProduct,
          onDelete: handleDeleteProduct,
        })}
        data={tableData}
      />

      {/* Modal */}
      {selectedUuid && (
        <ViewProductDetail
          uuid={selectedUuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        />
      )}
    </div>
  );
}
