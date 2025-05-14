import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Check, ShoppingBag, Heart } from 'lucide-react';
import ProductGallery from '../components/ui/ProductGallery';
import MannequinViewer from '../components/ui/MannequinViewer';
import RatingStars from '../components/ui/RatingStars';
import Button from '../components/ui/Button';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, cart, wishlist, dispatch } = useShop();
  
  const product = products.find((p) => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for might have been removed or does not exist.</p>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!selectedColor && product.colors.length > 0) {
      alert('Please select a color');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        size: selectedSize,
        color: selectedColor || product.colors[0],
        quantity,
      },
    });

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleToggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: { productId: product.id } });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit this to an API
    alert(`Thank you for your review! Rating: ${newReview.rating}, Comment: ${newReview.comment}`);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-6">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <Link to="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-black">
                <ArrowLeft size={16} className="mr-1" /> Back to Shop
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

            <div className="flex items-center mb-4">
              <RatingStars rating={product.rating} />
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.comments.length} reviews)
              </span>
            </div>

            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm font-medium text-green-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <div className="mb-6">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 capitalize">
                {product.condition.replace('-', ' ')}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {product.authenticity ? 'Authenticity Verified' : 'Authenticity Pending'}
              </span>
            </div>

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`py-2 border rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`px-3 py-1 border rounded-md text-sm font-medium ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                onClick={handleAddToCart}
                leftIcon={<ShoppingBag size={18} />}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                leftIcon={<Heart size={18} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />}
                className="flex-1"
              >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
                <Check size={20} className="mr-2" />
                <span>Product added to your cart!</span>
              </div>
            )}
          </div>
        </div>

        {/* Mannequin Display Section */}
        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">See How They Look</h2>
          <div className="max-w-md mx-auto">
            <MannequinViewer
              images={product.mannequinImages}
              alt={`${product.name} on mannequin`}
            />
          </div>
        </div>

        {/* Tab Section */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                  activeTab === 'description'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                  activeTab === 'details'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details & Care
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.comments.length})
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Product Details</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><span className="font-medium">Brand:</span> {product.brand}</li>
                    <li><span className="font-medium">Condition:</span> {product.condition}</li>
                    <li><span className="font-medium">Authenticity:</span> {product.authenticity ? 'Verified Authentic' : 'Authentication Pending'}</li>
                    <li><span className="font-medium">Available Sizes:</span> {product.sizes.join(', ')}</li>
                    <li><span className="font-medium">Available Colors:</span> {product.colors.join(', ')}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Care Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Clean with a soft brush or cloth to remove surface dirt</li>
                    <li>Use appropriate cleaner based on material (leather, suede, canvas)</li>
                    <li>Store in a cool, dry place away from direct sunlight</li>
                    <li>Use a shoe tree to maintain shape when not in use</li>
                    <li>Allow shoes to air dry if they become wet</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Review Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/3 mb-4 md:mb-0 text-center">
                      <div className="text-5xl font-bold text-gray-900">{product.rating.toFixed(1)}</div>
                      <RatingStars rating={product.rating} size="lg" />
                      <p className="mt-1 text-sm text-gray-500">{product.comments.length} reviews</p>
                    </div>
                    <div className="md:w-2/3 md:pl-8 md:border-l md:border-gray-200">
                      <h3 className="font-semibold mb-3">Write a Review</h3>
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                          <RatingStars
                            rating={newReview.rating}
                            interactive
                            onChange={(rating) => setNewReview({ ...newReview, rating })}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Review
                          </label>
                          <textarea
                            id="comment"
                            rows={3}
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            placeholder="Share your experience with this product..."
                            required
                          ></textarea>
                        </div>
                        <Button type="submit" size="sm">
                          Submit Review
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {product.comments.length > 0 ? (
                    product.comments.map((comment) => (
                      <div key={comment.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start">
                          <img
                            src={comment.userAvatar}
                            alt={comment.userName}
                            className="h-10 w-10 rounded-full mr-4"
                          />
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-900">{comment.userName}</h4>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <RatingStars rating={comment.rating} size="sm" />
                            <p className="mt-2 text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-6">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.brand === product.brand)
              .slice(0, 4)
              .map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;