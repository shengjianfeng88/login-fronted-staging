// src/pages/tryon/Newtryon.tsx
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';

interface DealsProduct {
  name: string;
  color?: string;
  newPrice?: string;
  currency?: string;
  image: string;
  url: string;
  brand?: string;
  ogPrice?: string | null;
  isOnSale?: boolean;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
    style={{
      willChange: 'opacity',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
      imageRendering: 'auto',
    }}
  />
);

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const formatMoney = (price?: string, currency?: string) => {
  if (!price) return '';
  const num = Number(price);
  if (Number.isNaN(num)) return price;

  const code = currency || 'USD';
  const symbol = CURRENCY_SYMBOL[code] ?? '';
  // simple formatting so it’s cheap + predictable
  return `${symbol}${num.toFixed(2).replace(/\.00$/, '')}`;
};

const calculateDiscount = (newPrice?: string, ogPrice?: string | null) => {
  if (!newPrice || !ogPrice) return null;
  const n = Number(newPrice);
  const o = Number(ogPrice);
  if (!o || Number.isNaN(n) || Number.isNaN(o) || n >= o) return null;
  return Math.round(((o - n) / o) * 100); // percentage
};

interface ProductCardProps {
  image: string;
  name: string;
  brand?: string;
  newPrice?: string;
  ogPrice?: string | null;
  currency?: string;
  isOnSale?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void | Promise<void>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  brand,
  newPrice,
  ogPrice,
  currency,
  isOnSale,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const discount = isOnSale ? calculateDiscount(newPrice, ogPrice) : null;
  const displayNew = formatMoney(newPrice, currency);
  const displayOld = ogPrice ? formatMoney(ogPrice, currency) : '';

return  (

   <div className="relative bg-white overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col h-full rounded-2xl">
      {/* Image */}
      <div className="w-full h-72 bg-white flex items-center justify-center">
        <OptimizedImage
          src={image}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-medium line-clamp-1">
            {brand || ''}
          </p>

          {/* Favorite */}
          <button
            type="button"
            onClick={async (e) => {
              e.stopPropagation();
              await onToggleFavorite?.();
            }}
            className="cursor-pointer p-1 rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Name */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
          {name}
        </p>

        {/* Prices + badge */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2">
          {displayNew && (
            <span className="text-sm sm:text-base font-bold text-black">
              {displayNew}
            </span>
          )}

          {displayOld && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {displayOld}
            </span>
          )}

          {discount !== null && (
            <span className="text-[10px] sm:text-xs font-semibold text-[#AF5500] bg-[#FFE7C2] px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Page Component ----------
const Newtryon: React.FC = () => {
  const [products, setProducts] = useState<DealsProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get<{ products: DealsProduct[] }>(
          'https://deals-products.faishion.ai/products/'
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('Error fetching deals products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6 min-h-[calc(100vh-150px)] bg-gray-50 mx-auto rounded-md flex flex-col items-center gap-6">
      <div className="max-w-[1280px] w-full">
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-6 h-6 border-2 border-[#6C5DD3] border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600 text-sm sm:text-base">
              Loading deals...
            </span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 mt-20">
            <p className="text-gray-600 text-sm">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full">
            {products.map((p, idx) => (
              <div
                key={`${p.url}-${idx}`}
                onClick={() => {
                  if (p.url) {
                    window.open(p.url, '_blank');
                  }
                }}
              >
                <ProductCard
                  image={p.image}
                  name={p.name}
                  brand={p.brand}
                  newPrice={p.newPrice}
                  ogPrice={p.ogPrice}
                  currency={p.currency}
                  isOnSale={p.isOnSale}
                  isFavorite={false}
                  onToggleFavorite={() => {
                    // hook up favorites later if needed
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newtryon;
