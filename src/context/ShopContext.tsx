import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, SortOption, ConditionOption } from '../types';
import { products } from '../data/products';

interface ShopState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  filters: {
    search: string;
    brands: string[];
    sizes: string[];
    priceRange: [number, number];
    condition: ConditionOption;
  };
  sort: SortOption;
}

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: { productId: string } }
  | { type: 'UPDATE_SEARCH'; payload: string }
  | { type: 'UPDATE_BRAND_FILTER'; payload: string[] }
  | { type: 'UPDATE_SIZE_FILTER'; payload: string[] }
  | { type: 'UPDATE_PRICE_RANGE'; payload: [number, number] }
  | { type: 'UPDATE_CONDITION'; payload: ConditionOption }
  | { type: 'UPDATE_SORT'; payload: SortOption }
  | { type: 'CLEAR_FILTERS' };

const initialState: ShopState = {
  products,
  cart: [],
  wishlist: [],
  filters: {
    search: '',
    brands: [],
    sizes: [],
    priceRange: [0, 5000],
    condition: 'all',
  },
  sort: 'newest',
};

function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}`,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        size,
        color,
        quantity,
      };

      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'TOGGLE_WISHLIST': {
      const { productId } = action.payload;
      const isInWishlist = state.wishlist.includes(productId);

      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    }

    case 'UPDATE_SEARCH':
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
      };

    case 'UPDATE_BRAND_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          brands: action.payload,
        },
      };

    case 'UPDATE_SIZE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          sizes: action.payload,
        },
      };

    case 'UPDATE_PRICE_RANGE':
      return {
        ...state,
        filters: {
          ...state.filters,
          priceRange: action.payload,
        },
      };

    case 'UPDATE_CONDITION':
      return {
        ...state,
        filters: {
          ...state.filters,
          condition: action.payload,
        },
      };

    case 'UPDATE_SORT':
      return {
        ...state,
        sort: action.payload,
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          search: '',
          brands: [],
          sizes: [],
          priceRange: [0, 5000],
          condition: 'all',
        },
        sort: 'newest',
      };

    default:
      return state;
  }
}

interface ShopContextValue extends ShopState {
  dispatch: React.Dispatch<ShopAction>;
  filteredProducts: Product[];
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Apply filters and sorting
  const filteredProducts = state.products
    .filter((product) => {
      const matchesSearch =
        state.filters.search === '' ||
        product.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(state.filters.search.toLowerCase());

      const matchesBrands =
        state.filters.brands.length === 0 ||
        state.filters.brands.includes(product.brand);

      const matchesSizes =
        state.filters.sizes.length === 0 ||
        product.sizes.some((size) => state.filters.sizes.includes(size));

      const matchesPriceRange =
        product.price >= state.filters.priceRange[0] &&
        product.price <= state.filters.priceRange[1];

      const matchesCondition =
        state.filters.condition === 'all' ||
        product.condition === state.filters.condition;

      return (
        matchesSearch &&
        matchesBrands &&
        matchesSizes &&
        matchesPriceRange &&
        matchesCondition
      );
    })
    .sort((a, b) => {
      switch (state.sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'top-rated':
          return b.rating - a.rating;
        case 'newest':
        default:
          return 0; // Assume products are already sorted by newest
      }
    });

  const cartTotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    ...state,
    dispatch,
    filteredProducts,
    cartTotal,
    cartCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}