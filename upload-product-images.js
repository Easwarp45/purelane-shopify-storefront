/**
 * Purelane — Shopify Product Image Uploader
 * 
 * This script reads your local brand PNG files, matches them to products
 * in your Shopify store by title/handle keywords, and uploads the PNG
 * as the featured product image via the Shopify Admin REST API.
 *
 * HOW TO RUN:
 *   1. Fill in your SHOPIFY_TOKEN below
 *   2. Open a terminal in this folder
 *   3. Run:  node upload-product-images.js
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── CONFIG — fill these in ───────────────────────────────────────────────────
const STORE_DOMAIN = 'purelane-mvp-test.myshopify.com';
const SHOPIFY_TOKEN = 'REVOKED_TOKEN_REMOVE_THIS_FILE';  // token removed for security
const API_VERSION   = '2024-01';
// ──────────────────────────────────────────────────────────────────────────────

const ASSETS_DIR = path.join(__dirname, 'assets');

// Map: keyword to match in product title/handle → asset filename
const IMAGE_MAP = [
  { keywords: ['kitchen'],                           file: 'purelane-kitchen.png'     },
  { keywords: ['dish', 'dishwash'],                  file: 'purelane-dish.png'        },
  { keywords: ['tap', 'limescale', 'descal'],        file: 'purelane-tap.png'         },
  { keywords: ['laundry', 'detergent'],              file: 'purelane-laundry.png'     },
  { keywords: ['toilet'],                            file: 'purelane-toilet.png'      },
  { keywords: ['floor'],                             file: 'purelane-floor.png'       },
  { keywords: ['hand', 'handwash'],                  file: 'purelane-handwash.png'    },
  { keywords: ['washing', 'machine', 'wm'],          file: 'purelane-wm.png'          },
  { keywords: ['conditioner', 'fabric'],             file: 'purelane-conditioner.png' },
  { keywords: ['eraser', 'scrub'],                   file: 'purelane-eraser.png'      },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shopifyRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: STORE_DOMAIN,
      path: `/admin/api/${API_VERSION}${endpoint}`,
      method,
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_TOKEN,
        'Content-Type': 'application/json',
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function matchFile(product) {
  const haystack = `${product.title} ${product.handle}`.toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keywords.some((kw) => haystack.includes(kw))) {
      return entry.file;
    }
  }
  return null;
}

function toBase64(filePath) {
  return fs.readFileSync(filePath).toString('base64');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  if (SHOPIFY_TOKEN === 'YOUR_ADMIN_API_TOKEN_HERE') {
    console.error('\n❌ ERROR: Please set SHOPIFY_TOKEN in this file before running.\n');
    process.exit(1);
  }

  console.log('\n🌿 Purelane — Shopify Product Image Uploader');
  console.log('────────────────────────────────────────────');
  console.log(`Store : ${STORE_DOMAIN}`);
  console.log(`Assets: ${ASSETS_DIR}\n`);

  // 1. Fetch all products
  console.log('📦 Fetching products from Shopify...');
  const { body: productsData } = await shopifyRequest('GET', '/products.json?limit=250', null);

  if (!productsData.products) {
    console.error('❌ Could not fetch products. Check your token and store domain.');
    console.error(JSON.stringify(productsData, null, 2));
    process.exit(1);
  }

  const products = productsData.products;
  console.log(`   Found ${products.length} products.\n`);

  let uploaded = 0;
  let skipped  = 0;
  let errors   = 0;

  // 2. Match & upload
  for (const product of products) {
    const fileName = matchFile(product);

    if (!fileName) {
      console.log(`⏭  Skipped  "${product.title}" — no matching asset`);
      skipped++;
      continue;
    }

    const filePath = path.join(ASSETS_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Missing  "${product.title}" — file not found: ${fileName}`);
      errors++;
      continue;
    }

    // Check if the product already has a real image
    const hasImage = product.images && product.images.length > 0
      && !product.images[0].src.includes('no-image');

    if (hasImage) {
      console.log(`✅ Already  "${product.title}" — image exists, skipping`);
      skipped++;
      continue;
    }

    console.log(`⬆️  Uploading "${product.title}" ← ${fileName} ...`);
    const base64 = toBase64(filePath);

    const { status, body } = await shopifyRequest(
      'POST',
      `/products/${product.id}/images.json`,
      { image: { attachment: base64, filename: fileName } }
    );

    if (status === 200 || status === 201) {
      console.log(`   ✅ Done! Image ID: ${body.image?.id}`);
      uploaded++;
    } else {
      console.error(`   ❌ Failed (HTTP ${status}): ${JSON.stringify(body)}`);
      errors++;
    }

    // Respect Shopify rate limits (2 req/s)
    await sleep(600);
  }

  // 3. Summary
  console.log('\n────────────────────────────────────────────');
  console.log(`✅ Uploaded : ${uploaded} products`);
  console.log(`⏭  Skipped  : ${skipped} products`);
  console.log(`❌ Errors   : ${errors} products`);
  console.log('\n🎉 Done! Refresh your Shopify storefront to see images.\n');
}

run().catch((err) => {
  console.error('\n❌ Unexpected error:', err.message);
  process.exit(1);
});
