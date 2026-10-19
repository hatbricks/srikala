import { pool } from '../db.js';
import { saveImageToDisk, saveImagesArrayToDisk, ensureUploadDirs } from '../lib/storage.js';

async function migrate() {
  console.log('🚀 Starting base64 to disk image migration...');
  ensureUploadDirs();

  let productsUpdated = 0;
  let variantsUpdated = 0;
  let categoriesUpdated = 0;

  // 1. Migrate products
  const { rows: products } = await pool.query('SELECT id, image, hover_image, images FROM products');
  console.log(`Found ${products.length} products to check...`);

  for (const p of products) {
    let changed = false;
    let newImage = p.image;
    let newHover = p.hover_image;
    let newImages = p.images;

    if (p.image && p.image.startsWith('data:image')) {
      newImage = await saveImageToDisk(p.image, 'products');
      changed = true;
    }
    if (p.hover_image && p.hover_image.startsWith('data:image')) {
      newHover = await saveImageToDisk(p.hover_image, 'products');
      changed = true;
    }
    if (Array.isArray(p.images) && p.images.some(img => typeof img === 'string' && img.startsWith('data:image'))) {
      newImages = await saveImagesArrayToDisk(p.images, 'products');
      changed = true;
    }

    if (changed) {
      await pool.query(
        'UPDATE products SET image = $1, hover_image = $2, images = $3::jsonb WHERE id = $4',
        [newImage, newHover, JSON.stringify(newImages), p.id]
      );
      productsUpdated++;
      console.log(`  ✓ Migrated product: ${p.id}`);
    }
  }

  // 2. Migrate product variants
  const { rows: variants } = await pool.query('SELECT id, product_id, hover_image, images FROM product_variants');
  console.log(`Found ${variants.length} variants to check...`);

  for (const v of variants) {
    let changed = false;
    let newHover = v.hover_image;
    let newImages = v.images;

    if (v.hover_image && v.hover_image.startsWith('data:image')) {
      newHover = await saveImageToDisk(v.hover_image, 'products');
      changed = true;
    }
    if (Array.isArray(v.images) && v.images.some(img => typeof img === 'string' && img.startsWith('data:image'))) {
      newImages = await saveImagesArrayToDisk(v.images, 'products');
      changed = true;
    }

    if (changed) {
      await pool.query(
        'UPDATE product_variants SET hover_image = $1, images = $2::jsonb WHERE id = $3',
        [newHover, JSON.stringify(newImages), v.id]
      );
      variantsUpdated++;
      console.log(`  ✓ Migrated variant: ${v.id} of product ${v.product_id}`);
    }
  }

  // 3. Migrate categories
  const { rows: categories } = await pool.query('SELECT id, image FROM categories');
  console.log(`Found ${categories.length} categories to check...`);

  for (const c of categories) {
    if (c.image && c.image.startsWith('data:image')) {
      const newImage = await saveImageToDisk(c.image, 'categories', 1200, 80);
      await pool.query('UPDATE categories SET image = $1 WHERE id = $2', [newImage, c.id]);
      categoriesUpdated++;
      console.log(`  ✓ Migrated category: ${c.id}`);
    }
  }

  console.log('\n==========================================');
  console.log('✅ Migration completed successfully!');
  console.log(`Products updated:   ${productsUpdated}`);
  console.log(`Variants updated:   ${variantsUpdated}`);
  console.log(`Categories updated: ${categoriesUpdated}`);
  console.log('==========================================\n');

  await pool.end();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
