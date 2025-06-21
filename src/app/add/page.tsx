"use client";

import { useState } from "react";
import Categories from "@/components/Categories";
import { InputField } from "@/components/InputField";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductFormData } from "@/interfaces/interfaces";

type FormState = {
  success: boolean;
  message: string;
};

const AddProductForm = () => {
  const [preview, setPreview] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    ProductName: "",
    Brand: "",
    Price: "",
    DiscountPrice: "",
    Stock: "",
    Quantity: "",
    Image_Url: "",
    Category: "",
    SubCategory: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);

    const {
      ProductName,
      Brand,
      Price,
      DiscountPrice,
      Stock,
      Quantity,
      Image_Url,
      Category,
      SubCategory,
    } = formData;

    if (!Image_Url || !Image_Url.startsWith("http")) {
      toast.error(
        "Please provide a valid image URL starting with http or https."
      );
      setIsSubmiting(false);
      return;
    }

    if (SubCategory.length < 2) {
      toast.error("SubCategory not selected");
      setIsSubmiting(false);
      return;
    }

    if (+DiscountPrice > +Price) {
      toast.error("Selling price can't be more than listed price");
      setIsSubmiting(false);
      return;
    }

    if (+Price < 0 || +DiscountPrice < 0 || +Stock < 0) {
      toast.error("Prices and stock must be non-negative.");
      setIsSubmiting(false);
      return;
    }

    const isImageValid =
      typeof window !== "undefined"
        ? await new Promise<boolean>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = Image_Url;
          })
        : false;

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
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Product added successfully!");
        setFormData({
          ProductName: "",
          Brand: "",
          Price: "",
          DiscountPrice: "",
          Stock: "",
          Quantity: "",
          Image_Url: "",
          Category: "",
          SubCategory: "",
        });
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

  const isImageValid =
    formData.Image_Url &&
    /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(formData.Image_Url);

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
      <section className="mx-auto xl:w-[80%] md:w-[95%] px-4 py-12">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Add Product Form */}
          <div className="rounded-2xl border shadow-sm w-full p-6">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-3">
              New Product Form
            </h3>
            <form
              id="product-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  id="brand"
                  label="Brand Name"
                  name="Brand"
                  placeholder="Enter Brand"
                  value={formData.Brand}
                  onChange={(e) =>
                    setFormData({ ...formData, Brand: e.target.value })
                  }
                />

                <InputField
                  id="name"
                  label="Product Name"
                  name="ProductName"
                  placeholder="Enter Product Name"
                  value={formData.ProductName}
                  onChange={(e) =>
                    setFormData({ ...formData, ProductName: e.target.value })
                  }
                />

                <InputField
                  id="quantity"
                  label="Quantity"
                  name="Quantity"
                  placeholder="e.g., 2 kg"
                  value={formData.Quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, Quantity: e.target.value })
                  }
                />

                <InputField
                  id="stock"
                  label="Stock"
                  name="Stock"
                  placeholder="0-999"
                  type="number"
                  value={formData.Stock}
                  onChange={(e) =>
                    setFormData({ ...formData, Stock: e.target.value })
                  }
                />
              </div>

              <Categories
                category={formData.Category}
                subCategory={formData.SubCategory}
                setFormData={setFormData}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* List Price */}
                <InputField
                  id="listPrice"
                  label="List Price (MSRP)"
                  name="Price"
                  placeholder="e.g., 1999"
                  type="number"
                  value={formData.Price}
                  onChange={(e) =>
                    setFormData({ ...formData, Price: e.target.value })
                  }
                />
                {/* Selling Price */}
                <InputField
                  id="sellingPrice"
                  label="Selling Price"
                  name="DiscountPrice"
                  placeholder="e.g., 1499"
                  type="number"
                  value={formData.DiscountPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, DiscountPrice: e.target.value })
                  }
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col">
                <InputField
                  label="Image URL"
                  required
                  type="url"
                  id="imgUrl"
                  name="Image_Url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.Image_Url}
                  onChange={(e) =>
                    setFormData({ ...formData, Image_Url: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-zinc-400 hover:text-zinc-600 transition text-sm underline mt-2 flex items-center gap-1 w-fit cursor-alias"
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
              <div className="flex">
                <Button
                  type="submit"
                  form="product-form"
                  disabled={isSubmiting}
                  className={
                    isSubmiting
                      ? "opacity-60 pointer-events-none ml-auto"
                      : "ml-auto"
                  }
                >
                  {isSubmiting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>

          {/* Product Preview */}
          <div className=" relative rounded-2xl border shadow-sm w-full lg:w-1/2 p-6">
            <h3 className="text-2xl font-semibold mb-6 border-b  pb-3">
              Live Preview
            </h3>

            <div className="flex flex-row gap-5 h-[85%] rounded-xl bg-white py-5 overflow-hidden justify-center items-center">

              <div className="w-40">
                <div className="relative bg-white rounded-xl shadow-sm overflow-hidden animate-pulse group">
                  {/* Image with 1:1 Aspect Ratio */}
                  <div className="relative p-2 w-full aspect-square bg-[#E8F4FB] flex items-center justify-center">
                    <div className="relative w-[125px] h-[125px] sm:w-[140px] sm:h-[140px] bg-gray-200 rounded-xl" />
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-blue-100 text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-sm text-transparent">
                    50% OFF
                  </div>

                  {/* Product Details */}
                  <div className="px-3 py-2 text-xs sm:text-sm">
                    <div className="h-3 sm:h-4 w-16 bg-gray-200 rounded mb-1" />
                    <div className="h-4 sm:h-5 w-3/4 bg-gray-300 rounded mb-1" />
                    <div className="h-3 sm:h-4 w-1/2 bg-gray-200 rounded mb-2" />

                    <div className="flex items-center gap-1 mb-2">
                      <div className="h-4 sm:h-5 w-10 sm:w-12 bg-[#2582AA] rounded" />
                      <div className="h-3 sm:h-4 w-6 sm:w-8 bg-gray-300 rounded" />
                    </div>

                    <div className="w-full h-6 sm:h-7 bg-[#2582AA] rounded-lg text-transparent" />
                  </div>
                </div>
              </div>

              <div className="w-40">
                <div
                  className="relative rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  style={{ backgroundColor: "#FEFEFE" }}
                >
                  <div
                    className="relative p-2 w-full aspect-square flex items-center justify-center"
                    style={{ backgroundColor: "#E8F4FB" }}
                  >
                    <div className="relative w-[125px] h-[125px] bg-white rounded-xl overflow-hidden">
                      {isImageValid && (
                        <Image
                          src={formData.Image_Url}
                          alt="Product Image"
                          fill
                          sizes="125px"
                          priority
                        />
                      )}
                    </div>
                  </div>

                  {+formData.Price > +formData.DiscountPrice && (
                    <div className="absolute top-2 left-2 z-10 bg-blue-100 text-[#2582AA] text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
                      {Math.round(
                        ((+formData.Price - +formData.DiscountPrice) /
                          +formData.Price) *
                          100
                      )}
                      % OFF
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="px-3 py-2 text-xs sm:text-sm">
                    <p
                      className="uppercase mb-1 tracking-wide text-[10px] sm:text-xs"
                      style={{ color: "#99a1af" }}
                    >
                      {formData.Brand || "Brand Name"}
                    </p>

                    <p
                      className="font-semibold leading-snug line-clamp-2 truncate sm:text-base"
                      style={{ color: "#313233" }}
                    >
                      {formData.ProductName || "Sample Product Name"}
                    </p>

                    <p className="mb-1 sm:text-sm" style={{ color: "#99a1af" }}>
                      {formData.Quantity || "Quantity"}
                    </p>

                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm sm:text-base font-bold text-[#2582AA]">
                        ${formData.DiscountPrice || "199"}
                      </p>
                      {+formData.Price > +formData.DiscountPrice && (
                        <p className="line-through text-gray-400 text-[11px] sm:text-sm">
                          ${formData.Price}
                        </p>
                      )}
                    </div>

                    <button
                      className="w-full bg-[#2582AA] text-white text-[10px] sm:text-sm font-medium py-1 rounded-lg transition"
                      onClick={() => toast.info("Cart logic not implemented")}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-40">
                <div className="relative bg-white rounded-xl shadow-sm overflow-hidden animate-pulse group">
                  {/* Image with 1:1 Aspect Ratio */}
                  <div className="relative p-2 w-full aspect-square bg-[#E8F4FB] flex items-center justify-center">
                    <div className="relative w-[125px] h-[125px] sm:w-[140px] sm:h-[140px] bg-gray-200 rounded-xl" />
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-blue-100 text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-sm text-transparent">
                    50% OFF
                  </div>

                  {/* Product Details */}
                  <div className="px-3 py-2 text-xs sm:text-sm">
                    <div className="h-3 sm:h-4 w-16 bg-gray-200 rounded mb-1" />
                    <div className="h-4 sm:h-5 w-3/4 bg-gray-300 rounded mb-1" />
                    <div className="h-3 sm:h-4 w-1/2 bg-gray-200 rounded mb-2" />

                    <div className="flex items-center gap-1 mb-2">
                      <div className="h-4 sm:h-5 w-10 sm:w-12 bg-[#2582AA] rounded" />
                      <div className="h-3 sm:h-4 w-6 sm:w-8 bg-gray-300 rounded" />
                    </div>

                    <div className="w-full h-6 sm:h-7 bg-[#2582AA] rounded-lg text-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProductForm;
