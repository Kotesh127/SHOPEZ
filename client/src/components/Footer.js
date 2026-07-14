import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer mt-5">

      <div className="container">

        <div className="row">

          <div className="col-md-4 mb-4">

            <h3 className="fw-bold text-primary">
              🛒 SHOPEZ
            </h3>

            <p className="mt-3">
              Your one-stop destination for premium shopping.
              Explore thousands of quality products with
              secure payments and fast delivery.
            </p>

          </div>

          <div className="col-md-4 mb-4">

            <h5>Quick Links</h5>

            <ul className="list-unstyled mt-3">

              <li>
                <a href="/">Home</a>
              </li>

              <li>
                <a href="/cart">Cart</a>
              </li>

              <li>
                <a href="/orders">Orders</a>
              </li>

              <li>
                <a href="/login">Login</a>
              </li>

            </ul>

          </div>

          <div className="col-md-4 mb-4">

            <h5>Connect</h5>

            <div
              className="d-flex justify-content-center gap-4 mt-4"
              style={{ fontSize: "28px" }}
            >

              <FaFacebook />

              <FaInstagram />

              <FaLinkedin />

              <FaGithub />

            </div>

          </div>

        </div>

        <hr />

        <p className="text-center mb-0">

          © 2026 SHOPEZ | Built with React, Node.js,
          Express & MongoDB

        </p>

      </div>

    </footer>
  );
}

export default Footer;