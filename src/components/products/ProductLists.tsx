'use client'
import { useGetAllProductQuery } from "@/services/ecommerce"

export default function ProductList() {
  const {data:products, error, isLoading} = useGetAllProductQuery();
  console.log(`check error status: ${error}`);
  console.log(`Loading: ${isLoading}`);
  console.log(`All Products:`, products);
  return (
    <div>
      {
        products?.content.map((pro, index) => (
           <h1 key={index}>{pro?.name}</h1>
        ))
      }
    </div>
  )
}
