import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
  FaBoxOpen,
  FaUserShield,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">

      <div className="container">

        <Link
          className="navbar-brand text-primary fw-bold"
          to="/"
        >
          🛒 SHOPEZ
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbar"
        >

          <form
            className="d-flex mx-auto search-box"
            onSubmit={submitHandler}
          >

            <input
              className="form-control rounded-pill"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
            />

            <button
              className="btn btn-primary rounded-pill ms-2"
            >
              <FaSearch />
            </button>

          </form>

          <ul className="navbar-nav align-items-center">

            <li className="nav-item me-2">

              <Link
                className="nav-link"
                to="/cart"
              >
                <FaShoppingCart size={20} />
              </Link>

            </li>

            {!user ? (
              <>
                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="nav-link"
                    to="/register"
                  >
                    Register
                  </Link>

                </li>
              </>
            ) : (
              <li className="nav-item dropdown">

                <button
                  className="btn btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <FaUserCircle
                    size={22}
                    className="me-2"
                  />

                  {user.name}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow">

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/orders"
                    >
                      <FaBoxOpen className="me-2" />
                      My Orders
                    </Link>

                  </li>

                  {user.role === "admin" && (
                    <li>

                      <Link
                        className="dropdown-item"
                        to="/admin"
                      >
                        <FaUserShield className="me-2" />
                        Admin Dashboard
                      </Link>

                    </li>
                  )}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>

                    <button
                      className="dropdown-item text-danger"
                      onClick={logoutHandler}
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </button>

                  </li>

                </ul>

              </li>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;