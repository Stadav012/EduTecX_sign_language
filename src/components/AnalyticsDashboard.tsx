import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: [
      ['Date', 'Views'],
      ['Today', 0],
      ['Yesterday', 0],
    ],
    userMetrics: {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
    },
    pathEngagement: [
      ['Path', 'Completion Rate', 'Average Time'],
      ['Basic Signs', 0, 0],
      ['Advanced Signs', 0, 0],
    ],
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Overview Card */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Overview</h3>
          <div className="space-y-2">
            <p>Total Users: {analyticsData.userMetrics.totalUsers}</p>
            <p>Active Users: {analyticsData.userMetrics.activeUsers}</p>
            <p>New Users: {analyticsData.userMetrics.newUsers}</p>
          </div>
        </div>

        {/* Page Views Chart */}
        <div className="col-span-2 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Page Views</h3>
          <Chart
            chartType="LineChart"
            data={analyticsData.pageViews}
            options={{
              curveType: 'function',
              legend: { position: 'none' },
              hAxis: { title: 'Date' },
              vAxis: { title: 'Views' },
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>

      {/* Learning Path Engagement */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Learning Path Engagement</h3>
        <Chart
          chartType="BarChart"
          data={analyticsData.pathEngagement}
          options={{
            isStacked: false,
            legend: { position: 'top' },
            hAxis: { title: 'Completion Rate & Time' },
            vAxis: { title: 'Learning Path' },
          }}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
}