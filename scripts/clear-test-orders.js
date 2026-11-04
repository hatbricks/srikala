#!/usr/bin/env node
/**
 * scripts/clear-test-orders.js
 *
 * Safely removes test / trial orders, line items, returns, refunds,
 * and coupon redemptions from the PostgreSQL database so the Master
 * Operations Dashboard metrics (Revenue, Order counts, etc.) reset
 * to a clean ₹0 state for production live launch.
 *
 * Usage:
 *   node scripts/clear-test-orders.js
 *   node scripts/clear-test-orders.js --include-bills  (also cleans offline store bills)
 */

import 'dotenv/config';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ Error: DATABASE_URL is not set in environment or .env.');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString,
  ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
});

const includeBills = process.argv.includes('--include-bills');

async function main() {
  console.log('========================================================');
  console.log('📦 Ravichandra Textiles — Test Data Cleanup');
  console.log('========================================================\n');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Refunds
    const refunds = await client.query('DELETE FROM refunds');
    console.log(`✓ Deleted ${refunds.rowCount} refunds`);

    // 2. Return requests
    const returns = await client.query('DELETE FROM return_requests');
    console.log(`✓ Deleted ${returns.rowCount} return requests`);

    // 3. Order items
    const items = await client.query('DELETE FROM order_items');
    console.log(`✓ Deleted ${items.rowCount} order items`);

    // 4. Coupon redemptions
    const redemptions = await client.query('DELETE FROM coupon_redemptions');
    console.log(`✓ Deleted ${redemptions.rowCount} coupon redemptions`);

    // 5. Orders
    const orders = await client.query('DELETE FROM orders');
    console.log(`✓ Deleted ${orders.rowCount} orders`);

    // 6. Optionally clear offline store bills
    if (includeBills) {
      const storeBills = await client.query('DELETE FROM store_bills');
      const gstBills = await client.query('DELETE FROM gst_bills');
      console.log(`✓ Deleted ${storeBills.rowCount} store bills and ${gstBills.rowCount} GST invoices`);
    }

    // 7. Reset auto-increment sequences so live orders start from ID 1
    await client.query("SELECT setval(pg_get_serial_sequence('orders', 'id'), 1, false)").catch(() => {});
    await client.query("SELECT setval(pg_get_serial_sequence('order_items', 'id'), 1, false)").catch(() => {});
    await client.query("SELECT setval(pg_get_serial_sequence('refunds', 'id'), 1, false)").catch(() => {});
    await client.query("SELECT setval(pg_get_serial_sequence('return_requests', 'id'), 1, false)").catch(() => {});

    // 8. Add audit log record
    await client.query(
      `INSERT INTO audit_logs (action, target_type, target_id, details)
       VALUES ('test_orders_cleared', 'database', 'all', $1)`,
      [JSON.stringify({ ordersDeleted: orders.rowCount, includeBills, timestamp: new Date().toISOString() })]
    ).catch(() => {});

    await client.query('COMMIT');

    console.log('\n========================================================');
    console.log('✅ Cleanup completed successfully!');
    console.log(`Orders removed:   ${orders.rowCount}`);
    console.log('Dashboard metrics: Clean ₹0 revenue / 0 orders');
    console.log('Storefront:        Ready for live orders');
    console.log('========================================================\n');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to clear test data:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
