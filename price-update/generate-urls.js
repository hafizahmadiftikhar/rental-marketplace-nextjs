/**
 * Property URLs Generator for Facebook Bot
 * 
 * Yeh script MongoDB se saari property IDs nikaal ke URLs generate karega
 * 
 * Usage:
 * 1. Connection string update karo
 * 2. node generate-urls.js
 * 3. property-urls.txt file generate ho jayegi
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');

// ============== CONFIGURATION ==============
// 👇 Apna MongoDB connection string yahan daal
const MONGODB_URI = 'mongodb+srv://abdullahsana691_db_user:abdullahsana691@cluster0.cqsas.mongodb.net/haha';

// 👇 Collection name
const COLLECTION_NAME = 'properties';

// 👇 Domain URL
const BASE_URL = 'https://rivo.rent/details/';

// 👇 Output file name
const OUTPUT_FILE = 'property-urls.txt';
// ============================================

async function generateUrls() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ MongoDB connected successfully!\n');
    
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);
    
    // Get all property IDs
    console.log('🔄 Fetching all properties...\n');
    
    const properties = await collection.find({}, { projection: { _id: 1 } }).toArray();
    
    console.log(`📄 Total properties found: ${properties.length}\n`);
    
    // Generate URLs
    const urls = properties.map(prop => `${BASE_URL}${prop._id}`);
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, urls.join('\n'));
    
    console.log('========================================');
    console.log('✅ URLs GENERATED SUCCESSFULLY!');
    console.log('========================================');
    console.log(`📊 Total URLs:      ${urls.length}`);
    console.log(`📁 Output file:     ${OUTPUT_FILE}`);
    console.log('========================================\n');
    
    // Show first 5 URLs as preview
    console.log('📋 Preview (first 5 URLs):');
    urls.slice(0, 5).forEach(url => console.log(`   ${url}`));
    console.log('   ...\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('📤 MongoDB connection closed.');
  }
}

// Run the script
generateUrls();