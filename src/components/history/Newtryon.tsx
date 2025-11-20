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

interface ProductCardProps {
  image: string;
  name: string;
  brand?: string;
  price?: string;
  currency?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void | Promise<void>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  brand,
  price,
  currency,
  isFavorite = false,
  onToggleFavorite,
}) => (
  <div className="relative bg-white overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col h-full rounded-2xl">
    {/* Image section */}
    <div className="w-full h-72 bg-white flex items-center justify-center">
      <OptimizedImage src={image} alt={name} className="h-full object-contain" />
    </div>

    {/* Text section */}
    <div className="p-4 flex flex-col justify-between flex-grow">
      <div className="flex items-center justify-between mb-1">
        {/* Brand (optional – will be mostly empty for now) */}
        <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">
          {brand || ''}
        </p>

        {/* Favorite button (hook up later if you want) */}
        <div
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
        </div>
      </div>

      {/* Name (main thing we show now) */}
      <p className="text-lg font-semibold text-gray-900 truncate">{name}</p>

      {/* Price row – will be empty until we hook it up */}
      {(price || currency) && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-black">
            {currency}
            {price}
          </span>
        </div>
      )}
    </div>
  </div>
);

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
    <section className="px-10 py-6 min-h-[calc(100vh-150px)] bg-gray-50 mx-auto rounded-md flex flex-col items-center gap-6">
      <div className="max-w-[1280px] w-full">
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-6 h-6 border-2 border-[#6C5DD3] border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600">Loading deals...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 mt-20">
            <p className="text-gray-600 text-sm">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
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
                  brand={undefined}
                  price={undefined }
                  currency={undefined}
                  isFavorite={false}
                  onToggleFavorite={() => {
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
