import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const stats = [
  { title: 'TOTAL SENDS', value: '27.29M', change: '-2.83% vs PY', chartData: [28, 26, 27, 29, 30, 27] },
  { title: 'OPEN RATE', value: '17.02%', change: '-2.39% vs PY', chartData: [18, 17.5, 17.7, 17.3, 17, 17] },
  { title: 'CLICK RATE', value: '2.03%', change: '-2.88% vs PY', chartData: [2.1, 2.2, 2.05, 2, 2.1, 2.03] },
  { title: 'UNSUBSCRIBE RATE', value: '0.49%', change: '-2.61% vs PY', chartData: [0.52, 0.51, 0.5, 0.49, 0.48, 0.49] },
  { title: 'REVENUE', value: '£28.58M', change: '-27.86% vs PY', chartData: [30, 29, 28, 27.5, 28, 28.58] },
];

const tableData = [
  { category: 'Promotion', rank: 1, clickRate: '1.92%', openRate: '16.12%', unsubRate: '0.50%', cySends: '7.61M', yoySends: '-14%', revenue: '£7.43M', changeRevenue: '£2.269K' },
  { category: 'New Product', rank: 2, clickRate: '2.11%', openRate: '16.70%', unsubRate: '0.50%', cySends: '6.33M', yoySends: '+24%', revenue: '£6.13M', changeRevenue: '£3.009K' },
  { category: 'Seasonal Campaign', rank: 3, clickRate: '2.27%', openRate: '17.70%', unsubRate: '0.49%', cySends: '6.01M', yoySends: '+10%', revenue: '£6.91M', changeRevenue: '-655K' },
  { category: 'Newsletter', rank: 4, clickRate: '1.93%', openRate: '17.49%', unsubRate: '0.50%', cySends: '4.44M', yoySends: '+1%', revenue: '£3.34M', changeRevenue: '-1.557K' },
  { category: 'Re-Engagement', rank: 5, clickRate: '2.12%', openRate: '16.78%', unsubRate: '0.44%', cySends: '1.84M', yoySends: '+4%', revenue: '£2.60M', changeRevenue: '£1.480K' },
];

export default function CampaignAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">EMAIL CAMPAIGN DASHBOARD 2023</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="text-xl font-semibold">{stat.value}</h2>
            <p className="text-xs text-purple-500">{stat.change}</p>
            <ResponsiveContainer width="100%" height={50}>
              <LineChart data={stat.chartData.map((v, i) => ({ index: i, value: v }))}>
                <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Heatmap placeholder + BarChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm font-semibold">Sends | Trends</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => ({ day, value: Math.random() * 100 }))}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold">Select Table: <span className="text-blue-600">Category</span></p>
            <div className="text-sm">Sort Table By: <select className="border ml-1 px-2 py-1 rounded text-sm"><option>Revenue</option></select></div>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs text-gray-600 border-b">
                <th className="p-2">Category</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Click Rate</th>
                <th className="p-2">Open Rate</th>
                <th className="p-2">Unsub Rate</th>
                <th className="p-2">CY Sends</th>
                <th className="p-2">YoY Sends</th>
                <th className="p-2">CY Revenue</th>
                <th className="p-2">Change in Revenue</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{item.category}</td>
                  <td className="p-2">{item.rank}</td>
                  <td className="p-2">{item.clickRate}</td>
                  <td className="p-2">{item.openRate}</td>
                  <td className="p-2">{item.unsubRate}</td>
                  <td className="p-2">{item.cySends}</td>
                  <td className="p-2">{item.yoySends}</td>
                  <td className="p-2 text-blue-600 font-semibold">{item.revenue}</td>
                  <td className="p-2 text-purple-500">{item.changeRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}