import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

 useEffect(() => {
  fetchProduct();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

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
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to Cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (!product)
    return (
      <div className="container text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );

  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const discount = Math.floor(Math.random() * 35) + 15;

  return (
    <div className="container mt-5">

      <div className="card shadow-lg border-0 p-4">

        <div className="row">

          <div className="col-md-5 text-center">

            <img
              src={
                product.image ||
                "https://via.placeholder.com/500"
              }
              alt={product.name}
              className="img-fluid"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
              }}
            />

          </div>

          <div className="col-md-7">

            <small className="text-primary fw-bold">
              {product.brand}
            </small>

            <h2 className="mt-2">
              {product.name}
            </h2>

            <div className="d-flex align-items-center mb-3">

              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="#ccc" />

              <span className="ms-2 fw-bold">
                {rating}
              </span>

            </div>

            <h3 className="text-success">

              ₹{product.price}

              <small className="ms-3 text-danger">
                {discount}% OFF
              </small>

            </h3>

            <del className="text-muted">
              ₹{Math.round(product.price * 1.3)}
            </del>

            <hr />

            <p>{product.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>

              <strong>Stock:</strong>{" "}

              {product.stock > 0 ? (
                <span className="text-success">
                  In Stock
                </span>
              ) : (
                <span className="text-danger">
                  Out of Stock
                </span>
              )}

            </p>

            <div className="mb-4">

              <label className="form-label">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
                className="form-control"
                style={{ width: "120px" }}
              />

            </div>

            <div className="d-flex gap-3">

              <button
                className="btn btn-primary btn-lg"
                onClick={addToCart}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </button>

              <button
                className="btn btn-warning btn-lg"
              >
                <FaBolt className="me-2" />
                Buy Now
              </button>

            </div>

            <hr />

            <div>

              <h6>✔ Free Delivery</h6>

              <h6>✔ 7 Days Replacement</h6>

              <h6>✔ Secure Payment</h6>

              <h6>✔ Cash on Delivery Available</h6>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
