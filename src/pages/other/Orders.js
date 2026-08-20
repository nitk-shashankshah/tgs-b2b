import { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
const TOKEN_STORAGE_KEY = "tgs_admin_token";

const STATUS_FILTERS = ["all", "pending", "paid", "delivered", "cancelled", "failed"];
const STATUS_OPTIONS = ["pending", "paid", "delivered", "cancelled", "failed"];

const STATUS_BADGE_CLASS = {
  pending: "badge bg-warning text-dark",
  paid: "badge bg-info text-dark",
  delivered: "badge bg-success",
  cancelled: "badge bg-secondary",
  failed: "badge bg-danger",
};

const Orders = () => {
  let { pathname } = useLocation();

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = useCallback(
    async (activeToken, filter) => {
      setLoading(true);
      setError("");
      try {
        const query = filter && filter !== "all" ? `?status=${filter}` : "";
        const { data } = await axios.get(`${API_URL}/orders${query}`, {
          headers: { Authorization: `Bearer ${activeToken}` },
        });
        setOrders(data.orders);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
        } else {
          setError(err.response?.data?.error || "Failed to load orders.");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (token) {
      fetchOrders(token, statusFilter);
    }
  }, [token, statusFilter, fetchOrders]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const { data } = await axios.post(`${API_URL}/admin/login`, { password });
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setOrders([]);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await axios.patch(
        `${API_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Orders" description="Order management for Total Gift Solutions." />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Orders", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="container pt-95 pb-100">
          {!token ? (
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <h3 className="mb-20">Admin Login</h3>
                <form onSubmit={handleLogin}>
                  <input
                    type="password"
                    className="form-control mb-15"
                    placeholder="Admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                  {loginError && <p className="text-danger mb-15">{loginError}</p>}
                  <button type="submit" className="btn btn-primary w-100" disabled={loggingIn}>
                    {loggingIn ? "Logging in…" : "Log in"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-20">
                <h3 className="mb-0">Orders</h3>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                  Log out
                </button>
              </div>

              <div className="mb-20 d-flex flex-wrap gap-2">
                {STATUS_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    className={`btn btn-sm ${
                      statusFilter === filter ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setStatusFilter(filter)}
                  >
                    {filter[0].toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              {error && <p className="text-danger mb-15">{error}</p>}

              {loading ? (
                <p>Loading orders…</p>
              ) : orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{new Date(order.created_at).toLocaleString()}</td>
                          <td>
                            <div>
                              {order.first_name} {order.last_name}
                            </div>
                            <div className="text-muted small">{order.email}</div>
                            <div className="text-muted small">{order.phone}</div>
                          </td>
                          <td className="small">
                            {order.address1}
                            {order.address2 ? `, ${order.address2}` : ""}, {order.city},{" "}
                            {order.state} {order.postcode}, {order.country}
                          </td>
                          <td className="small">
                            {order.items.map((item, index) => (
                              <div key={index}>
                                {item.name} x {item.quantity}
                              </div>
                            ))}
                          </td>
                          <td>
                            {order.currency} {Number(order.amount).toFixed(2)}
                          </td>
                          <td>
                            <span className={STATUS_BADGE_CLASS[order.status] || "badge bg-secondary"}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={order.status}
                              disabled={updatingId === order.id}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                              {STATUS_OPTIONS.map((statusOption) => (
                                <option key={statusOption} value={statusOption}>
                                  {statusOption}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Orders;
