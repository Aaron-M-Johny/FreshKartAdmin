"use client";

import { categories } from "@/data/groceriesCategory";
import { useState } from "react";
import { SelectField } from "./SelectField";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

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

  const selectedCategoryObj = categories.find(
    (category) => category.category === selectedCategory
  );
  const subCategories = selectedCategoryObj
    ? selectedCategoryObj.subCategories
    : [];

  console.log("subCategories:", subCategories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        id="category"
        label="Category"
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
        label="Subcategory"
        name="SubCategory"
        value={selectedSubCategory}
        onChange={handleSubCategoryChange}
        options={
          selectedCategory
            ? subCategories.map((subCat) => ({
                label: subCat,
                value: subCat,
              }))
            : []
        }
        disabled={!selectedCategory}
        placeholder="Select Subcategory"
        title={!selectedCategory ? "Select category first" : ""}
      />
    </div>
  );
};

export default Categories;
