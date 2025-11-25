import React, { useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

/** API shape */
interface DealsProduct {
  name: string;
  newPrice?: string;
  ogPrice?: string | null;
  currency?: string;
  image: string;
  url: string;
  brand?: string;
  isOnSale?: boolean;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  offset: number;
}

interface DealsResponse {
  products: DealsProduct[];
  pagination: PaginationInfo;
}

/** Local helpers */
const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const formatMoney = (price?: string, currency?: string) => {
  if (!price) return "";
  const num = Number(price);
  if (Number.isNaN(num)) return price;
  const sym = CURRENCY_SYMBOL[currency || "USD"] || "";
  return `${sym}${num.toFixed(2).replace(/\.00$/, "")}`;
};

const calcDiscount = (newPrice?: string, ogPrice?: string | null) => {
  if (!newPrice || !ogPrice) return null;
  const n = Number(newPrice);
  const o = Number(ogPrice);
  if (!o || Number.isNaN(n) || Number.isNaN(o) || n >= o) return null;
  return Math.round(((o - n) / o) * 100);
};

/** Image (simple, responsive) */
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
    style={{
      backfaceVisibility: "hidden",
      transform: "translateZ(0)",
      imageRendering: "auto",
    }}
  />
);


const ProductCard: React.FC<{ product: DealsProduct }> = ({ product }) => {
  const {
    image,
    name,
    brand,
    newPrice,
    ogPrice,
    currency,
    isOnSale,
  } = product;

  const discount = isOnSale ? calcDiscount(newPrice, ogPrice) : null;
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative bg-white overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col h-full rounded-2xl">
      <div className="h-full object-contain">
        <OptimizedImage
          src={image}
          alt={name}
          className="h-full object-contain"
        />
      </div>

      {/* Content area (keep your Deals styling) */}
      <div className="p-4 flex flex-col gap-1 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <p
            className="
              font-sans font-semibold uppercase
              text-[13px] sm:text-[14px] md:text-[16px]
              leading-none tracking-wide
              text-[#758094] line-clamp-1
            "
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {brand || ""}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLiked((prev) => !prev);
            }}
            className="p-1"
            aria-label="favorite"
          >
            <Heart
              className={`
                w-5 h-5 transition
                ${liked ? "text-red-500 fill-red-500" : "text-gray-300"}
              `}
            />
          </button>
        </div>

        <p
          className="
            font-sans font-semibold
            text-[16px] sm:text-[18px] md:text-[20px]
            leading-snug text-[#303747]
            truncate
          "
          style={{ fontFamily: "Open Sans, sans-serif" }}
          title={name}
        >
          {name}
        </p>

        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
          {newPrice && (
            <span
              className="text-[13px] sm:text-[14px] font-semibold text-[#1B212B]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {formatMoney(newPrice, currency)}
            </span>
          )}

          {ogPrice && (
            <span
              className="
                text-[13px] sm:text-[14px]
                font-normal text-[#758094]
                line-through
              "
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {formatMoney(ogPrice, currency)}
            </span>
          )}

          {discount !== null && (
            <span
              className="
                text-[11px] sm:text-[12px]
                font-medium text-[#D97706]
                bg-[#F0D6B3]
                rounded-[5px]
                px-[7px] py-[2px]
                leading-none
              "
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


const LIMIT = 50;

const Newtryon: React.FC = () => {
  const [products, setProducts] = useState<DealsProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPage = useCallback(
    async (pageToFetch: number, append: boolean) => {
      try {
        const isFirst = pageToFetch === 1 && !append;
        if (isFirst) setLoadingFirst(true);
        else setLoadingMore(true);

        const res = await axios.get<DealsResponse>(
          `https://deals-products.faishion.ai/products/?page=${pageToFetch}&limit=${LIMIT}`
        );

        const nextProducts = res.data.products || [];
        const pagination = res.data.pagination;

        setHasNext(!!pagination?.has_next);
        setTotalPages(pagination?.total_pages ?? null);

        setProducts((prev) =>
          append ? [...prev, ...nextProducts] : nextProducts
        );
      } catch (err) {
        console.error("Error fetching deals products:", err);
      } finally {
        setLoadingFirst(false);
        setLoadingMore(false);
      }
    },
    []
  );

  // initial load + whenever page changes (load more)
  useEffect(() => {
    fetchPage(page, page > 1);
  }, [page, fetchPage]);

  const loadMore = () => {
    if (!hasNext || loadingMore) return;
    setPage((p) => p + 1);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6 bg-gray-50 min-h-[calc(100vh-150px)]">
      <div className="max-w-[1280px] mx-auto">
        {loadingFirst ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-6 h-6 border-2 border-[#6C5DD3] border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600">Loading deals...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 mt-20">
            <p className="text-gray-600 text-sm">No products found</p>
          </div>
        ) : (
          <>
            <div
              className="
                grid gap-8 sm:gap-5 md:gap-6
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              "
            >
              {products.map((p, idx) => (
                <div
                  key={`${p.url}-${idx}`}
                  onClick={() => p.url && window.open(p.url, "_blank")}
                  className="cursor-pointer"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {/* Load more footer */}
            <div className="flex flex-col items-center mt-8">
              {loadingMore && (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-5 h-5 border-2 border-[#6C5DD3] border-t-transparent rounded-full animate-spin" />
                  Loading more...
                </div>
              )}

              {!loadingMore && hasNext && (
                <button
                  onClick={loadMore}
                  className="
                    mt-3 px-6 py-2 rounded-lg
                    bg-black text-white text-sm font-semibold
                    hover:bg-gray-800 transition
                  "
                >
                  Load More
                </button>
              )}

              {!hasNext && (
                <p className="mt-3 text-xs text-gray-500">
                  You’ve reached the end{totalPages ? ` (page ${page}/${totalPages})` : ""}.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Newtryon;
