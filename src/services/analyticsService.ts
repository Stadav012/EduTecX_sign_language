import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GA_TRACKING_ID } from '../config/analytics';
import * as KJUR from 'jsrsasign';

const ANALYTICS_API_URL = 'https://analyticsdata.googleapis.com/v1beta';

function generateJWT(credentials: any) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(claim);
  const privateKey = credentials.private_key;
  
  return KJUR.jws.JWS.sign(
    'RS256',
    sHeader,
    sPayload,
    privateKey
  );
}

export async function fetchAnalyticsData() {
  try {
    console.log('🔍 Starting analytics fetch with property:', GA_TRACKING_ID);
    
    // First, get an access token using the service account credentials
    const credentials = JSON.parse(import.meta.env.VITE_GA_ACCESS_TOKEN);
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: generateJWT(credentials)
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Now use the access token to fetch analytics data
    const analyticsResponse = await axios.post(
      `${ANALYTICS_API_URL}/properties/${GA_TRACKING_ID}/runReport`,
      {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' }
        ],
        dimensions: [{ name: 'date' }]
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Analytics data received:', analyticsResponse.data);
    return analyticsResponse.data;
  } catch (error: any) {
    console.error('🚨 Analytics Error:', {
      message: error.message,
      details: error.response?.data || error
    });
    return null;
  }
}