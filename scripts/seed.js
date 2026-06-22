const { Client } = require('pg');
const client = new Client({
  host: 'db.whxqnlocjxzaibaavkep.supabase.co', port: 5432,
  user: 'postgres', password: 'zEHl3Tmfxw4R1DwM',
  ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 15000,
});

const products = [
  { name: 'Portable Power Station 500W', description: 'Keep your devices running during load shedding with this high-capacity portable power station. 500W continuous output, pure sine wave inverter.', category: 'Power & Energy', price_usd: 189.99, commission_rate: 0.12, stock: 50 },
  { name: 'LED Rechargeable Camping Lantern', description: 'Professional-grade LED camping lantern with adjustable brightness up to 1000 lumens. Collapsible design, USB-C charging, 10hr runtime.', category: 'Power & Energy', price_usd: 24.99, commission_rate: 0.15, stock: 200 },
  { name: 'Premium Sportswear Set', description: 'High-performance athletic wear set. Moisture-wicking fabric, 4-way stretch, anti-odor treatment.', category: 'Fashion & Apparel', price_usd: 45.99, commission_rate: 0.15, stock: 100 },
  { name: 'Wireless Bluetooth Earbuds Pro', description: 'Premium true wireless earbuds with active noise cancellation. 30hr battery, IPX5 water resistance.', category: 'Electronics', price_usd: 39.99, commission_rate: 0.10, stock: 150 },
  { name: 'Solar LED Flood Light 200W', description: 'Powerful solar-powered LED flood light for outdoor security. Motion sensor, remote control, weatherproof.', category: 'Power & Energy', price_usd: 59.99, commission_rate: 0.12, stock: 80 },
  { name: 'Casual Streetwear Hoodie', description: 'Premium heavyweight hoodie, 350gsm cotton blend. Modern oversized fit, available in 6 colors.', category: 'Fashion & Apparel', price_usd: 34.99, commission_rate: 0.18, stock: 120 },
];

async function seed() {
  await client.connect();
  console.log('Connected. Seeding products...');
  for (const p of products) {
    const { rows } = await client.query(
      `INSERT INTO products (name, description, category, price_usd, commission_rate, stock, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'active') RETURNING id`,
      [p.name, p.description, p.category, p.price_usd, p.commission_rate, p.stock]
    );
    console.log(`✅ ${p.name}`);
  }
  await client.end();
  console.log('\nSeed complete!');
}
seed().catch(e => { console.error('Error:', e.message); process.exit(1); });
