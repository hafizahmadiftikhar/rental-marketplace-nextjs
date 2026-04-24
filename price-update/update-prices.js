/**
 * Bulk Price Update from CSV
 *
 * Reads a CSV file with `_id`, `rentMin`, `rentMax` columns and
 * applies the new prices to each matching property document.
 *
 * Usage:
 *   1. npm install
 *   2. Set MONGODB_URI in a .env file at the project root (see .env.example)
 *   3. Place your CSV next to this script (default: missing.csv)
 *   4. node update-prices.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');

// ============== CONFIGURATION ==============
const MONGODB_URI = process.env.MONGODB_URI;
const COLLECTION_NAME = process.env.PROPERTIES_COLLECTION || 'properties';
const CSV_FILE = process.env.CSV_FILE || './missing.csv';
// ============================================

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Add it to your .env file.');
  process.exit(1);
}

async function updatePrices() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ MongoDB connected successfully!\n');
    
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);
    
    // Read CSV and collect all records
    const records = [];
    
    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (row) => {
          // Only process rows that have _id and prices
          if (row._id && (row.rentMin || row.rentMax)) {
            records.push({
              _id: row._id,
              rentMin: row.rentMin ? parseFloat(row.rentMin) : null,
              rentMax: row.rentMax ? parseFloat(row.rentMax) : null,
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });
    
    console.log(`📄 CSV loaded: ${records.length} properties with prices found\n`);
    
    // Update stats
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    
    // Process each record
    console.log('🔄 Updating prices...\n');
    
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      
      try {
        // Build update object
        const updateObj = {};
        
        if (record.rentMin && !isNaN(record.rentMin)) {
          updateObj.rentMin = record.rentMin;
        }
        if (record.rentMax && !isNaN(record.rentMax)) {
          updateObj.rentMax = record.rentMax;
        }
        
        // Skip if no valid prices
        if (Object.keys(updateObj).length === 0) {
          skipped++;
          continue;
        }
        
        // Update in MongoDB
        const result = await collection.updateOne(
          { _id: new ObjectId(record._id) },
          { $set: updateObj }
        );
        
        if (result.matchedCount > 0) {
          updated++;
        } else {
          skipped++;
        }
        
        // Progress log every 500 records
        if ((i + 1) % 500 === 0) {
          console.log(`   Progress: ${i + 1}/${records.length} processed...`);
        }
        
      } catch (err) {
        errors++;
        // console.error(`Error updating ${record._id}:`, err.message);
      }
    }
    
    // Final summary
    console.log('\n========================================');
    console.log('✅ UPDATE COMPLETE!');
    console.log('========================================');
    console.log(`📊 Total in CSV:    ${records.length}`);
    console.log(`✅ Updated:         ${updated}`);
    console.log(`⏭️  Skipped:         ${skipped}`);
    console.log(`❌ Errors:          ${errors}`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('📤 MongoDB connection closed.');
  }
}

// Run the script
updatePrices();