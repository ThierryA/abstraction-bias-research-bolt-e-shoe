import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { brands, sizes, maxPrice } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import Button from './Button';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { filters, dispatch } = useShop();
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    dispatch({ type: 'UPDATE_BRAND_FILTER', payload: newBrands });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    dispatch({ type: 'UPDATE_SIZE_FILTER', payload: newSizes });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([filters.priceRange[0], value]);
  };

  const handleApplyPriceRange = () => {
    dispatch({ type: 'UPDATE_PRICE_RANGE', payload: priceRange });
  };

  const handleConditionChange = (condition: any) => {
    dispatch({ type: 'UPDATE_CONDITION', payload: condition });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
    setPriceRange([0, maxPrice]);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-80 max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:static md:shadow-none md:z-0 md:w-72`}
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="text-lg font-medium">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-60px)] md:h-auto md:max-h-[calc(100vh-120px)]">
          <div className="hidden md:flex md:items-center md:justify-between mb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-black"
            >
              Clear all
            </button>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Brands</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 text-black rounded border-gray-300 focus:ring-black"
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Sizes</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`text-sm py-1.5 rounded-md border border-gray-300 ${
                    filters.sizes.includes(size)
                      ? 'bg-black text-white border-black'
                      : 'text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">${priceRange[0]}</span>
                <span className="text-sm text-gray-700">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={handleApplyPriceRange}
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Condition */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Condition</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="condition-all"
                  name="condition"
                  checked={filters.condition === 'all'}
                  onChange={() => handleConditionChange('all')}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <label htmlFor="condition-all" className="ml-2 text-sm text-gray-700">
                  All
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="condition-new"
                  name="condition"
                  checked={filters.condition === 'new'}
                  onChange={() => handleConditionChange('new')}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <label htmlFor="condition-new" className="ml-2 text-sm text-gray-700">
                  New
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="condition-like-new"
                  name="condition"
                  checked={filters.condition === 'like new'}
                  onChange={() => handleConditionChange('like new')}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <label htmlFor="condition-like-new" className="ml-2 text-sm text-gray-700">
                  Like New
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="condition-gently-used"
                  name="condition"
                  checked={filters.condition === 'gently used'}
                  onChange={() => handleConditionChange('gently used')}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <label htmlFor="condition-gently-used" className="ml-2 text-sm text-gray-700">
                  Gently Used
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="condition-well-worn"
                  name="condition"
                  checked={filters.condition === 'well worn'}
                  onChange={() => handleConditionChange('well worn')}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <label htmlFor="condition-well-worn" className="ml-2 text-sm text-gray-700">
                  Well Worn
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Only: Apply & Clear Buttons */}
          <div className="flex space-x-3 md:hidden">
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={onClose}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;