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
import { SelectField } from "@/components/SelectField";
import { toast } from "sonner";

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
    <>
      <h3 className="p-10 text-4xl font-bold">Manage Stocks</h3>

      <section className="px-10">
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
                    label: item.subCategory,
                    value: item.subCategory,
                  }))
                : []
            }
            disabled={!selectedCategory}
            placeholder="Select Subcategory"
            title={!selectedCategory ? "Select category first" : ""}
          />
        </div>
        <div className="rounded-md border border-green-200 ">
          <table className="min-w-full text-sm text-left text-green-900">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-2 font-semibold text-center">Image</th>
                <th className="px-4 py-2 font-semibold">Product</th>
                <th className="px-4 py-2 font-semibold text-center">
                  Quantity
                </th>
                <th className="px-4 py-2 font-semibold text-center">Price</th>
                <th className="px-4 py-2 font-semibold text-center">
                  Stock Left
                </th>
              </tr>
            </thead>
            {productList.length > 0 ? (
              <tbody>
                {productList.map((item) => (
                  <tr
                    key={item.ProductId}
                    className="border-t border-green-100"
                  >
                    <td className="px-4 py-2 text-center">
                      <Image
                        src={item.Image_Url}
                        alt="Product"
                        height={80}
                        width={80}
                        className="mx-auto rounded bg-white"
                      />
                    </td>
                    <td className="px-4 py-2 max-w-md">
                      {item.Brand} {item.ProductName}
                    </td>
                    <td className="px-4 py-2 text-center">{item.Quantity}</td>
                    <td className="px-4 py-2 text-center text-base font-bold text-green-600">
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
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded bg-amber-300"
                          onClick={() => handleDecrement(item.ProductId)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 h-8 text-center border border-green-300 rounded"
                          value={updatedStockObject[item.ProductId]}
                          onChange={(e) => changeStock(e, item.ProductId)}
                        />
                        <button
                          className="w-8 h-8 rounded bg-amber-300"
                          onClick={() => handleIncrement(item.ProductId)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    Select category to proceed
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <div className="mt-5 flex justify-end mb-5">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white
         shadow-sm transition-colors duration-200 ease-in-out
         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
         disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={!productList.length}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </section>
    </>
  );
};

export default EditStock;
