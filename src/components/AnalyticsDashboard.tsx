import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { fetchAnalyticsData } from '../services/analyticsService';

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: [['Date', 'Page Views', 'Unique Views']],
    interactions: [['Event Type', 'Count']],
    pathEngagement: [['Learning Path', 'Completion %', 'Avg. Time (min)', 'Form Interactions']],
    searchAnalytics: [['Search Term', 'Count']]
  });
  const [rawData, setRawData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add test data
  const testData = {
    pageViews: [
      ['Date', 'Page Views', 'Unique Views'],
      [new Date(2024, 0, 1), 100, 50],
      [new Date(2024, 0, 2), 120, 60],
      [new Date(2024, 0, 3), 130, 70],
    ],
    interactions: [
      ['Event Type', 'Count'],
      ['Page Views', 250],
      ['Video Plays', 120],
      ['Form Submissions', 45],
    ],
    pathEngagement: [
      ['Learning Path', 'Completion %', 'Avg. Time (min)', 'Interactions'],
      ['Basic Signs', 75, 30, 150],
      ['Advanced Signs', 60, 45, 100],
    ],
    searchAnalytics: [
      ['Search Term', 'Count'],
      ['basic signs', 50],
      ['numbers', 30],
      ['alphabet', 25],
    ]
  };

  useEffect(() => {
    async function loadAnalyticsData() {
      try {
        setLoading(true);
        console.log('🚀 Starting data fetch...');
        
        const data = await fetchAnalyticsData();
        console.log('📦 Received data:', data);
        
        if (!data) {
          console.log('⚠️ No data received, using test data');
          setRawData(null);
          setAnalyticsData(testData);
          setLoading(false);
          return;
        }

        setRawData(data);
        setAnalyticsData(testData); // Temporarily use test data while we debug
        console.log('✅ Data loaded successfully');
      } catch (err) {
        console.error('❌ Load error:', err);
        setRawData(null);
        setAnalyticsData(testData);
      } finally {
        setLoading(false);
      }
    }

    loadAnalyticsData();
    return () => {}; // Remove interval for now while debugging
  }, []);

  // Show loading state with more detail
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="mb-4">Loading analytics data...</div>
        <div className="text-sm text-gray-500">
          This may take a few moments
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Debug section */}
      <div className="bg-gray-100 p-4 mb-8 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
        <div className="bg-white p-4 rounded overflow-auto max-h-96">
          <div>Loading State: {loading ? 'True' : 'False'}</div>
          <div>Has Raw Data: {rawData ? 'Yes' : 'No'}</div>
          <div>Data Source: {rawData ? 'API' : 'Test Data'}</div>
          <pre className="text-sm mt-4">
            {JSON.stringify(rawData || 'No API data available', null, 2)}
          </pre>
        </div>
      </div>

      {/* Rest of your existing chart components... */}
    </div>
  );
}

function transformAnalyticsData(apiData: any) {
  return {
    pageViews: [
      ['Date', 'Page Views', 'Unique Views'],
      ...apiData.rows.map((row: any) => [
        // Convert string date to Date object
        new Date(row.dimensionValues[0].value),
        Number(row.metricValues[0].value),
        Number(row.metricValues[1].value)
      ])
    ],
    interactions: [
      ['Event Type', 'Count'],
      ...apiData.rows.map((row: any) => [
        String(row.dimensionValues[0].value),
        Number(row.metricValues[0].value)
      ])
    ],
    pathEngagement: [
      ['Learning Path', 'Completion %', 'Avg. Time (min)', 'Interactions'],
      ...apiData.rows.map((row: any) => [
        String(row.dimensionValues[0].value),
        Number(row.metricValues[0].value),
        Number(row.metricValues[1].value),
        Number(row.metricValues[2].value)
      ])
    ],
    searchAnalytics: [
      ['Search Term', 'Count'],
      ...apiData.rows.map((row: any) => [
        String(row.dimensionValues[0].value),
        Number(row.metricValues[0].value)
      ])
    ]
  };
}