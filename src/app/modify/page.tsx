"use client";

import { categories } from "@/data/groceriesCategory";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  GroceryInterface,
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
import { toast } from "sonner";
import { SelectField } from "@/components/SelectField";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}



const Modify = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [productList, setProductList] = useState<GroceryInterface[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageInputs, setImageInputs] = useState<Record<number, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, string>>({});
  const [editingBrandIds, setEditingBrandIds] = useState<
    Record<number, boolean>
  >({});
  const [brandInputs, setBrandInputs] = useState<Record<number, string>>({});
  const [editingProductIds, setEditingProductIds] = useState<
    Record<number, boolean>
  >({});
  const [productInputs, setProductInputs] = useState<Record<number, string>>(
    {}
  );
  const [editingQuantityIds, setEditingQuantityIds] = useState<
    Record<number, boolean>
  >({});
  const [quantityInputs, setQuantityInputs] = useState<Record<number, string>>(
    {}
  );
  const [editingPriceIds, setEditingPriceIds] = useState<
    Record<number, boolean>
  >({});
  const [priceInputs, setPriceInputs] = useState<Record<number, number>>({});
  const [editingDiscountPriceIds, setEditingDiscountPriceIds] = useState<
    Record<number, boolean>
  >({});
  const [discountPriceInputs, setDiscountPriceInputs] = useState<
    Record<number, number>
  >({});

  // const [updatedProducts, setUpdatedProducts] = useState<UpdatedItem[]>([]);
  const [validImageIds, setValidImageIds] = useState<Record<number, boolean>>(
    {}
  );

  // interface UpdatedFields {
  //   ImageURL?: string;
  //   Brand?: string;
  //   ProductName?: string;
  //   Price?: number;
  //   DiscountPrice?: number;
  //   Quantity?: string;
  // }

  // interface UpdatedItem {
  //   ProductId: number;
  //   Updated: UpdatedFields;
  // }

  const IMAGE_EXTENSION_REGEX = /\.(jpg|jpeg|png|webp|gif|bmp)$/i;

  const isValidImageExtension = (url: string): boolean => {
    return IMAGE_EXTENSION_REGEX.test(url);
  };

  const validateImageUrl = async (url: string, productId: number) => {
    if (!isValidImageExtension(url)) {
      setImageErrors((prev) => ({
        ...prev,
        [productId]: "Invalid file extension",
      }));
      setValidImageIds((prev) => ({ ...prev, [productId]: false }));
      return;
    }

    const img = new window.Image();

    img.onload = () => {
      // ✅ Image loaded successfully
      setImageErrors((prev) => ({ ...prev, [productId]: "" }));
      setValidImageIds((prev) => ({ ...prev, [productId]: true }));
    };

    img.onerror = () => {
      setImageErrors((prev) => ({
        ...prev,
        [productId]: "Image could not be loaded",
      }));
      setValidImageIds((prev) => ({ ...prev, [productId]: false }));
    };

    img.src = url;
  };

  // ✅ Debounced validate ref
  const debouncedValidateRef = useRef<
    ((url: string, productId: number) => void) | null
  >(null);

  useEffect(() => {
    debouncedValidateRef.current = debounce((url:string, productId:number) => {
      validateImageUrl(url, productId);
    }, 300);
  }, []);
  // const [updatedStockObject, setUpdatedStockObject] =
  //   useState<productStockObjectInterface>({});
  // const [initialStockObject, setInitialStockObject] =
  //   useState<productStockObjectInterface>({});

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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    toast.error("Updation is disabled by Admin");

    setIsSubmitting(false);
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
        // setInitialStockObject(initialStock);
        productData.forEach(
          (item) => (initialStock[item.ProductId] = item.Stock)
        );
        // setUpdatedStockObject(initialStock);
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
    <div>
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
                  <TableHead className="text-center">Existing Image</TableHead>
                  <TableHead className="text-center">Change Image</TableHead>
                  <TableHead>Brand Name</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">MSP</TableHead>
                  <TableHead className="text-center">Selling price</TableHead>
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
                      <TableCell className="text-center relative group">
                        {validImageIds[item.ProductId] &&
                        imageInputs[item.ProductId] &&
                        isValidImageExtension(imageInputs[item.ProductId]) ? (
                          <div className="relative inline-block">
                            <Image
                              src={imageInputs[item.ProductId]}
                              alt="Product"
                              width={80}
                              height={80}
                              className="mx-auto h-20 w-20 rounded bg-white object-cover"
                            />
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              onClick={() => {
                                setImageInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: "",
                                }));
                                setValidImageIds((prev) => {
                                  const updated = { ...prev };
                                  delete updated[item.ProductId];
                                  return updated;
                                });
                                setImageErrors((prev) => ({
                                  ...prev,
                                  [item.ProductId]: "",
                                }));
                              }}
                            >
                              Click to remove
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Input
                              placeholder="Paste image URL"
                              value={imageInputs[item.ProductId] || ""}
                              onChange={(e) => {
                                const url = e.target.value;

                                setImageInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: url,
                                }));

                                if (url.trim() === "") {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [item.ProductId]: "",
                                  }));
                                  setValidImageIds((prev) => {
                                    const updated = { ...prev };
                                    delete updated[item.ProductId];
                                    return updated;
                                  });
                                  return;
                                }

                                const hasDot = url.includes(".");
                                const extMatch = url.match(
                                  /\.(jpg|jpeg|png|webp|gif|bmp)$/i
                                );

                                if (!hasDot) {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [item.ProductId]: "",
                                  }));
                                  return;
                                }

                                if (extMatch) {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [item.ProductId]: "",
                                  }));
                                  debouncedValidateRef.current?.(
                                    url,
                                    item.ProductId
                                  );
                                } else {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [item.ProductId]: "Invalid file extension",
                                  }));
                                  setValidImageIds((prev) => ({
                                    ...prev,
                                    [item.ProductId]: false,
                                  }));
                                }
                              }}
                              onBlur={() => {
                                const url = imageInputs[item.ProductId];
                                if (!url || url.trim() === "") return;

                                const extMatch = url.match(
                                  /\.(jpg|jpeg|png|webp|gif|bmp)$/i
                                );

                                if (!extMatch) {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [item.ProductId]: "Invalid file extension",
                                  }));
                                  setValidImageIds((prev) => ({
                                    ...prev,
                                    [item.ProductId]: false,
                                  }));
                                } else {
                                  // If blurred with valid ext but not validated yet
                                  debouncedValidateRef.current?.(
                                    url,
                                    item.ProductId
                                  );
                                }
                              }}
                              className={cn(
                                "mt-2",
                                imageErrors[item.ProductId] &&
                                  "border-red-500 focus-visible:ring-red-500"
                              )}
                            />
                            {imageErrors[item.ProductId] && (
                              <p className="text-sm text-red-500">
                                {imageErrors[item.ProductId]}
                              </p>
                            )}
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        {editingBrandIds[item.ProductId] ? (
                          <Input
                            value={brandInputs[item.ProductId] || item.Brand}
                            onChange={(e) =>
                              setBrandInputs((prev) => ({
                                ...prev,
                                [item.ProductId]: e.target.value,
                              }))
                            }
                            onBlur={() => {
                              setEditingBrandIds((prev) => ({
                                ...prev,
                                [item.ProductId]: false,
                              }));
                              // Optional: validate or handle blur logic
                            }}
                            autoFocus
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <p>{brandInputs[item.ProductId] || item.Brand}</p>
                            <Pencil
                              className="h-4 w-4 ml-3 cursor-pointer text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setEditingBrandIds((prev) => ({
                                  ...prev,
                                  [item.ProductId]: true,
                                }));
                                setBrandInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: item.Brand,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingProductIds[item.ProductId] ? (
                          <Input
                            value={
                              productInputs[item.ProductId] || item.ProductId
                            }
                            onChange={(e) =>
                              setProductInputs((prev) => ({
                                ...prev,
                                [item.ProductId]: e.target.value,
                              }))
                            }
                            onBlur={() => {
                              setEditingProductIds((prev) => ({
                                ...prev,
                                [item.ProductId]: false,
                              }));
                              // Optional: validate or handle blur logic
                            }}
                            autoFocus
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <p>
                              {productInputs[item.ProductId] ||
                                item.ProductName}
                            </p>
                            <Pencil
                              className="h-4 w-4 ml-3 cursor-pointer text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setEditingProductIds((prev) => ({
                                  ...prev,
                                  [item.ProductId]: true,
                                }));
                                setProductInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: item.ProductName,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {editingQuantityIds[item.ProductId] ? (
                          <Input
                            value={
                              quantityInputs[item.ProductId] || item.Quantity
                            }
                            onChange={(e) =>
                              setQuantityInputs((prev) => ({
                                ...prev,
                                [item.ProductId]: e.target.value,
                              }))
                            }
                            onBlur={() => {
                              setEditingQuantityIds((prev) => ({
                                ...prev,
                                [item.ProductId]: false,
                              }));
                              // Optional: validate or handle blur logic
                            }}
                            autoFocus
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <p>
                              {quantityInputs[item.ProductId] || item.Quantity}
                            </p>
                            <Pencil
                              className="h-4 w-4 ml-3 cursor-pointer text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setEditingQuantityIds((prev) => ({
                                  ...prev,
                                  [item.ProductId]: true,
                                }));
                                setQuantityInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: item.Quantity,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {editingPriceIds[item.ProductId] ? (
                          <Input
                            value={priceInputs[item.ProductId] || item.Price}
                            onChange={(e) =>
                              setPriceInputs((prev) => ({
                                ...prev,
                                [item.ProductId]: Number(e.target.value),
                              }))
                            }
                            onBlur={() => {
                              setEditingPriceIds((prev) => ({
                                ...prev,
                                [item.ProductId]: false,
                              }));
                              // Optional: validate or handle blur logic
                            }}
                            autoFocus
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <p>{priceInputs[item.ProductId] || item.Price}</p>
                            <Pencil
                              className="h-4 w-4 ml-3 cursor-pointer text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setEditingPriceIds((prev) => ({
                                  ...prev,
                                  [item.ProductId]: true,
                                }));
                                setPriceInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: item.Price,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {editingDiscountPriceIds[item.ProductId] ? (
                          <Input
                            value={
                              discountPriceInputs[item.ProductId] ||
                              item.DiscountPrice
                            }
                            onChange={(e) =>
                              setDiscountPriceInputs((prev) => ({
                                ...prev,
                                [item.ProductId]: Number(e.target.value),
                              }))
                            }
                            onBlur={() => {
                              setEditingDiscountPriceIds((prev) => ({
                                ...prev,
                                [item.ProductId]: false,
                              }));
                              // Optional: validate or handle blur logic
                            }}
                            autoFocus
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <p>
                              {discountPriceInputs[item.ProductId] ||
                                item.DiscountPrice}
                            </p>
                            <Pencil
                              className="h-4 w-4 ml-3 cursor-pointer text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setEditingDiscountPriceIds((prev) => ({
                                  ...prev,
                                  [item.ProductId]: true,
                                }));
                                setDiscountPriceInputs((prev) => ({
                                  ...prev,
                                  [item.ProductId]: item.DiscountPrice,
                                }));
                              }}
                            />
                          </div>
                        )}
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
    </div>
  );
};

export default Modify;
