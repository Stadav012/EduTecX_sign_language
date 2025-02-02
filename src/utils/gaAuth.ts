import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(import.meta.env.VITE_GA_ACCESS_TOKEN),
  scopes: ['https://www.googleapis.com/auth/analytics.readonly']
});

export const analyticsClient = google.analyticsdata({
  version: 'v1beta',
  auth
});