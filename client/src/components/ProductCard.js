import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const discount = Math.floor(Math.random() * 40) + 10;

  const addToCart = async () => {
    if (!token) {
      toast.info("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to Cart");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to add product"
      );
    }
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">

      <div className="card product-card shadow-sm h-100 position-relative">

        <div className="discount">
          {discount}% OFF
        </div>

        <div className="wishlist">
          <FaHeart color="#dc3545" />
        </div>

        <img
          src={
            product.image ||
            "https://via.placeholder.com/300x300?text=No+Image"
          }
          alt={product.name}
          className="product-image"
        />

        <div className="card-body d-flex flex-column">

          <small className="brand">
            {product.brand || "Generic"}
          </small>

          <h6 className="product-name mt-2">
            {product.name}
          </h6>

          <div className="rating">

            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-secondary" />

            <span className="ms-2 text-dark fw-bold">
              {rating}
            </span>

          </div>

          <div className="d-flex align-items-center">

            <h4 className="price me-3">
              ₹{product.price}
            </h4>

            <del className="text-muted">
              ₹{Math.round(product.price * 1.25)}
            </del>

          </div>

          <small className="text-success fw-bold mb-3">
            Free Delivery
          </small>

          <div className="mt-auto">

            <Link
              to={`/product/${product._id}`}
              className="btn btn-outline-primary w-100 mb-2"
            >
              View Details
            </Link>

            <button
              className="btn btn-primary w-100"
              onClick={addToCart}
            >
              <FaShoppingCart className="me-2" />
              Add to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;