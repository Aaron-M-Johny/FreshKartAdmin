export interface Category {
  category: string;
  subCategories: string[];
}

export const categories: Category[] = [
  {
    category: "Fruits & Vegetables",
    subCategories: [
      "Fruits",
      "Leafy Greens & Herbs",
      "Root Vegetables & Tubers",
      "Gourds, Beans & Okra",
      "Cucumbers, Peppers & Other Veggies",
      "Exotic & Organic Produce",
      "Cut & Ready-to-Eat",
    ],
  },
  {
    category: "Gourmet & World Food",
    subCategories: [
      "Beverages & Mixes",
      "Chocolates & Sweets",
      "Snacks & Dry Fruits",
      "Spreads & Sweeteners",
    ],
  },
  {
    category: "Beauty & Hygiene",
    subCategories: [
      "Bath & Body",
      "Hair Care",
      "Skin & Face Care",
      "Fragrances",
      "Oral Care",
      "Makeup",
      "Men's Care",
      "Women's Hygiene",
      "Wellness",
      "Safety & Sanitization",
      "Accessories",
      "Ayurveda & Therapy",
    ],
  },
  {
    category: "Beverages",
    subCategories: [
      "Kids Drinks",
      "Juices & Cold Pressed",
      "Soft Drinks",
      "Syrups & Concentrates",
      "Tea",
      "Coffee",
    ],
  },
  {
    category: "Foodgrains, Oil & Masala",
    subCategories: [
      "Dry Fruits & Nuts",
      "Rice & Grains",
      "Flours & Millets",
      "Dals & Pulses",
      "Edible Oils & Ghee",
      "Masalas & Spices",
      "Sweeteners",
      "Cooking Essentials",
    ],
  },
  {
    category: "Bakery, Cakes & Dairy",
    subCategories: [
      "Breads & Rolls",
      "Bakery Cakes & Muffins",
      "Biscuits & Cookies",
      "Butter, Margarine & Spreads",
      "Cheese & Dairy Alternatives",
      "Milk & Flavored Milk",
      "Ice Cream & Frozen Desserts",
      "Breadcrumbs & Croutons",
    ],
  },
  {
    category: "Eggs, Meat & Fish",
    subCategories: [
      "Chicken Sausages",
      "Farm Eggs",
      "Fresh Chicken",
      "Fresh Mutton",
      "Fresh Water Fish",
      "Frozen Fish & Seafood",
      "Marinated Meat",
      "Marine Water Fish",
      "Other Seafood",
      "Prawns & Shrimps",
      "Protein Eggs",
    ],
  },
  {
    category: "Cleaning & Household",
    subCategories: [
      "Home Fragrance & Puja Needs",
      "Air Fresheners & Insect Repellents",
      "Cleaning Tools",
      "Cleaners & Disinfectants",
      "Dishwashing & Utensil Care",
      "Laundry Essentials",
      "Paper & Tissue Products",
      "Disposable & Storage Items",
      "Home Utility & Accessories",
      "Stationery & Study Supplies",
      "Craft, Decor & Celebration",
      "Shoecare & Misc",
    ],
  },
];
