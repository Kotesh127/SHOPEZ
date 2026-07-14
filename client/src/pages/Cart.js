import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!token) {
    navigate("/login");
    return;
  }

  fetchCart();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    try {
      await API.put(
        `/cart/${id}`,
        {
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Clear entire cart?")) return;

    try {
      await API.delete("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrder = async () => {
    try {
      await API.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to place order");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Cart...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>My Cart</h2>

        {cartItems.length > 0 && (
          <button
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        )}

      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">

          <h4>Your cart is empty.</h4>

          <Link className="btn btn-primary mt-3" to="/">
            Continue Shopping
          </Link>

        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card shadow-sm mb-3"
            >
              <div className="row g-0">

                <div className="col-md-2 text-center">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="img-fluid p-3"
                    style={{
                      height: "140px",
                      objectFit: "contain",
                    }}
                  />

                </div>

                <div className="col-md-6">

                  <div className="card-body">

                    <h5>{item.product.name}</h5>

                    <p className="text-muted">
                      {item.product.brand}
                    </p>

                    <h5 className="text-success">
                      ₹{item.product.price}
                    </h5>

                  </div>

                </div>

                <div className="col-md-2 d-flex justify-content-center align-items-center">

                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span className="mx-3 fw-bold">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                </div>

                <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">

                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>

                  <strong>
                    ₹{item.product.price * item.quantity}
                  </strong>

                </div>

              </div>
            </div>
          ))}

          <div className="card shadow p-4 mt-4">

            <h3>Total : ₹{total.toFixed(2)}</h3>

            <button
              className="btn btn-success btn-lg mt-3"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;
