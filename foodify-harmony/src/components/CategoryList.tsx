import React from 'react';
import { Category } from '@/types';

interface CategoryListProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  onSelectCategory, 
  selectedCategory 
}) => {
  // Hardcoded categories
  const categories: Category[] = [
    { id: '0', name: 'All' },
    { id: '1', name: 'Burger' },
    { id: '2', name: 'Pizza' },
    { id: '3', name: 'Biryani' },
    { id: '4', name: 'Chinese' },
    { id: '5', name: 'Dessert' },
    { id: '6', name: 'South Indian' },
    { id: '7', name: 'North Indian' },
    { id: '8', name: 'Thali' },
  ];

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory?.id === category.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
