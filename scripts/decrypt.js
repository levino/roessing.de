#!/usr/bin/env node
// Entschlüsselt sensible Dateien mit AES-256-GCM
// Verwendung: node scripts/decrypt.js

import { createDecipheriv, scryptSync } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sensitiveFiles } from './sensitive-files.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Lade Passwort aus .env.obfuscation
const envPath = join(projectRoot, '.env.obfuscation');
if (!existsSync(envPath)) {
  console.error('Fehler: .env.obfuscation nicht gefunden!');
  process.exit(1);
}

const envContent = readFileSync(envPath, 'utf-8');
const keyMatch = envContent.match(/OBFUSCATION_KEY=(.+)/);
if (!keyMatch) {
  console.error('Fehler: OBFUSCATION_KEY nicht in .env.obfuscation gefunden!');
  process.exit(1);
}

const password = keyMatch[1].trim();
const key = scryptSync(password, 'roessing-salt', 32);

let decrypted = 0;
let skipped = 0;

for (const relativePath of sensitiveFiles) {
  const filePath = join(projectRoot, relativePath);
  const encryptedPath = filePath + '.enc';

  if (!existsSync(encryptedPath)) {
    console.log(`Übersprungen (keine .enc-Datei): ${relativePath}`);
    skipped++;
    continue;
  }

  // Überspringe, wenn die entschlüsselte Datei bereits existiert
  if (existsSync(filePath)) {
    console.log(`Übersprungen (bereits vorhanden): ${relativePath}`);
    skipped++;
    continue;
  }

  const encryptedData = readFileSync(encryptedPath);

  // Format: IV (16 bytes) + AuthTag (16 bytes) + Encrypted Content
  const iv = encryptedData.subarray(0, 16);
  const authTag = encryptedData.subarray(16, 32);
  const encryptedContent = encryptedData.subarray(32);

  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  try {
    const plaintext = Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final()
    ]);

    writeFileSync(filePath, plaintext);
    console.log(`Entschlüsselt: ${relativePath}`);
    decrypted++;
  } catch (error) {
    console.error(`Fehler bei ${relativePath}: ${error.message}`);
  }
}

console.log(`\nFertig: ${decrypted} Dateien entschlüsselt, ${skipped} übersprungen.`);
