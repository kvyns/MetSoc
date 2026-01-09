const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZpA2sqZZNoFz37dnOZy3VC-tA5gobGpgH4aQNm0A7iSjY8tCx4zcNccut8sei2Xin/exec';

export const SHEET_NAMES = {
  events: 'Events',
  updates: 'Updates',
  gallery: 'Gallery',
  research: 'Research',
  teams: 'Teams',
  teams2024: 'Teams 2024-25',
  edvantage: 'EdVantage'
};

// Request deduplication - prevent multiple simultaneous requests for the same sheet
const pendingRequests = new Map();

export const fetchSheetData = async (sheetKey) => {
  try {
    // Add validation for sheetKey
    if (!sheetKey || !SHEET_NAMES[sheetKey]) {
      throw new Error(`Invalid sheet key: ${sheetKey}`);
    }

    // Check if there's already a pending request for this sheet
    if (pendingRequests.has(sheetKey)) {
      return pendingRequests.get(sheetKey);
    }

    // Add debug logging
    console.log('Fetching sheet:', sheetKey, SHEET_NAMES[sheetKey]);
    
    const requestPromise = fetch(`${APPS_SCRIPT_URL}?sheet=${SHEET_NAMES[sheetKey]}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(async (response) => {
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
      })
      .finally(() => {
        // Remove from pending requests when done
        pendingRequests.delete(sheetKey);
      });

    // Store the promise
    pendingRequests.set(sheetKey, requestPromise);
    
    return await requestPromise;
  } catch (error) {
    console.error(`Error fetching ${SHEET_NAMES[sheetKey]} sheet:`, error);
    pendingRequests.delete(sheetKey);
    return [];
  }
};

// Simplify parsing functions since data comes pre-formatted
export const parseEventData = (rows) => Array.isArray(rows) ? rows : [];
export const parseUpdatesData = (rows) => Array.isArray(rows) ? rows : [];
export const parseGalleryData = (rows) => Array.isArray(rows) ? rows : [];
export const parseResearchData = (rows) => Array.isArray(rows) ? rows : [];
export const parseTeamsData = (rows) => Array.isArray(rows) ? rows : [];
