import { Speaker } from "lucide-react";

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZpA2sqZZNoFz37dnOZy3VC-tA5gobGpgH4aQNm0A7iSjY8tCx4zcNccut8sei2Xin/exec';

export const SHEET_NAMES = {
  events: 'Events',
  updates: 'Updates',
  gallery: 'Gallery',
  research: 'Research',
  teams: 'Teams',
  edvantage: 'EdVantage',
  speakers: 'Speakers',
  sponsors: 'Sponsors'  
};

export const fetchSheetData = async (sheetKey) => {
  try {
    // Add validation for sheetKey
    if (!sheetKey || !SHEET_NAMES[sheetKey]) {
      throw new Error(`Invalid sheet key: ${sheetKey}`);
    }

    // Add debug logging
    console.log('Fetching sheet:', sheetKey, SHEET_NAMES[sheetKey]);
    
    const response = await fetch(`${APPS_SCRIPT_URL}?sheet=${SHEET_NAMES[sheetKey]}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Add more detailed debug logging
    console.log(`Sheet "${SHEET_NAMES[sheetKey]}" response:`, data);

    if (data.error) {
      throw new Error(`Sheet error: ${data.error}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${SHEET_NAMES[sheetKey]} sheet:`, error);
    return [];
  }
};
