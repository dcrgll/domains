import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    GOOGLE_ANALYTICS_ID: z.string().optional(),
    GOOGLE_SHEETS_PRIVATE_KEY: z.string(),
    GOOGLE_SHEETS_CLIENT_EMAIL: z.string(),
    SPREADSHEET_ID: z.string()
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID
  } /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
})
