"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { DataTablePagination } from "../ui/data-pagination"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DataTableFacetedFilter } from "../ui/command-range"
import { useCreateProductMutation } from "@/services/ecommerce"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}



export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})



  // rtk query create new product
  const [createNewProduct ,{isLoading , error}] = useCreateProductMutation()

  // mock data to create new product 
  const newProduct =    
  {
    "name": "Dell XPS 1681681681",
    "description": "Premium ultrabook with a stunning InfinityEdge display, ideal for creative professionals and power users on the go.",
    "computerSpec": {
      "processor": "Intel Core i7-13700H",
      "ram": "32GB DDR5",
      "storage": "1TB NVMe SSD",
      "gpu": "NVIDIA GeForce RTX 4050 6GB",
      "os": "Windows 11 Pro",
      "screenSize": "15.6-inch 3.5K OLED Touch",
      "battery": "86Wh, up to 13 hours"
    },
    "stockQuantity": 24,
    "priceIn": 1450,
    "priceOut": 1899,
    "discount": 5,
    "color": [
      {
        "color": "Platinum Silver",
        "images": [
          "https://example.com/images/dell-xps-15/silver-1.jpg",
          "https://example.com/images/dell-xps-15/silver-2.jpg"
        ]
      },
      {
        "color": "Graphite Black",
        "images": [
          "https://example.com/images/dell-xps-15/black-1.jpg",
          "https://example.com/images/dell-xps-15/black-2.jpg"
        ]
      }
    ],
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsTIHM_cCzcLBuz2eM9MdcgeERJXxkYhWsSqlyTXZbzh25SH4BfeH9vKbu&s=10",
    "warranty": "2 years international warranty",
    "availability": true,
    "images": [
      "https://example.com/images/dell-xps-15/main-1.jpg",
      "https://example.com/images/dell-xps-15/main-2.jpg",
      "https://example.com/images/dell-xps-15/main-3.jpg"
    ],
    "categoryUuid": "462d9f60-8346-45ab-b8b3-a597d240965b",
    "supplierUuid": "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
    "brandUuid": "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb"
  }

  // handle create new product
  const hanldeCreateNewProduct = () => {
    createNewProduct(
      {
        newProduct : JSON.stringify(newProduct) , 
        accessToken : process.env.NEXT_PUBLIC_ISHOP_BASE_URL
      }
    )
  }
  


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  // Helper to get ALL unique values (not affected by current filters)
  const getFacetedOptions = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (!column) return [];

    // Get all rows from the original data
    const allRows = table.getPreFilteredRowModel().rows;

    const uniqueValues = new Set<string>();

    allRows.forEach((row) => {
      const value = row.getValue(columnId);
      if (value != null) {
        uniqueValues.add(String(value));
      }
    });

    return Array.from(uniqueValues)
      .sort()
      .map((value) => ({
        label: value,
        value: value,
      }));
  };



  return (
    <>
      <div>
        <div className="flex items-center py-4">
          <div className="flex gap-4">
            <Input
              placeholder="Filter name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            {/* command filter */}

            <DataTableFacetedFilter
              column={table.getColumn("name")}
              title="Name"
              options={getFacetedOptions("name")}
            />
            {/* price */}
            <DataTableFacetedFilter
              column={table.getColumn("priceOut")}
              title="Price"
              options={getFacetedOptions("priceOut")}
            />

          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                View
              </Button>
            </DropdownMenuTrigger>


            {/* button create new product */}
              <button
              onClick={() => hanldeCreateNewProduct()}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create product
              </button>



            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* data table pagination */}
        <div className="mt-5">
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  )
}