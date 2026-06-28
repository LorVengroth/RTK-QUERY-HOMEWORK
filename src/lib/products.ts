

export type ProductType={
  uuid: string,
  thumbnail:string,
  name:string,
  priceOut:number,
  description: string
}

export interface ProductResponse {
  content: ProductType[]
}

export type UpdateProductType = {
  name: string;
  description: string;

  stockQuantity: number;
  priceIn: number;
  priceOut: number;
  discount: number;

  color: {
    color: string;
    images: string[];
  }[];

  thumbnail: string;
  warranty: string;
  availability: boolean;

  images: string[];

  categoryUuid: string;
  supplierUuid: string;
  brandUuid: string;
};

export type CreateProductType = {
  name: string,
  description: string,
  computerSpec: {
    processor: string,
    ram: string,
    storage: string,
    gpu: string,
    os: string,
    screenSize: string,
    battery: string
  },
  stockQuantity: 0,
  priceIn: 1,
  priceOut: 1,
  discount: 0,
  color: [
    {
      color: string,
      images: [
        string
      ]
    }
  ],
  thumbnail: string | File;
  warranty: string,
  availability: true,
  images: [
    string
  ],
  categoryUuid: string,
  supplierUuid: string,
  brandUuid: string
}

export type UploadFilesType = File[];