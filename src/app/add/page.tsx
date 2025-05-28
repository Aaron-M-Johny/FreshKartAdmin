"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Categories from "@/components/Categories";
import NextImage from "next/image";
import { InputField } from "@/components/InputField";

type FormState = {
  success: boolean;
  message: string;
};


const AddProductForm = () => {
  const [preview, setPreview] = useState<boolean>(false);
  const [price, setPrice] = useState<number>();
  const [discountPrice, setDiscountPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [brand, setBrand] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const handlePreview = () => {
    const form = document.getElementById("product-form") as HTMLFormElement;
    const formData = new FormData(form);
    const Price = Number(formData.get("Price"));
    const DiscountPrice = Number(formData.get("DiscountPrice"));
    const Stock = Number(formData.get("Stock"));
    const Brand = formData.get("Brand") as string;
    const ProductName = formData.get("ProductName") as string;
    const Quantity = formData.get("Quantity") as string;
    const Image_Url = formData.get("Image_Url") as string;

    setPrice(Price);
    setDiscountPrice(DiscountPrice);
    setStock(Stock);
    setBrand(Brand);
    setProductName(ProductName);
    setQuantity(Quantity);
    setImageUrl(Image_Url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmiting(true);
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const Quantity = formData.get("Quantity") as string;
    const Price = Number(formData.get("Price"));
    const DiscountPrice = Number(formData.get("DiscountPrice"));
    const Stock = Number(formData.get("Stock"));
    const Image_Url = formData.get("Image_Url") as string;

    if (!Image_Url || !Image_Url.startsWith("http")) {
      toast.error(
        "Please provide a valid image URL starting with http or https."
      );
      setIsSubmiting(false);
      return;
    }

    if (!/[a-zA-Z]/.test(Quantity)) {
      toast.error("Quantity must include unit, e.g., kg, pcs.");
      setIsSubmiting(false);
      return;
    }

    if (DiscountPrice > Price) {
      toast.error("Selling price can't be more than listed price");
      setIsSubmiting(false);
      return;
    }

    if (Price < 0 || DiscountPrice < 0 || Stock < 0) {
      toast.error("Prices and stock must be non-negative.");
      setIsSubmiting(false);
      return;
    }

    // ✅ Validate image URL by attempting to load it
    const isImageValid = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = Image_Url;
    });

    if (!isImageValid) {
      toast.error("Image URL is invalid or not accessible.");
      setIsSubmiting(false);
      return;
    }

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Product added successfully!");
        form.reset();
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://www.bigbasket.com/media/uploads/p/l/10000414_15-bb-royal-idli-rice.jpg"
      );
      toast.success("Copied!");
    } catch (err) {
      toast.error("Failed to copy");
      console.error("Copy failed:", err);
    }
  };

  return (
    <>
      <section className="mx-auto xl:w-[80%] md:w-[95%] px-4 py-12 text-black">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Add Product Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full lg:w-1/2 p-6">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-3">
              Add Product
            </h3>
            <form
              id="product-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Brand */}
                <InputField
                  id="brand"
                  label="Brand Name"
                  name="Brand"
                  placeholder="Enter Brand"
                />
                {/* Product Name */}
                <InputField
                  id="name"
                  label="Product Name"
                  name="ProductName"
                  placeholder="Enter Product Name"
                />
                {/* Quantity */}
                <InputField
                  id="quantity"
                  label="Quantity"
                  name="Quantity"
                  placeholder="e.g., 2 kg"
                />
                {/* Stock */}
                <InputField
                  id="stock"
                  label="Stock"
                  name="Stock"
                  placeholder="0-999"
                  type="number"
                />
              </div>

              <Categories />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* List Price */}
                <InputField
                  id="listPrice"
                  label="List Price (MSRP)"
                  name="Price"
                  placeholder="e.g., 1999"
                  type="number"
                />
                {/* Selling Price */}
                <InputField
                  id="sellingPrice"
                  label="Selling Price"
                  name="DiscountPrice"
                  placeholder="e.g., 1499"
                  type="number"
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col">
                <label htmlFor="imgUrl" className="text-sm font-medium mb-1">
                  Product Image URL
                </label>
                <input
                  required
                  type="url"
                  id="imgUrl"
                  name="Image_Url"
                  placeholder="https://example.com/image.jpg"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-blue-600 hover:text-blue-800 transition text-sm underline mt-2 flex items-center gap-1 w-fit cursor-alias"
                >
                  sampleImageLink.jpg
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V6h2v14h11v2zm4-6V4z" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-black px-5 py-2 rounded-md font-medium"
                  onClick={() => {
                    handlePreview();
                    setPreview(true);
                  }}
                >
                  Preview
                </button>
              </div>
            </form>
          </div>

          {/* Product Preview */}
          <div className="bg-white relative rounded-2xl border border-gray-200 shadow-sm w-full lg:w-1/2 p-6">
            <h3 className="text-2xl font-semibold mb-6 border-b  pb-3">
              Preview
            </h3>

            {preview ? (
              <>
                <div className="flex flex-col h-[85%] justify-center items-center">
                  <div className="bg-gray-100 rounded-xl p-4 w-48 shadow-sm">
                    <div className="relative h-32 w-full mb-3">
                      {typeof stock === "number" && stock < 10 && (
                        <span className="absolute z-10 -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                          Few left!
                        </span>
                      )}
                      {imageUrl ? (
                        <NextImage
                          src={imageUrl}
                          alt="Invalid URL"
                          fill
                          className="object-contain text-sm rounded"
                        />
                      ) : (
                        <div className="h-full border border-dashed rounded flex items-center justify-center text-gray-400 text-xs">
                          No Valid URL
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {brand || "Brand"}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {productName || "Product Name"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {quantity || "Quantity"}
                      </p>
                      <p className="text-base font-bold text-green-600">
                        {discountPrice && price && discountPrice < price ? (
                          <>
                            <span className="line-through text-sm text-gray-400 mr-2">
                              ${price}
                            </span>
                            <span>${discountPrice}</span>
                          </>
                        ) : (
                          `$${discountPrice || price || 0}`
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-6 bottom-6">
                  <button
                    type="submit"
                    form="product-form"
                    className={` text-white px-6 py-2 rounded-md transition ${
                      isSubmiting
                        ? "bg-gray-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isSubmiting}
                  >
                    {isSubmiting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-sm text-center mt-10">
                No preview available
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProductForm;
