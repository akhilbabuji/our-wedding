#!/usr/bin/env node
/**
 * Export all RSVP submissions from Firestore to a CSV file.
 *
 * Usage:
 *   npm run export:rsvp
 *
 * Output:
 *   rsvp-export.csv  (created in the project root)
 *
 * Requirements:
 *   A Firebase service account key is needed for the Admin SDK.
 *   Download it from:
 *     Firebase Console → Project Settings → Service Accounts → Generate new private key
 *   Save the file as: service-account.json  (in the project root)
 *   ⚠️  Never commit service-account.json to git.
 */

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, '..', 'service-account.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'rsvp-export.csv');

// ── Bootstrap ────────────────────────────────────────────────────────────────

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('\n❌  service-account.json not found.');
  console.error('   Download it from:');
  console.error('   Firebase Console → Project Settings → Service Accounts → Generate new private key');
  console.error(`   Save as: ${SERVICE_ACCOUNT_PATH}\n`);
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert(require(SERVICE_ACCOUNT_PATH)) });
}

const db = getFirestore();

// ── CSV helpers ──────────────────────────────────────────────────────────────

const COLUMNS = [
  'submittedAt',
  'guestName',
  'attendance',
  'plusOnes',
  'dietaryRestrictions',
  'message',
  'guestSlug',
];

function escapeCsv(value) {
  if (value === undefined || value === null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function rowToCsv(doc) {
  return COLUMNS.map((col) => escapeCsv(doc[col])).join(',');
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n📋  Fetching RSVPs from Firestore...');

  const snapshot = await db.collection('rsvps').orderBy('submittedAt', 'asc').get();

  if (snapshot.empty) {
    console.log('   No RSVP documents found.');
    process.exit(0);
  }

  const header = COLUMNS.join(',');
  const rows = snapshot.docs.map((d) => rowToCsv(d.data()));
  const csv = [header, ...rows].join('\n');

  fs.writeFileSync(OUTPUT_PATH, csv, 'utf8');

  console.log(`✅  ${snapshot.size} RSVP(s) exported to: ${OUTPUT_PATH}`);
  console.log('\n   Summary:');

  const attending = snapshot.docs.filter((d) => d.data().attendance === 'attending').length;
  const declining = snapshot.docs.filter((d) => d.data().attendance === 'declining').length;
  const totalGuests = snapshot.docs
    .filter((d) => d.data().attendance === 'attending')
    .reduce((sum, d) => sum + 1 + (Number(d.data().plusOnes) || 0), 0);

  console.log(`   Attending : ${attending}`);
  console.log(`   Declining : ${declining}`);
  console.log(`   Total guests (incl. plus-ones) : ${totalGuests}\n`);
}

main().catch((err) => {
  console.error('❌  Export failed:', err.message);
  process.exit(1);
});
