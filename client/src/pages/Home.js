import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Beauty",
    "Gaming",
    "Books",
    "Kitchen",
  ];

  useEffect(() => {
    fetchProducts();
  }, [page, keyword]);

  const fetchProducts = async () => {
    try {
      let url = `/products?page=${page}&limit=20`;

      if (keyword) {
        url = `/products/search?keyword=${keyword}`;
      }

      const res = await API.get(url);

      setProducts(res.data.data);

      if (!keyword) {
        setTotalPages(res.data.totalPages);
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      {/* Hero */}

      <div className="hero">

        <h1>SHOP SMARTER</h1>

        <p>
          Premium Shopping Experience
        </p>

        <h5 className="mt-3">
          1000+ Products Available
        </h5>

        <button>
          Shop Now
        </button>

      </div>

      {/* Categories */}

      <div className="category-scroll">

        {categories.map((cat) => (
          <button
            key={cat}
            className="category-btn"
          >
            {cat}
          </button>
        ))}

      </div>

      {/* Products */}

      <div className="row">

        {products.length === 0 ? (
          <h3 className="text-center">
            No Products Found
          </h3>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}

      </div>

      {/* Pagination */}

      {!keyword && (

        <nav className="my-5">

          <ul className="pagination justify-content-center">

            <li
              className={`page-item ${
                page === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (

              <li
                key={i}
                className={`page-item ${
                  page === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>

            ))}

            <li
              className={`page-item ${
                page === totalPages
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>

          </ul>

        </nav>

      )}

    </div>
  );
}

export default Home;