#!/usr/bin/env node
// Verschlüsselt sensible Dateien mit AES-256-GCM
// Verwendung: node scripts/encrypt.js

import { createCipheriv, randomBytes, scryptSync } from 'node:crypto';
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
  console.error('Erstelle die Datei mit: echo "OBFUSCATION_KEY=dein-geheimer-schluessel" > .env.obfuscation');
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

let encrypted = 0;
let skipped = 0;

for (const relativePath of sensitiveFiles) {
  const filePath = join(projectRoot, relativePath);
  const encryptedPath = filePath + '.enc';

  if (!existsSync(filePath)) {
    console.log(`Übersprungen (nicht vorhanden): ${relativePath}`);
    skipped++;
    continue;
  }

  const plaintext = readFileSync(filePath);

  // Zufällige IV für jede Datei
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  const encryptedContent = Buffer.concat([
    cipher.update(plaintext),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  // Format: IV (16 bytes) + AuthTag (16 bytes) + Encrypted Content
  const output = Buffer.concat([iv, authTag, encryptedContent]);

  writeFileSync(encryptedPath, output);
  console.log(`Verschlüsselt: ${relativePath}`);
  encrypted++;
}

console.log(`\nFertig: ${encrypted} Dateien verschlüsselt, ${skipped} übersprungen.`);
