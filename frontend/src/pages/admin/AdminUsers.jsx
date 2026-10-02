import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../data/api';
import { formatINR } from '../../data/store';
import {
  UsersIcon,
  WhatsAppIcon,
  PhoneIcon,
  CloseIcon,
  OrdersIcon,
} from '../../components/admin/AdminIcons';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    googleUsers: 0,
    customersWithOrders: 0,
    totalLTV: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filterType, setFilterType] = useState('ALL');

  // Customer Detail Modal
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [sort]);

  async function fetchUsers() {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAdminUsers({ sort, q: search });
      setUsers(data.users || []);
      if (data.summary) setSummary(data.summary);
    } catch (err) {
      setError(err.message || 'Failed to load customers list.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    fetchUsers();
  }

  async function openUserDetail(id) {
    setSelectedUserId(id);
    setDetailLoading(true);
    setDetailError('');
    setDetailUser(null);
    try {
      const data = await api.getAdminUserDetail(id);
      setDetailUser(data);
    } catch (err) {
      setDetailError(err.message || 'Failed to load customer profile details.');
    } finally {
      setDetailLoading(false);
    }
  }

  function closeUserDetail() {
    setSelectedUserId(null);
    setDetailUser(null);
  }

  const displayedUsers = users.filter((u) => {
    if (filterType === 'GOOGLE') return Boolean(u.google_id);
    if (filterType === 'ORDERS') return u.orders_count > 0;
    if (filterType === 'ADMIN') return Boolean(u.is_admin);
    return true;
  });

  return (
    <div className="admin-page admin-users-page">
      <div className="admin-page-header">
        <div>
          <h1>Customers &amp; Patrons</h1>
          <p className="admin-subtitle">
            Manage your registered customer accounts, Google profiles, and delivery addresses.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? 'Refreshing…' : 'Refresh List'}
        </button>
      </div>

      {error && <div className="admin-alert error">{error}</div>}

      {/* Overview Stat Cards */}
      <div className="users-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap users-icon-bg">
            <UsersIcon width={22} height={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Registered</span>
            <strong className="stat-value">{summary.totalUsers}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap google-icon-bg">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.34 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.27C.46 8.19 0 10.03 0 12s.46 3.81 1.27 5.43l4.01-3.14z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.66 1.27 6.57l4.01 3.14c.95-2.83 3.6-4.96 6.72-4.96z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Google 1-Click Users</span>
            <strong className="stat-value">{summary.googleUsers}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap orders-icon-bg">
            <OrdersIcon width={22} height={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Paying Customers</span>
            <strong className="stat-value">{summary.customersWithOrders}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap rev-icon-bg">
            <span style={{ fontSize: '18px', fontWeight: 700 }}>₹</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Customer Lifetime Value</span>
            <strong className="stat-value">{formatINR(summary.totalLTV)}</strong>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="admin-toolbar">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="search"
            placeholder="Search by name, email, or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            Search
          </button>
          {search && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearch('');
                api.getAdminUsers({ sort, q: '' }).then((data) => setUsers(data.users || []));
              }}
            >
              Clear
            </button>
          )}
        </form>

        <div className="filter-group">
          <div className="pill-filters">
            <button
              type="button"
              className={`pill-btn ${filterType === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterType('ALL')}
            >
              All ({users.length})
            </button>
            <button
              type="button"
              className={`pill-btn ${filterType === 'GOOGLE' ? 'active' : ''}`}
              onClick={() => setFilterType('GOOGLE')}
            >
              Google ({summary.googleUsers})
            </button>
            <button
              type="button"
              className={`pill-btn ${filterType === 'ORDERS' ? 'active' : ''}`}
              onClick={() => setFilterType('ORDERS')}
            >
              With Orders ({summary.customersWithOrders})
            </button>
            <button
              type="button"
              className={`pill-btn ${filterType === 'ADMIN' ? 'active' : ''}`}
              onClick={() => setFilterType('ADMIN')}
            >
              Admins
            </button>
          </div>

          <div className="sort-dropdown">
            <label htmlFor="user-sort">Sort:</label>
            <select
              id="user-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select-input"
            >
              <option value="newest">Newest Registered</option>
              <option value="oldest">Oldest First</option>
              <option value="orders_desc">Most Orders</option>
              <option value="spent_desc">Highest Spend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Data Table */}
      <div className="admin-table-container">
        {loading ? (
          <div className="table-loading">Loading customer profiles…</div>
        ) : displayedUsers.length === 0 ? (
          <div className="table-empty">
            <p>No customers match your search or filter.</p>
          </div>
        ) : (
          <table className="admin-table users-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Delivery Location</th>
                <th>Orders &amp; Spend</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((u) => {
                const initials = (u.name || u.email || 'U')
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                const phoneClean = u.mobile ? u.mobile.replace(/\D/g, '') : '';
                const whatsappNumber = phoneClean.length === 10 ? `91${phoneClean}` : phoneClean;

                return (
                  <tr key={u.id} className={u.is_admin ? 'user-row-admin' : ''}>
                    <td>
                      <div className="user-profile-cell">
                        <div className={`user-avatar ${u.is_admin ? 'avatar-admin' : ''}`}>
                          {initials}
                        </div>
                        <div className="user-name-meta">
                          <strong className="user-name">{u.name || 'Unnamed Patron'}</strong>
                          <div className="user-badges">
                            {u.is_admin && <span className="badge badge-admin">Admin</span>}
                            {u.google_id ? (
                              <span className="badge badge-google" title="Google 1-Click Authenticated">
                                <svg viewBox="0 0 24 24" width="12" height="12">
                                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
                                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.34 7.33 24 12 24z" />
                                  <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.27C.46 8.19 0 10.03 0 12s.46 3.81 1.27 5.43l4.01-3.14z" />
                                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.66 1.27 6.57l4.01 3.14c.95-2.83 3.6-4.96 6.72-4.96z" />
                                </svg>
                                Google
                              </span>
                            ) : (
                              <span className="badge badge-email">Email</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="contact-cell">
                        <span className="user-email">{u.email}</span>
                        {u.mobile ? (
                          <div className="user-phone-wrap">
                            <span className="user-phone">{u.mobile}</span>
                            <div className="contact-quick-actions">
                              <a
                                href={`https://wa.me/${whatsappNumber}?text=Namaste%20${encodeURIComponent(u.name || '')},%20greetings%20from%20Ravichandra%20Textiles!`}
                                target="_blank"
                                rel="noreferrer"
                                className="icon-link-wa"
                                title="Chat on WhatsApp"
                              >
                                <WhatsAppIcon width={14} height={14} />
                              </a>
                              <a
                                href={`tel:${u.mobile}`}
                                className="icon-link-tel"
                                title="Call customer"
                              >
                                <PhoneIcon width={14} height={14} />
                              </a>
                            </div>
                          </div>
                        ) : (
                          <span className="muted-text">No phone provided</span>
                        )}
                      </div>
                    </td>

                    <td>
                      {u.default_address_city ? (
                        <div className="location-cell">
                          <strong>{u.default_address_city}, {u.default_address_state}</strong>
                          <span className="location-sub">PIN: {u.default_address_pincode}</span>
                        </div>
                      ) : (
                        <span className="muted-text">Pending profile completion</span>
                      )}
                    </td>

                    <td>
                      <div className="orders-metric-cell">
                        <span className={`orders-count-badge ${u.orders_count > 0 ? 'has-orders' : ''}`}>
                          {u.orders_count} {u.orders_count === 1 ? 'order' : 'orders'}
                        </span>
                        {u.orders_count > 0 && (
                          <strong className="user-ltv">{formatINR(u.total_spent)}</strong>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className="joined-date">
                        {new Date(u.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm btn-details"
                        onClick={() => openUserDetail(u.id)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedUserId && (
        <div className="modal-backdrop" onClick={closeUserDetail}>
          <div className="modal-card user-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Customer Profile &amp; Orders</h3>
              <button type="button" className="close-btn" onClick={closeUserDetail}>
                <CloseIcon width={18} height={18} />
              </button>
            </div>

            <div className="modal-body">
              {detailLoading ? (
                <div className="modal-loading">Loading customer records…</div>
              ) : detailError ? (
                <div className="admin-alert error">{detailError}</div>
              ) : detailUser ? (
                <div className="user-detail-content">
                  {/* Primary Info */}
                  <div className="detail-primary-box">
                    <div className="detail-avatar">
                      {(detailUser.user?.name || detailUser.user?.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="detail-meta">
                      <h2>{detailUser.user?.name || 'Unnamed Customer'}</h2>
                      <div className="detail-row-item">
                        <span>Email:</span>
                        <strong>{detailUser.user?.email}</strong>
                      </div>
                      <div className="detail-row-item">
                        <span>Mobile:</span>
                        <strong>{detailUser.user?.mobile || 'Not provided'}</strong>
                      </div>
                      <div className="detail-row-item">
                        <span>Account Type:</span>
                        <span>{detailUser.user?.google_id ? 'Google Verified Account' : 'Standard Account'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Saved Addresses */}
                  <div className="detail-section">
                    <h4>Saved Delivery Addresses ({detailUser.addresses?.length || 0})</h4>
                    {detailUser.addresses?.length === 0 ? (
                      <p className="muted-text">No delivery addresses recorded yet.</p>
                    ) : (
                      <div className="address-cards-list">
                        {detailUser.addresses.map((a) => (
                          <div key={a.id} className="address-item-card">
                            <div className="address-header">
                              <strong>{a.name || detailUser.user?.name}</strong>
                              {a.is_default && <span className="badge badge-default">Primary Address</span>}
                            </div>
                            <p className="address-lines">
                              {a.line1}
                              {a.line2 && <>, {a.line2}</>}
                              <br />
                              {a.city}, {a.state} &mdash; {a.pincode}
                              <br />
                              Phone: {a.mobile || detailUser.user?.mobile}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Order History */}
                  <div className="detail-section">
                    <h4>Order History ({detailUser.orders?.length || 0})</h4>
                    {detailUser.orders?.length === 0 ? (
                      <p className="muted-text">Customer hasn&apos;t placed any orders yet.</p>
                    ) : (
                      <div className="orders-mini-table-wrap">
                        <table className="mini-table">
                          <thead>
                            <tr>
                              <th>Order</th>
                              <th>Date</th>
                              <th>Payment</th>
                              <th>Status</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detailUser.orders.map((o) => (
                              <tr key={o.id}>
                                <td>
                                  <strong>#{o.order_number || o.id}</strong>
                                </td>
                                <td>
                                  {new Date(o.created_at).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </td>
                                <td>
                                  <span className={`status-pill ${o.payment_status?.toLowerCase()}`}>
                                    {o.payment_status}
                                  </span>
                                </td>
                                <td>{o.shipment_status || o.status}</td>
                                <td>
                                  <strong>{formatINR(o.total_amount || o.subtotal)}</strong>
                                </td>
                                <td>
                                  <Link
                                    to="/admin/orders"
                                    className="btn btn-outline btn-xs"
                                    onClick={closeUserDetail}
                                  >
                                    View in Orders
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-users-page { padding-bottom: 60px; }
        .users-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--stone-200, #e8dec8);
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .users-icon-bg { background: rgba(88, 30, 21, 0.1); color: var(--maroon-900, #581e15); }
        .google-icon-bg { background: #f1f3f4; }
        .orders-icon-bg { background: rgba(176, 115, 46, 0.12); color: #b0732e; }
        .rev-icon-bg { background: rgba(46, 125, 50, 0.1); color: #2e7d32; }

        .stat-content { display: flex; flex-direction: column; gap: 2px; }
        .stat-label { font-size: 11.5px; color: var(--ink-500, #735e59); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
        .stat-value { font-size: 20px; color: var(--maroon-900, #581e15); font-family: var(--font-heading, serif); }

        .admin-toolbar {
          background: #ffffff;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid var(--stone-200, #e8dec8);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        .search-form { display: flex; align-items: center; gap: 8px; flex: 1; max-width: 420px; }
        .search-input {
          flex: 1;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #dcd3c4;
          font-size: 13.5px;
        }
        .filter-group { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .pill-filters { display: flex; gap: 6px; }
        .pill-btn {
          border: 1px solid #ded3c1;
          background: #faf6f0;
          color: var(--ink-700, #5c4742);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pill-btn.active {
          background: var(--maroon-900, #581e15);
          color: #ffffff;
          border-color: var(--maroon-900, #581e15);
        }
        .sort-dropdown { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--ink-600); }
        .select-input { padding: 6px 10px; border-radius: 6px; border: 1px solid #dcd3c4; font-size: 12.5px; }

        .admin-table-container {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid var(--stone-200, #e8dec8);
          overflow-x: auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
        }
        .users-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .users-table th {
          background: #faf6f0;
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-600, #735e59);
          border-bottom: 1px solid var(--stone-200, #e8dec8);
        }
        .users-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f3ece1;
          vertical-align: middle;
        }
        .user-row-admin { background: #fffcf8; }

        .user-profile-cell { display: flex; align-items: center; gap: 12px; }
        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f0e6d6;
          color: var(--maroon-900, #581e15);
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dfd0bb;
          flex-shrink: 0;
        }
        .avatar-admin {
          background: var(--maroon-900, #581e15);
          color: #fbdfa2;
          border-color: #581e15;
        }
        .user-name-meta { display: flex; flex-direction: column; gap: 3px; }
        .user-name { font-size: 13.5px; color: var(--ink-900, #220d0a); }
        .user-badges { display: flex; align-items: center; gap: 6px; }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          padding: 2px 7px;
          border-radius: 999px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .badge-admin { background: #fbeae5; color: #b71c1c; border: 1px solid #ffcdd2; }
        .badge-google { background: #e8f0fe; color: #1967d2; border: 1px solid #cce0fc; }
        .badge-email { background: #f5f5f5; color: #616161; border: 1px solid #e0e0e0; }
        .badge-default { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }

        .contact-cell { display: flex; flex-direction: column; gap: 4px; }
        .user-email { color: var(--ink-800, #382420); font-size: 12.5px; word-break: break-all; }
        .user-phone-wrap { display: flex; align-items: center; gap: 8px; }
        .user-phone { font-size: 12px; color: var(--ink-600); }
        .contact-quick-actions { display: flex; align-items: center; gap: 6px; }
        .icon-link-wa { color: #25d366; display: flex; align-items: center; }
        .icon-link-tel { color: #1976d2; display: flex; align-items: center; }

        .location-cell { display: flex; flex-direction: column; gap: 2px; }
        .location-sub { font-size: 11px; color: var(--ink-500); }

        .orders-metric-cell { display: flex; flex-direction: column; gap: 3px; }
        .orders-count-badge {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #f1ede6;
          color: var(--ink-600);
          width: fit-content;
        }
        .orders-count-badge.has-orders { background: #edf7ed; color: #1e4620; font-weight: 600; }
        .user-ltv { font-size: 13px; color: var(--maroon-900, #581e15); }

        .joined-date { font-size: 12px; color: var(--ink-500); }
        .muted-text { font-size: 12px; color: var(--ink-400, #9c8e88); font-style: italic; }

        /* Modal / Drawer */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 20px;
        }
        .user-detail-modal {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 680px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }
        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--stone-200);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 { margin: 0; font-size: 18px; color: var(--maroon-900); }
        .close-btn { background: none; border: none; cursor: pointer; color: var(--ink-500); }
        .modal-body { padding: 24px; }

        .detail-primary-box {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 16px 20px;
          background: #faf6f0;
          border-radius: 12px;
          border: 1px solid var(--stone-200);
          margin-bottom: 24px;
        }
        .detail-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--maroon-900);
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .detail-meta h2 { margin: 0 0 6px; font-size: 18px; }
        .detail-row-item { font-size: 12.5px; display: flex; gap: 8px; margin-bottom: 2px; }
        .detail-row-item span { color: var(--ink-500); }

        .detail-section { margin-top: 24px; }
        .detail-section h4 {
          font-size: 14px;
          margin: 0 0 12px;
          color: var(--maroon-900);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--stone-200);
          padding-bottom: 6px;
        }
        .address-cards-list { display: flex; flex-direction: column; gap: 10px; }
        .address-item-card {
          padding: 12px 16px;
          border: 1px solid #e8dec8;
          border-radius: 8px;
          background: #fffdf9;
        }
        .address-header { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px; }
        .address-lines { margin: 0; font-size: 12.5px; color: var(--ink-700); line-height: 1.5; }

        .orders-mini-table-wrap { overflow-x: auto; }
        .mini-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .mini-table th { background: #f7f3ee; padding: 8px 10px; text-align: left; }
        .mini-table td { padding: 10px; border-bottom: 1px solid #f0e9df; }
        .status-pill { font-size: 10px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; font-weight: 600; }
        .status-pill.paid { background: #e8f5e9; color: #2e7d32; }
        .status-pill.created, .status-pill.pending { background: #fff3e0; color: #e65100; }
        .status-pill.failed, .status-pill.cancelled { background: #ffebee; color: #c62828; }
        .btn-xs { padding: 4px 8px; font-size: 11px; }
      `}</style>
    </div>
  );
}
