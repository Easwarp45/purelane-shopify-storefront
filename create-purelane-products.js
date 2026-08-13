/**
 * Purelane — Create Products + Upload Images in one shot
 * Runs AFTER upload-product-images.js fails to find products.
 * Creates 10 Purelane products with real prices, descriptions,
 * tags and uploads the matching brand PNG as their featured image.
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const STORE_DOMAIN = 'purelane-mvp-test.myshopify.com';
const SHOPIFY_TOKEN = 'REVOKED_TOKEN_REMOVE_THIS_FILE';  // token removed for security
const API_VERSION   = '2024-01';
const ASSETS_DIR    = path.join(__dirname, 'assets');

// ─── Product Catalog ──────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    title:       'Foaming Kitchen Cleaner',
    handle:      'foaming-kitchen-cleaner',
    body_html:   '<p>A plant-powered foaming spray that cuts through grease, oil and burnt residue on gas stoves, countertops and chimney mesh. Safe around food surfaces. Zero sulphates, chlorine or synthetic fragrance.</p>',
    vendor:      'Purelane',
    product_type:'Kitchen',
    tags:        'kitchen, cleaner, plant-based, grease, foaming, badge:Best seller',
    price:       '200.00',
    compare_at:  '299.00',
    image_file:  'purelane-kitchen.png',
  },
  {
    title:       'Dishwash Gel',
    handle:      'dishwash-gel',
    body_html:   '<p>A thick coconut-derived dishwash gel that lifts grease and food residue with minimal effort. Leaves dishes squeaky clean without drying your hands. Biodegradable and safe for septic systems.</p>',
    vendor:      'Purelane',
    product_type:'Kitchen',
    tags:        'dish, dishwash, kitchen, plant-based, gentle, badge:Best seller',
    price:       '199.00',
    compare_at:  '299.00',
    image_file:  'purelane-dish.png',
  },
  {
    title:       'Tap & Limescale Remover',
    handle:      'tap-limescale-remover',
    body_html:   '<p>A targeted descaler that dissolves hard water deposits from taps, showerheads and bathroom tiles in minutes. No scrubbing needed. Leaves surfaces gleaming without toxic acid fumes.</p>',
    vendor:      'Purelane',
    product_type:'Bathroom',
    tags:        'tap, limescale, descaler, bathroom, hard-water, badge:Best seller',
    price:       '249.00',
    compare_at:  '349.00',
    image_file:  'purelane-tap.png',
  },
  {
    title:       'Laundry Detergent',
    handle:      'laundry-detergent',
    body_html:   '<p>A plant-derived laundry liquid that removes tough stains and odours while being gentle on fabric. Works in cold and warm water. No SLS, phosphates or synthetic brighteners — safe for baby clothes.</p>',
    vendor:      'Purelane',
    product_type:'Laundry',
    tags:        'laundry, detergent, plant-based, stain-removal, fabric-safe, badge:Best seller',
    price:       '299.00',
    compare_at:  '449.00',
    image_file:  'purelane-laundry.png',
  },
  {
    title:       'Fabric Conditioner',
    handle:      'fabric-conditioner',
    body_html:   '<p>A plant-based fabric conditioner that softens fibres and leaves laundry with a light, natural fragrance. Free from synthetic musks and parabens. Works with all fabric types including wool and silk.</p>',
    vendor:      'Purelane',
    product_type:'Laundry',
    tags:        'laundry, conditioner, softener, fabric, plant-based',
    price:       '249.00',
    compare_at:  '349.00',
    image_file:  'purelane-conditioner.png',
  },
  {
    title:       'Washing Machine Cleaner',
    handle:      'washing-machine-cleaner',
    body_html:   '<p>A deep-clean powder that removes limescale, mould and detergent buildup from your washing machine drum and seals. Extends machine life and eliminates musty odours. One sachet per month is all you need.</p>',
    vendor:      'Purelane',
    product_type:'Laundry',
    tags:        'washing-machine, machine-cleaner, laundry, descaler, badge:Best seller',
    price:       '229.00',
    compare_at:  '349.00',
    image_file:  'purelane-wm.png',
  },
  {
    title:       'Toilet Cleaner',
    handle:      'toilet-cleaner',
    body_html:   '<p>A thick-gel toilet cleaner that clings to the bowl and kills 99.9% of germs. Plant-derived actives replace chlorine without compromising on disinfection. Safe for septic tanks and grey water systems.</p>',
    vendor:      'Purelane',
    product_type:'Bathroom',
    tags:        'toilet, cleaner, disinfectant, bathroom, germ-kill, badge:Best seller',
    price:       '149.00',
    compare_at:  '249.00',
    image_file:  'purelane-toilet.png',
  },
  {
    title:       'Floor Cleaner',
    handle:      'floor-cleaner',
    body_html:   '<p>A neem and lemongrass-powered floor cleaner that cleans, deodorises and leaves a natural sheen on all hard flooring types. Pet-safe and child-safe once dry. No bleach, ammonia or synthetic perfumes.</p>',
    vendor:      'Purelane',
    product_type:'Floor Care',
    tags:        'floor, cleaner, neem, pet-safe, plant-based',
    price:       '179.00',
    compare_at:  '279.00',
    image_file:  'purelane-floor.png',
  },
  {
    title:       'Hand Wash',
    handle:      'hand-wash',
    body_html:   '<p>A gentle foaming hand wash with coconut-derived cleansers and aloe vera. Cleans effectively without stripping natural moisture. No SLS, no parabens, no synthetic fragrance — safe for the whole family.</p>',
    vendor:      'Purelane',
    product_type:'Personal Care',
    tags:        'hand-wash, soap, personal-care, gentle, plant-based',
    price:       '189.00',
    compare_at:  '279.00',
    image_file:  'purelane-handwash.png',
  },
  {
    title:       'Magic Eraser Scrub Pad',
    handle:      'magic-eraser-scrub-pad',
    body_html:   '<p>A reusable micro-abrasive scrub pad that removes stubborn stains, burnt residue and limescale marks without any chemical. Works on pots, tiles, bathroom fixtures and more. Just add water.</p>',
    vendor:      'Purelane',
    product_type:'Accessories',
    tags:        'eraser, scrub, accessories, no-chemical, reusable',
    price:       '149.00',
    compare_at:  '249.00',
    image_file:  'purelane-eraser.png',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shopifyRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: STORE_DOMAIN,
      path:     `/admin/api/${API_VERSION}${endpoint}`,
      method,
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_TOKEN,
        'Content-Type':           'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function toBase64(file) {
  const p = path.join(ASSETS_DIR, file);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p).toString('base64');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('\n🌿 Purelane — Create Products & Upload Images');
  console.log('─────────────────────────────────────────────\n');

  // Fetch existing products so we don't duplicate
  const { body: existing } = await shopifyRequest('GET', '/products.json?limit=250&fields=id,title,handle', null);
  const existingHandles = new Set((existing.products || []).map((p) => p.handle));
  console.log(`📦 ${existingHandles.size} existing products found.\n`);

  let created = 0;
  let skipped = 0;
  let errors  = 0;

  for (const prod of PRODUCTS) {
    if (existingHandles.has(prod.handle)) {
      console.log(`⏭  Exists   "${prod.title}"`);
      skipped++;
      continue;
    }

    const b64 = toBase64(prod.image_file);
    if (!b64) {
      console.log(`⚠️  Missing asset: ${prod.image_file} — creating product without image`);
    }

    const productPayload = {
      product: {
        title:        prod.title,
        handle:       prod.handle,
        body_html:    prod.body_html,
        vendor:       prod.vendor,
        product_type: prod.product_type,
        tags:         prod.tags,
        status:       'active',
        variants: [{
          price:            prod.price,
          compare_at_price: prod.compare_at,
          inventory_management: null,
          fulfillment_service:  'manual',
          requires_shipping:    true,
        }],
        ...(b64 ? {
          images: [{
            attachment: b64,
            filename:   prod.image_file,
          }]
        } : {}),
      },
    };

    console.log(`⬆️  Creating  "${prod.title}" ...`);
    const { status, body } = await shopifyRequest('POST', '/products.json', productPayload);

    if (status === 201 || status === 200) {
      const newProd = body.product;
      console.log(`   ✅ Created  ID:${newProd.id}  Price:₹${prod.price}  Images:${newProd.images?.length || 0}`);
      created++;
    } else {
      console.error(`   ❌ Failed (HTTP ${status}): ${JSON.stringify(body.errors || body)}`);
      errors++;
    }

    await sleep(700); // Respect Shopify rate limits
  }

  console.log('\n─────────────────────────────────────────────');
  console.log(`✅ Created  : ${created} products`);
  console.log(`⏭  Skipped  : ${skipped} products (already exist)`);
  console.log(`❌ Errors   : ${errors} products`);
  console.log('\n🎉 Done! Your Purelane products are now live on Shopify.\n');
  console.log('   👉 Check: https://admin.shopify.com/store/purelane-mvp-test/products\n');
}

run().catch((err) => {
  console.error('\n❌ Unexpected error:', err.message);
  process.exit(1);
});
