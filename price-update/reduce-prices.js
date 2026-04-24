/**
 * Reduce All Property Prices by a Fixed Percentage
 *
 * Formula: newPrice = oldPrice * MULTIPLIER (default 0.80 = 20% off)
 *
 * Usage:
 *   1. Set MONGODB_URI in a .env file at the project root (see .env.example)
 *   2. node reduce-prices.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { MongoClient } = require('mongodb');

// ============== CONFIGURATION ==============
const MONGODB_URI = process.env.MONGODB_URI;
const COLLECTION_NAME = process.env.PROPERTIES_COLLECTION || 'properties';
const MULTIPLIER = Number(process.env.PRICE_MULTIPLIER || 0.80);
// ============================================

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Add it to your .env file.');
  process.exit(1);
}

async function reducePrices() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ MongoDB connected successfully!\n');
    
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);
    
    // Get count of properties with prices
    const countBefore = await collection.countDocuments({
      $or: [
        { rentMin: { $gt: 0 } },
        { rentMax: { $gt: 0 } }
      ]
    });
    
    console.log(`📄 Properties with prices: ${countBefore}\n`);
    console.log('🔄 Reducing all prices by 20%...\n');
    
    // Update rentMin (reduce by 20%)
    const resultMin = await collection.updateMany(
      { rentMin: { $gt: 0 } },
      [
        { $set: { rentMin: { $round: [{ $multiply: ["$rentMin", MULTIPLIER] }, 0] } } }
      ]
    );
    
    // Update rentMax (reduce by 20%)
    const resultMax = await collection.updateMany(
      { rentMax: { $gt: 0 } },
      [
        { $set: { rentMax: { $round: [{ $multiply: ["$rentMax", MULTIPLIER] }, 0] } } }
      ]
    );
    
    console.log('========================================');
    console.log('✅ PRICES REDUCED BY 20%!');
    console.log('========================================');
    console.log(`📊 rentMin updated:  ${resultMin.modifiedCount} properties`);
    console.log(`📊 rentMax updated:  ${resultMax.modifiedCount} properties`);
    console.log('========================================\n');
    
    // Show example
    console.log('📋 Example (Before → After):');
    console.log('   $1000 → $800');
    console.log('   $1500 → $1200');
    console.log('   $2000 → $1600\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('📤 MongoDB connection closed.');
  }
}

// Run the script
reducePrices();