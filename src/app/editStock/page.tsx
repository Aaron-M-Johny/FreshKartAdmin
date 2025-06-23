"use client";

import { categories } from "@/data/groceriesCategory";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  GroceryInterface,
  productStockListInterface,
  productStockObjectInterface,
} from "@/interfaces/interfaces";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { SelectField } from "@/components/SelectField";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditStock = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [productList, setProductList] = useState<GroceryInterface[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [updatedStockObject, setUpdatedStockObject] =
    useState<productStockObjectInterface>({});
  const [initialStockObject, setInitialStockObject] =
    useState<productStockObjectInterface>({});

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubCategory(event.target.value);
  };

  const changeStock = (
    e: React.ChangeEvent<HTMLInputElement>,
    ProductId: number
  ) => {
    setUpdatedStockObject((prev) => ({
      ...prev,
      [ProductId]: Number(e.target.value),
    }));
  };

  const handleIncrement = (ProductId: number) => {
    setUpdatedStockObject((prev) => ({
      ...prev,
      [ProductId]: (prev[ProductId] ?? 0) + 1,
    }));
  };

  const handleDecrement = (ProductId: number) => {
    setUpdatedStockObject((prev) => ({
      ...prev,
      [ProductId]: Math.max(0, (prev[ProductId] ?? 0) - 1),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const updatedStockList: productStockListInterface[] = Object.entries(
      updatedStockObject
    )
      .filter(([ProductId, Stock]) => initialStockObject[+ProductId] !== Stock)
      .map(([ProductId, Stock]) => ({
        ProductId: Number(ProductId),
        Stock,
      }));

    try {
      const res = await axios.post("/api/manageStock", updatedStockList);
      toast.success(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!selectedSubCategory) return;

    const fetchProduct = async () => {
      try {
        const encodedSubCategory = encodeURIComponent(selectedSubCategory);
        const res = await axios.get(
          `/api/groceriesList?subcategory=${encodedSubCategory}`
        );
        const productData: GroceryInterface[] = res.data.data;
        setProductList(productData || []);
        const initialStock: productStockObjectInterface = {};
        setInitialStockObject(initialStock);
        productData.forEach(
          (item) => (initialStock[item.ProductId] = item.Stock)
        );
        setUpdatedStockObject(initialStock);
      } catch (error) {
        const err = error as AxiosError;

        toast.error(err.message);
        setProductList([]);
      }
    };

    fetchProduct();
  }, [selectedSubCategory]);

  const selectedCategoryObj = categories.find(
    (category) => category.category === selectedCategory
  );
  const subCategories = selectedCategoryObj
    ? selectedCategoryObj.subCategories
    : [];

  return (
    <section className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 @container/main">
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm @container/card mx-4 lg:mx-6 px-10">
        <p className="mb-3">Select category to proceed:</p>
        <div className="flex gap-10 mb-5">
          <SelectField
            id="category"
            name="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories.map((item) => ({
              label: item.category,
              value: item.category,
            }))}
            placeholder="Select Category"
          />
          <SelectField
            id="subCategory"
            name="SubCategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            options={
              selectedCategory
                ? subCategories.map((item) => ({
                    label: item,
                    value: item,
                  }))
                : []
            }
            disabled={!selectedCategory}
            placeholder="Select Subcategory"
            title={!selectedCategory ? "Select category first" : ""}
          />
        </div>
        <div className="w-full overflow-x-auto rounded-md border">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Stock Left</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {productList.length > 0 ? (
                productList.map((item) => (
                  <TableRow key={item.ProductId}>
                    <TableCell className="text-center">
                      <Image
                        src={item.Image_Url}
                        alt="Product"
                        width={80}
                        height={80}
                        className="mx-auto rounded bg-white object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      {item.Brand} {item.ProductName}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.Quantity}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {item.DiscountPrice &&
                      item.Price &&
                      item.DiscountPrice < item.Price ? (
                        <>
                          <span className="line-through text-sm text-gray-400 mr-2">
                            ${item.Price}
                          </span>
                          <span>${item.DiscountPrice}</span>
                        </>
                      ) : (
                        `$${item.DiscountPrice || item.Price || 0}`
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => handleDecrement(item.ProductId)}
                        >
                          -
                        </Button>

                        <Input
                          type="number"
                          className="w-14 h-8 text-center"
                          value={
                            updatedStockObject[item.ProductId] ?? item.Stock
                          }
                          onChange={(e) => changeStock(e, item.ProductId)}
                        />

                        <Button
                          variant="secondary"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => handleIncrement(item.ProductId)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-gray-400"
                  >
                    Select category to proceed
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-5 flex justify-end mb-5">
          <Button onClick={handleSubmit} disabled={!productList.length}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditStock;
