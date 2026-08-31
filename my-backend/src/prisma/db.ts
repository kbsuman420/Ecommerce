import { getEnv } from "../config/env.js";
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };


const env = getEnv();
console.log(env.DATABASE_URL)

export const db = postgres<Contract>({
  contractJson,
  url: env.DATABASE_URL,
});
