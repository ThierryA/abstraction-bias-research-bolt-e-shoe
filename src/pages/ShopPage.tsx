import React, { useState } from 'react';
import { Filter, ArrowUpDown, ChevronDown, Grid, List, X, SlidersHorizontal } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ui/ProductCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import Button from '../components/ui/Button';

const ShopPage: React.FC = () => {
  const { filteredProducts, sort, dispatch } = useShop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  const handleSortChange = (newSort: 'newest' | 'price-low' | 'price-high' | 'top-rated') => {
    dispatch({ type: 'UPDATE_SORT', payload: newSort });
    setIsSortDropdownOpen(false);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'top-rated', label: 'Top Rated' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shop All</h1>
          <p className="text-gray-500">{filteredProducts.length} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Button (Mobile Only) */}
          <div className="lg:hidden w-full">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => setIsSidebarOpen(true)}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters & Sort
            </Button>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & View Controls */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <div className="hidden lg:flex items-center space-x-4">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-1.5 rounded-md ${isGridView ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black'}`}
                  aria-label="Grid View"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-1.5 rounded-md ${!isGridView ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black'}`}
                  aria-label="List View"
                >
                  <List size={20} />
                </button>
              </div>

              <div className="relative ml-auto">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center text-sm text-gray-700 bg-white border border-gray-200 rounded-md px-3 py-2"
                >
                  <ArrowUpDown size={16} className="mr-2" />
                  <span>Sort: {sortOptions.find(option => option.value === sort)?.label}</span>
                  <ChevronDown size={16} className="ml-2" />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sort === option.value ? 'bg-gray-100 text-black' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleSortChange(option.value as any)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
                <Button
                  onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            ) : isGridView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-56 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-semibold">${product.price.toFixed(2)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-amber-400'
                                  : i < product.rating
                                  ? 'text-amber-400/70'
                                  : 'text-gray-300'
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.comments.length})
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {product.condition.replace('-', ' ')}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            {product.authenticity ? 'Authenticity Verified' : 'Authenticity Pending'}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          as="a"
                          href={`/product/${product.id}`}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default ShopPage;