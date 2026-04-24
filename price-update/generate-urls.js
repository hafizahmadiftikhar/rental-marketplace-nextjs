/**
 * Property URLs Generator
 *
 * Reads every property document from MongoDB and writes the canonical
 * detail-page URLs to a text file (used by external indexing / sharing tools).
 *
 * Usage:
 *   1. Set MONGODB_URI in a .env file at the project root (see .env.example)
 *   2. node generate-urls.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { MongoClient } = require('mongodb');
const fs = require('fs');

// ============== CONFIGURATION ==============
const MONGODB_URI = process.env.MONGODB_URI;
const COLLECTION_NAME = process.env.PROPERTIES_COLLECTION || 'properties';
const BASE_URL = process.env.PROPERTY_BASE_URL || 'https://rivo.rent/details/';
const OUTPUT_FILE = 'property-urls.txt';
// ============================================

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Add it to your .env file.');
  process.exit(1);
}

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