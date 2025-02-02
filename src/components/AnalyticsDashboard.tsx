import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: [
      ['Date', 'Page Views', 'Unique Views'],
      ['Today', 0, 0],
      ['Yesterday', 0, 0],
      ['2 days ago', 0, 0],
    ],
    interactions: [
      ['Event Type', 'Count'],
      ['Page Views', 0],
      ['Scrolls', 0],
      ['Outbound Clicks', 0],
      ['Form Interactions', 0],
      ['Video Plays', 0],
      ['File Downloads', 0],
    ],
    pathEngagement: [
      ['Learning Path', 'Completion %', 'Avg. Time (min)', 'Form Interactions'],
      ['Basic Signs', 0, 0, 0],
      ['Advanced Signs', 0, 0, 0],
    ],
    searchAnalytics: [
      ['Search Term', 'Count'],
      ['sign language', 0],
      ['basic signs', 0],
      ['learn signing', 0],
    ]
  });

  return (
    <div className="space-y-8 p-6">
      {/* Page Views Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Page Views & Navigation</h3>
        <Chart
          chartType="LineChart"
          data={analyticsData.pageViews}
          options={{
            title: 'Page Views Trend',
            curveType: 'function',
            legend: { position: 'bottom' },
          }}
          width="100%"
          height="300px"
        />
      </div>

      {/* User Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">User Interactions</h3>
          <Chart
            chartType="PieChart"
            data={analyticsData.interactions}
            options={{
              title: 'Event Distribution',
              pieHole: 0.4,
            }}
            width="100%"
            height="300px"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Search Terms</h3>
          <Chart
            chartType="BarChart"
            data={analyticsData.searchAnalytics}
            options={{
              title: 'Popular Search Terms',
              legend: { position: 'none' },
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>

      {/* Learning Path Engagement */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Learning Path Performance</h3>
        <Chart
          chartType="BarChart"
          data={analyticsData.pathEngagement}
          options={{
            title: 'Learning Path Metrics',
            isStacked: false,
            legend: { position: 'top' },
            hAxis: { title: 'Metrics' },
            vAxis: { title: 'Learning Path' },
          }}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
}