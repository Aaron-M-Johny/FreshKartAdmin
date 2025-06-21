"use client";

import { categories } from "@/data/groceriesCategory";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  GroceryInterface,
  productDeleteObjectInterface,
} from "@/interfaces/interfaces";
import { SelectField } from "@/components/SelectField";
import { toast } from "sonner";

const EditStock = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [productList, setProductList] = useState<GroceryInterface[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);

  const [updatedDeleteObject, setUpdatedDeleteObject] =
    useState<productDeleteObjectInterface>({});

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

  const changeDelete = (
    e: React.ChangeEvent<HTMLInputElement>,
    ProductId: number
  ) => {
    setUpdatedDeleteObject((prev) => ({
      ...prev,
      [ProductId]: Boolean(e.target.checked),
    }));
  };

const handleDelete = async () => {
  setIsSubmitting(true);

  const productIdsToDelete: number[] = Object.entries(updatedDeleteObject)
    .filter(([, isDelete]) => isDelete === true)
    .map(([productId]) => Number(productId));

  try {
    const res = await axios.post("/api/delete", productIdsToDelete);
    toast.success(res.data.message);
    setRerender(!rerender);
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
        const initialStock: productDeleteObjectInterface = {};
        productData.forEach((item) => (initialStock[item.ProductId] = false));
        setUpdatedDeleteObject(initialStock);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
        setProductList([]);
      }
    };

    fetchProduct();
  }, [selectedSubCategory, rerender]);

  const selectedCategoryObj = categories.find(
    (category) => category.category === selectedCategory
  );
  const subCategories = selectedCategoryObj
    ? selectedCategoryObj.subCategories
    : [];

  return (
    <>
      <h3 className="p-10 text-4xl font-bold">Delete Product Listing</h3>
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

        <div className="border-green-200 border rounded-md">
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
                <th className="px-4 py-2 font-semibold text-center">Delete</th>
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
                        className="mx-auto h-20 w-20 object-cover rounded bg-white"
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
                    <td className="px-4 py-2 text-center">{item.Stock}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        className="accent-green-600 w-5 h-5"
                        aria-label="Delete product"
                        checked={updatedDeleteObject[item.ProductId] || false}
                        onChange={(e) => changeDelete(e, item.ProductId)}
                      />
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
            onClick={handleDelete}  
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white
         shadow-sm transition-colors duration-200 ease-in-out
         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
         disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={!productList.length}
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </section>
    </>
  );
};

export default EditStock;
