import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { ArrowRight, ArrowRightCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { products } = useShop();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  const newArrivals = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);

  // Add scroll listener to hide header on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY <= 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/9638712/pexels-photo-9638712.jpeg"
            alt="Luxury shoes"
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              style={{ 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 1s ease-out'
              }}
            >
              LUXURY FOOTWEAR<br />
              <span className="text-gray-300">SECOND CHANCE</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-xl">
              Authenticated second-hand luxury shoes from the world's most coveted brands. 
              Each pair tells a story, and we ensure it's a genuine one.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/authentication">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Our Authentication Process
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${isHeaderVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Collection</h2>
            <Link to="/shop" className="flex items-center text-gray-700 hover:text-black">
              <span className="mr-1">View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Banner */}
      <section className="py-12 bg-zinc-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl text-gray-500 mb-8 uppercase tracking-wider">Authenticated Luxury Brands</h3>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            <div className="text-2xl font-bold text-gray-400">NIKE</div>
            <div className="text-2xl font-bold text-gray-400">ADIDAS</div>
            <div className="text-2xl font-bold text-gray-400">BALENCIAGA</div>
            <div className="text-2xl font-bold text-gray-400">LOUBOUTIN</div>
            <div className="text-2xl font-bold text-gray-400">GUCCI</div>
            <div className="text-2xl font-bold text-gray-400">MANOLO</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Authentication</h3>
              <p className="text-gray-600">
                Every item undergoes rigorous authentication by our team of experts, ensuring each piece is 100% genuine.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">3D Visualization</h3>
              <p className="text-gray-600">
                View each pair on our mannequin display with 360° rotation to see how they'll look when worn.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Secure Purchase</h3>
              <p className="text-gray-600">
                Shop with confidence with our secure checkout and guaranteed delivery of your authenticated luxury footwear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals with Parallax Effect */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/shop" className="flex items-center text-gray-300 hover:text-white">
              <span className="mr-1">View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map(product => (
              <div key={product.id} className="group bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-white line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 mt-1">{product.brand}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-white">${product.price.toFixed(2)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I was skeptical about buying second-hand luxury shoes online, but the authentication process and detailed photos gave me confidence. The Louboutins I purchased were in perfect condition, exactly as described."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The 360° mannequin view feature is a game-changer! Being able to see how the shoes look when worn made my decision so much easier. My Balenciagas arrived in pristine condition."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold">Michael Carter</h4>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I've bought from several second-hand luxury sites, but LUXESoles offers the best combination of authentication, fair pricing, and condition transparency. The Air Jordans I bought looked even better in person."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your perfect pair?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Browse our curated collection of authenticated luxury shoes. 
            Each pair has been expertly verified and is ready for its second chapter with you.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop the Collection
              <ArrowRightCircle size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;