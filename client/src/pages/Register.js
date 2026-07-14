import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Create Account
              </h2>

              <form onSubmit={submitHandler}>

                <input
                  className="form-control mb-3"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  required
                />

                <button
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Register"}
                </button>

              </form>

              <div className="text-center mt-3">
                Already have an account?
                <Link to="/login"> Login</Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;