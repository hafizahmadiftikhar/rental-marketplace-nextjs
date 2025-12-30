/**
 * Reduce All Property Prices by 20%
 * 
 * Yeh script saari properties ki rentMin aur rentMax 20% kam karega
 * 
 * Formula: newPrice = oldPrice * 0.80
 * 
 * Usage:
 * 1. Connection string update karo
 * 2. node reduce-prices.js
 */

const { MongoClient } = require('mongodb');

// ============== CONFIGURATION ==============
// 👇 Apna MongoDB connection string yahan daal
const MONGODB_URI = 'mongodb+srv://abdullahsana691_db_user:abdullahsana691@cluster0.cqsas.mongodb.net/haha';


// 👇 Collection name
const COLLECTION_NAME = 'properties';

// 👇 Discount percentage (20% off = multiply by 0.80)
const MULTIPLIER = 0.80;
// ============================================

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