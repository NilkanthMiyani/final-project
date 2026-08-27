/**
 * Generates the value for ADMIN_PASSWORD_HASH.
 *
 *   npx tsx scripts/hash-password.ts 'your-password-here'
 *
 * Copy the printed `salt:hash` into .env.local and the Vercel environment.
 * The plaintext password is never stored anywhere.
 */
import { hashPassword } from '../lib/auth-node';

async function main(): Promise<void> {
  const password = process.argv[2];

  if (!password) {
    console.error("Usage: npx tsx scripts/hash-password.ts 'your-password'");
    process.exit(1);
  }

  if (password.length < 10) {
    console.error('Use at least 10 characters — this is the only lock on /admin.');
    process.exit(1);
  }

  console.log('\nADMIN_PASSWORD_HASH=' + (await hashPassword(password)) + '\n');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
