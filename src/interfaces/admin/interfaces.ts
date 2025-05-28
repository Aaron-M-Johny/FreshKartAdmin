export interface GroceryInterface {
  id: string;
  Brand: string;
  ProductName: string;
  Quantity: string;
  Category: string;
  SubCategory: string;
  Price: number;
  DiscountPrice: number;
  Image_Url: string;
  Stock: number;
  ProductId:number;
}


export interface productStockListInterface {
  ProductId: number;
  Stock: number;
}

export interface productStockObjectInterface {
  [productId: number]: number;
}

// export interface productDeleteListInterface {
//   ProductId: number;
//   isDelete: boolean;
// }

export interface productDeleteObjectInterface {
  [productId: number]: boolean;
}

interface Option {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  id: string;
  name: string;
  label?:string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  title?: string;
}
