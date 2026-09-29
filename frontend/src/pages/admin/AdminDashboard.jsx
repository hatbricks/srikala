import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../data/api';
import { formatINR } from '../../data/store';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getAdminMetrics()
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-dashboard"><p className="empty">Loading dashboard analytics…</p></div>;
  if (error) return <div className="admin-dashboard"><p className="admin-error">{error}</p></div>;

  const { metrics, lowStock = [], recentOrders = [], auditLogs = [] } = data || {};

  return (
    <div className="admin-dashboard">
      <div className="admin-page-head">
        <h1>Master Operations Dashboard</h1>
        <p>Live business intelligence computed directly from the PostgreSQL transaction ledger, Shiprocket fulfillment pipeline, and Razorpay payment records.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="metrics-grid">
        <div className="kpi-card highlight-card">
          <span className="kpi-title">Total Revenue</span>
          <span className="kpi-value">{formatINR(metrics?.totalRevenue || 0)}</span>
          <span className="kpi-sub">Across {metrics?.totalOrders || 0} paid orders</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Pending Shipments</span>
          <span className="kpi-value">{metrics?.pendingShipments || 0}</span>
          <span className="kpi-sub">Ready for dispatch or in transit</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Delivered Orders</span>
          <span className="kpi-value">{metrics?.deliveredOrders || 0}</span>
          <span className="kpi-sub">Successfully fulfilled</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Pending Returns</span>
          <span className="kpi-value">{metrics?.pendingReturns || 0}</span>
          <span className="kpi-sub">Awaiting admin review</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Active Customers</span>
          <span className="kpi-value">{metrics?.totalCustomers || 0}</span>
          <span className="kpi-sub">Registered accounts</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Low Stock Alerts</span>
          <span className="kpi-value">{lowStock.length}</span>
          <span className="kpi-sub">Products with &le; 3 units</span>
        </div>
      </div>

      <div className="dashboard-content-grid">
        {/* Recent Orders Table */}
        <div className="dash-section-card">
          <div className="section-head">
            <h3>Recent Customer Orders</h3>
            <Link to="/admin/orders" className="view-all-link">View all orders →</Link>
          </div>

          <div className="orders-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Shipment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan="6" className="text-center">No orders yet.</td></tr>
                ) : (
                  recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td><strong>{o.order_number || `#SK${o.id}`}</strong></td>
                      <td>{o.customer_name}</td>
                      <td><strong>{formatINR(o.total_amount || o.subtotal)}</strong></td>
                      <td>
                        <span className={`badge badge-${(o.payment_status || o.status).toLowerCase()}`}>
                          {o.payment_status || o.status}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-shipment">
                          {o.shipment_status || 'Pending'}
                        </span>
                      </td>
                      <td>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="dash-section-card">
          <div className="section-head">
            <h3>Inventory Restock Watchlist</h3>
            <Link to="/admin/products" className="view-all-link">Manage catalog →</Link>
          </div>

          {lowStock.length === 0 ? (
            <p className="clean-hint">✓ All products have adequate inventory levels.</p>
          ) : (
            <div className="low-stock-list">
              {lowStock.map((prod) => (
                <div className="low-stock-item" key={prod.id}>
                  <img src={prod.image} alt="" className="stock-thumb" />
                  <div className="stock-info">
                    <strong>{prod.name}</strong>
                    <span className="stock-qty-tag">{prod.stock === 0 ? 'Out of stock' : `${prod.stock} units remaining`}</span>
                  </div>
                  <Link to="/admin/products" className="edit-link">Restock</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-dashboard { padding-bottom: 50px; }
        .admin-page-head { margin-bottom: 26px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 680px; line-height: 1.6; }
        .empty { font-size: 13.5px; color: var(--ink-400); padding: 40px 0; }
        .admin-error { font-size: 13px; color: #a13a3a; margin-bottom: 16px; }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }
        .kpi-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .highlight-card {
          border-color: var(--maroon-900);
          background: #fdfaf9;
        }
        .kpi-title { font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-400); }
        .kpi-value { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--maroon-900); }
        .kpi-sub { font-size: 11.5px; color: var(--ink-500); }

        .dashboard-content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .dashboard-content-grid { grid-template-columns: 1fr; }
        }

        .dash-section-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 22px;
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .section-head h3 { font-size: 16px; color: var(--ink-900); margin: 0; }
        .view-all-link { font-size: 12.5px; color: var(--maroon-900); font-weight: 500; text-decoration: none; }

        .orders-table-wrapper { overflow-x: auto; }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left; }
        .dash-table th { padding: 10px 12px; font-weight: 600; color: var(--ink-400); border-bottom: 1px solid var(--stone-200); font-size: 11.5px; }
        .dash-table td { padding: 12px; border-bottom: 1px solid var(--stone-100); color: var(--ink-700); }

        .badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .badge-paid { background: #e8f2e6; color: #3c7a3c; }
        .badge-pending { background: #fdf0d5; color: #8a5a10; }
        .badge-failed { background: #f6e3e3; color: #a13a3a; }
        .badge-shipment { background: #e0f2fe; color: #0369a1; }

        .low-stock-list { display: flex; flex-direction: column; gap: 10px; }
        .low-stock-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 10px;
          background: var(--stone-50);
          border-radius: var(--radius-sm);
        }
        .stock-thumb { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; }
        .stock-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .stock-info strong { font-size: 12.5px; color: var(--ink-900); }
        .stock-qty-tag { font-size: 11px; color: #a13a3a; font-weight: 500; }
        .edit-link { font-size: 12px; color: var(--maroon-900); text-decoration: underline; }
        .clean-hint { font-size: 13px; color: #3c7a3c; padding: 16px 0; }
      `}</style>
    </div>
  );
}
