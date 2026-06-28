import {
  CreateProductType,
  ProductResponse,
  ProductType,
  UpdateProductType,
} from "@/lib/products";
import { ContentResponse , SelectOption} from "@/lib/type/TypeFilter"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}`,
  }),
  tagTypes: ["Products", "Files"],
  endpoints: (builder) => ({
    // getAllProducts
    getAllProduct: builder.query<
      ProductResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/products?page=${page}&size=${size}`,
      providesTags: ["Products"],
    }),
    //  getProductByUUid
    getProductByUuid: builder.query<ProductType, string>({
      query: (uuid: string) => ({
        url: `/products/${uuid}`,
        providesTags: ["Products"],
      }),
    }),
    // create Product
    createProduct: builder.mutation<CreateProductType, unknown>({
      query: (newProduct: CreateProductType) => ({
        url: `/products`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<UpdateProductType, unknown>({
      query: ({ updateProduct, uuid, accessToken }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: updateProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProductByUuid: builder.mutation<string, unknown>({
      query: ({ uuid, accessToken }) => ({
        url: `/products/${uuid}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),

    getCategory: builder.query<ContentResponse<SelectOption>, void>({
      query: () => ({
        url: `/categories`
      }),
    }),
    getSupplier: builder.query<ContentResponse<SelectOption>, void>({
      query: () => ({
        url: `/suppliers`
      }),
    }),
    getBrand: builder.query<ContentResponse<SelectOption>, void>({
      query: () => ({
        url: `/brands`
      }),
    }),



  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByUuidQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductByUuidMutation,
  // useUploadFileMutation,
  useGetCategoryQuery,
  useGetSupplierQuery,
  useGetBrandQuery
} = ecommerceApi;
