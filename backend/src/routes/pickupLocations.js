import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { getShiprocketPickupLocations } from '../lib/shiprocket.js';

const router = Router();

// GET /api/pickup-locations
router.get('/', requireAdmin, async (_req, res) => {
  const { rows } = await query('SELECT * FROM pickup_locations ORDER BY is_default DESC, created_at ASC');
  res.json({ pickupLocations: rows });
});

// POST /api/pickup-locations
router.post('/', requireAdmin, async (req, res) => {
  const { nickname, address, city, state, pincode, phone, isDefault } = req.body || {};

  if (!nickname || !address || !city || !state || !pincode || !phone) {
    return res.status(400).json({ error: 'All pickup location fields are required.' });
  }

  if (isDefault) {
    await query('UPDATE pickup_locations SET is_default = FALSE');
  }

  const { rows } = await query(
    `INSERT INTO pickup_locations (nickname, address, city, state, pincode, phone, is_default)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [nickname.trim(), address.trim(), city.trim(), state.trim(), pincode.trim(), phone.trim(), Boolean(isDefault)]
  );

  res.status(201).json({ pickupLocation: rows[0] });
});

// PUT /api/pickup-locations/:id/default
router.put('/:id/default', requireAdmin, async (req, res) => {
  await query('UPDATE pickup_locations SET is_default = FALSE');
  const { rows } = await query(
    'UPDATE pickup_locations SET is_default = TRUE WHERE id = $1 RETURNING *',
    [req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Pickup location not found.' });
  res.json({ pickupLocation: rows[0] });
});

// DELETE /api/pickup-locations/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const { rows } = await query('SELECT is_default FROM pickup_locations WHERE id = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Pickup location not found.' });
  if (rows[0].is_default) {
    return res.status(400).json({ error: 'Cannot delete the default pickup location. Set another location as default first.' });
  }

  await query('DELETE FROM pickup_locations WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

// POST /api/pickup-locations/sync (pull from Shiprocket)
router.post('/sync', requireAdmin, async (_req, res) => {
  const remote = await getShiprocketPickupLocations();
  if (!remote || !remote.length) {
    return res.status(400).json({ error: 'No pickup locations found in your Shiprocket account or credentials not set.' });
  }

  let importedCount = 0;
  for (const loc of remote) {
    const nickname = loc.pickup_location || loc.name;
    const address = loc.address || loc.address_2 || '';
    const city = loc.city;
    const state = loc.state;
    const pincode = String(loc.pin_code || loc.pincode);
    const phone = String(loc.phone || '');

    const { rows: existing } = await query('SELECT id FROM pickup_locations WHERE nickname = $1', [nickname]);
    if (!existing.length) {
      await query(
        `INSERT INTO pickup_locations (nickname, address, city, state, pincode, phone, is_default)
         VALUES ($1, $2, $3, $4, $5, $6, FALSE)`,
        [nickname, address, city, state, pincode, phone]
      );
      importedCount++;
    }
  }

  const { rows: all } = await query('SELECT * FROM pickup_locations ORDER BY is_default DESC, created_at ASC');
  res.json({ message: `Synced ${importedCount} new locations from Shiprocket.`, pickupLocations: all });
});

export default router;
