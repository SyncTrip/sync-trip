const API_KEY = process.env.REACT_APP_SKYSCANNER_API_KEY;
const BASE_URL = 'https://partners.api.skyscanner.net/apiservices/v3/flights/live';

/**
 * Initiates a flight search and returns a session token.
 * @param {Object} params - Search parameters
 * @param {string} params.origin - IATA code for origin (e.g., 'LON')
 * @param {string} params.destination - IATA code for destination (e.g., 'NYC')
 * @param {string} params.date - Date in YYYY-MM-DD format (e.g., '2025-06-01')
 * @param {string} [params.market='US'] - Market code (e.g., 'US')
 * @param {string} [params.locale='en-US'] - Locale (e.g., 'en-US')
 * @param {string} [params.currency='USD'] - Currency (e.g., 'USD')
 * @param {number} [params.adults=1] - Number of adults
 * @param {string} [params.cabinClass='CABIN_CLASS_ECONOMY'] - Cabin class
 * @returns {Promise<string>} - Session token
 * @throws {Error} - If the request fails
 */
export async function createSearch({
  origin,
  destination,
  date,
  market = 'UK',
  locale = 'en-GB',
  currency = 'EUR',
  adults = 1,
  cabinClass = 'CABIN_CLASS_ECONOMY',
}) {
  try {
    const [year, month, day] = date.split('-').map(Number);
    const response = await fetch(`${BASE_URL}/search/create`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          market,
          locale,
          currency,
          query_legs: [
            {
              origin_place_id: { iata: origin },
              destination_place_id: { iata: destination },
              date: { year, month, day },
            },
          ],
          adults,
          cabin_class: cabinClass,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to initiate search: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.sessionToken) {
      throw new Error('No session token returned');
    }

    return data.sessionToken;
  } catch (error) {
    throw new Error(`Create search failed: ${error.message}`);
  }
}

/**
 * Polls for flight search results using the session token.
 * @param {string} sessionToken - Session token from createSearch
 * @param {boolean} [filterMashups=true] - Filter out mash-up itineraries
 * @returns {Promise<Object>} - Object containing itineraries and status
 * @throws {Error} - If the request fails or session token is expired
 */
export async function pollSearch(sessionToken, filterMashups = true) {
  if (!sessionToken) {
    throw new Error('Session token is required');
  }

  try {
    const response = await fetch(`${BASE_URL}/search/poll/${sessionToken}`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (response.status === 400) {
      throw new Error('Session token expired. Please start a new search.');
    }

    if (!response.ok) {
      throw new Error(`Failed to poll results: ${response.statusText}`);
    }

    const data = await response.json();
    let itineraries = data.content?.results?.itineraries || {};

    // Filter out mash-ups if enabled
    if (filterMashups) {
      itineraries = Object.fromEntries(
        Object.entries(itineraries).filter(([_, itinerary]) =>
          itinerary.pricing_options.every(option => option.agent_ids.length === 1)
        )
      );
    }

    return {
      itineraries: Object.values(itineraries),
      status: data.content?.status || 'RESULT_STATUS_INCOMPLETE',
    };
  } catch (error) {
    throw new Error(`Poll search failed: ${error.message}`);
  }
}

/**
 * Refreshes prices for a specific itinerary.
 * @param {string} sessionToken - Session token from createSearch
 * @param {string} itineraryId - ID of the itinerary to refresh
 * @returns {Promise<Object>} - Updated pricing options
 * @throws {Error} - If the request fails
 */
export async function refreshPrices(sessionToken, itineraryId) {
  if (!sessionToken || !itineraryId) {
    throw new Error('Session token and itinerary ID are required');
  }

  try {
    // Initiate price refresh
    const createResponse = await fetch(`${BASE_URL}/itineraryrefresh/create/${sessionToken}-cells1`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itinerary_id: itineraryId }),
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to initiate price refresh: ${createResponse.statusText}`);
    }

    const createData = await createResponse.json();
    const refreshToken = createData.refreshToken;

    if (!refreshToken) {
      throw new Error('No refresh token returned');
    }

    // Poll refresh results
    const pollResponse = await fetch(`${BASE_URL}/itineraryrefresh/poll/${refreshToken}`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!pollResponse.ok) {
      throw new Error(`Failed to poll refresh results: ${pollResponse.statusText}`);
    }

    const refreshData = await pollResponse.json();
    return refreshData.content?.pricing_options || [];
  } catch (error) {
    throw new Error(`Price refresh failed: ${error.message}`);
  }
}