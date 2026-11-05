#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamically import the backend script which resolves all backend node_modules
await import(resolve(__dirname, '../backend/src/scripts/clear-test-orders.js'));
