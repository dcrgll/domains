import { google } from 'googleapis'

import { env } from '@/env'
import { Domains } from '@/types/domains'

export async function getGoogleSheetData() {
  try {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes
    )

    const sheets = google.sheets({ version: 'v4', auth: jwt })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: env.SPREADSHEET_ID,
      range: 'A2:A'
    })

    const values = response.data.values

    if (Array.isArray(values)) {
      return handleSpreadSheetApiResponse(values)?.sort()
    } else {
      console.log('No data found in the spreadsheet.')
    }
  } catch (err) {
    console.log(err)
  }

  return []
}

const handleSpreadSheetApiResponse = (
  googleSheetRows: any[]
): Domains | null => {
  if (googleSheetRows) {
    return googleSheetRows.slice(1).map((item) => item[0])
  }
  return null
}
