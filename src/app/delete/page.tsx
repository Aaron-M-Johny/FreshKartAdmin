"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
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

        <div className="w-full overflow-x-auto border rounded-md">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="">
                <TableHead className="text-center">Delete</TableHead>
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
                      <input
                        type="checkbox"
                        className="accent-green-600 w-5 h-5"
                        aria-label="Delete product"
                        checked={updatedDeleteObject[item.ProductId] || false}
                        onChange={(e) => changeDelete(e, item.ProductId)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Image
                        src={item.Image_Url}
                        alt="Product"
                        width={80}
                        height={80}
                        className="mx-auto h-20 w-20 object-cover rounded bg-white"
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
                    <TableCell className="text-center">{item.Stock}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-6 text-center text-gray-400"
                  >
                    Select category to proceed
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

<div className="mt-5 mb-5 flex justify-end">
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="default"
        disabled={!productList.length}
      >
        {isSubmitting ? "Deleting..." : "Delete"}
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete the selected products. This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Confirm"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
      </div>
    </section>
  );
};

export default EditStock;
