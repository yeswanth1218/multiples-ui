import React, { useState, useEffect } from 'react';
import {
    Smartphone,
    Tablet,
    Monitor,
} from 'lucide-react';

const AnalyticsPage = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setChartData(Array.from({ length: 12 }).map(() => ({
                h1: Math.floor(Math.random() * 60) + 20,
                h2: Math.floor(Math.random() * 60) + 20,
            })));
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Traffic Overview</h3>
                    <select className="bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 text-sm rounded-lg px-3 py-1 text-gray-700 dark:text-gray-300 focus:outline-none">
                        <option>Last 12 Months</option>
                        <option>Last 6 Months</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                    {chartData.map((data, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                            <div className="flex gap-1 items-end h-full justify-center w-full">
                                <div className="w-full max-w-[16px] bg-indigo-500 dark:bg-indigo-600 rounded-t-sm" style={{ height: `${data.h1}%` }}></div>
                                <div className="w-full max-w-[16px] bg-gray-200 dark:bg-[#3f3f46] rounded-t-sm" style={{ height: `${data.h2}%` }}></div>
                            </div>
                            <span className="text-[10px] text-gray-400">{months[i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Device Usage</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Mobile', icon: Smartphone, val: '58%', color: 'bg-blue-500' },
                            { label: 'Desktop', icon: Monitor, val: '32%', color: 'bg-purple-500' },
                            { label: 'Tablet', icon: Tablet, val: '10%', color: 'bg-green-500' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-1 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <item.icon size={14} /> {item.label}
                                    </div>
                                    <span>{item.val}</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-[#27272a] rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: item.val }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="text-left text-xs font-semibold text-gray-400 uppercase">
                                <tr>
                                    <th className="pb-3">Source</th>
                                    <th className="pb-3">Sessions</th>
                                    <th className="pb-3">Duration</th>
                                    <th className="pb-3">Bounce Rate</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-50 dark:divide-[#27272a]">
                                {[
                                    { source: 'Direct', sessions: '14,500', duration: '3m 40s', bounce: '22%' },
                                    { source: 'Social Media', sessions: '9,200', duration: '1m 20s', bounce: '54%' },
                                    { source: 'Organic Search', sessions: '8,400', duration: '5m 10s', bounce: '31%' },
                                    { source: 'Referral', sessions: '3,100', duration: '2m 55s', bounce: '40%' },
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td className="py-3 text-gray-900 dark:text-white font-medium">{row.source}</td>
                                        <td className="py-3 text-gray-500 dark:text-gray-400">{row.sessions}</td>
                                        <td className="py-3 text-gray-500 dark:text-gray-400">{row.duration}</td>
                                        <td className="py-3 text-gray-500 dark:text-gray-400">{row.bounce}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
