"use client";

import { categories } from "@/data/groceriesCategory";
import { useState } from "react";
import { SelectField } from "./SelectField";
import { CategoriesProps } from "@/interfaces/interfaces";



const Categories: React.FC<CategoriesProps> = ({
  category,
  subCategory,
  setFormData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(subCategory || "");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    setSelectedSubCategory("");
    setFormData((prev) => ({
      ...prev,
      Category: value,
      SubCategory: "",
    }));
  };

  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSubCategory(value);
    setFormData((prev) => ({
      ...prev,
      SubCategory: value,
    }));
  };

  const selectedCategoryObj = categories.find(
    (cat) => cat.category === selectedCategory
  );
  const subCategories = selectedCategoryObj ? selectedCategoryObj.subCategories : [];

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
  );
};

export default Categories;



