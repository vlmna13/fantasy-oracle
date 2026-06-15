import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export function getAdminAuth() {
  if (getApps().length === 0) {
    const encoded = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!encoded) throw new Error('FIREBASE_SERVICE_ACCOUNT is not set');
    const serviceAccount = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getAuth();
}
