import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!token) {
    navigate("/login");
    return;
  }

  fetchOrders();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Orders...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card shadow-sm mb-4"
          >
            <div className="card-header d-flex justify-content-between">

              <strong>
                Order ID :
                {" "}
                {order._id}
              </strong>

              <span className="badge bg-primary">
                {order.status}
              </span>

            </div>

            <div className="card-body">

              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="row border-bottom py-3 align-items-center"
                >

                  <div className="col-md-2 text-center">

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="img-fluid"
                      style={{
                        height: "90px",
                        objectFit: "contain",
                      }}
                    />

                  </div>

                  <div className="col-md-6">

                    <h6>{item.product.name}</h6>

                    <small className="text-muted">
                      {item.product.brand}
                    </small>

                  </div>

                  <div className="col-md-2">

                    Qty :
                    {" "}
                    {item.quantity}

                  </div>

                  <div className="col-md-2 text-success fw-bold">

                    ₹
                    {item.product.price * item.quantity}

                  </div>

                </div>
              ))}

              <div className="text-end mt-3">

                <h4>
                  Total :
                  {" "}
                  ₹
                  {order.totalAmount}
                </h4>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Orders;
