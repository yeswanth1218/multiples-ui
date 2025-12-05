import React from 'react';
import { 
    PieChart, 
    Pie, 
    Cell, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { 
    DollarSign, 
    Briefcase, 
    TrendingUp, 
    Activity 
} from 'lucide-react';

const AnalyticsPage = () => {
    
    // Dummy Data for Key Metrics
    const keyMetrics = [
        { title: 'Total Invested', value: '$450M', icon: DollarSign, change: '+12% YoY', color: 'bg-slate-900' },
        { title: 'Current AUM', value: '$1.2B', icon: Briefcase, change: '+25% YoY', color: 'bg-blue-500' },
        { title: 'Portfolio IRR', value: '32.5%', icon: TrendingUp, change: '+4.2%', color: 'bg-blue-300' },
        { title: 'Active Companies', value: '42', icon: Activity, change: '8 New this year', color: 'bg-slate-500' },
    ];

    // Sector Allocation Data
    const sectorData = [
        { name: 'FinTech', value: 35, color: '#0f172a' },
        { name: 'HealthCare', value: 25, color: '#3b82f6' },
        { name: 'AI & ML', value: 20, color: '#93c5fd' },
        { name: 'SaaS', value: 15, color: '#64748b' },
        { name: 'Others', value: 5, color: '#cbd5e1' },
    ];

    // Investment Growth Data (Last 5 Years)
    const investmentGrowthData = [
        { year: '2019', invested: 50, valuation: 60 },
        { year: '2020', invested: 120, valuation: 150 },
        { year: '2021', invested: 200, valuation: 350 },
        { year: '2022', invested: 320, valuation: 600 },
        { year: '2023', invested: 450, valuation: 1200 },
    ];

    // Stage Distribution Data
    const stageData = [
        { stage: 'Seed', count: 12 },
        { stage: 'Series A', count: 15 },
        { stage: 'Series B', count: 8 },
        { stage: 'Series C+', count: 5 },
        { stage: 'IPO/Exit', count: 2 },
    ];

    // Top Performers Data
    const topPerformers = [
        { name: 'Razorpay', sector: 'FinTech', invested: '$15M', current: '$225M', roi: '15x' },
        { name: 'Postman', sector: 'SaaS', invested: '$8M', current: '$96M', roi: '12x' },
        { name: 'Zomato', sector: 'Consumer', invested: '$20M', current: '$180M', roi: '9x' },
        { name: 'Freshworks', sector: 'SaaS', invested: '$10M', current: '$80M', roi: '8x' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Analytics</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive view of investment performance</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Download Report
                </button>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics.map((metric, index) => (
                    <div key={index} className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${metric.color} bg-opacity-10 text-white`}>
                                <metric.icon size={24} className={metric.color.replace('bg-', 'text-')} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                {metric.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Investment vs Valuation Growth */}
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Portfolio Growth (USD Millions)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={investmentGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Area type="monotone" dataKey="valuation" name="Current Valuation" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValuation)" strokeWidth={3} />
                                <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#0f172a" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sector Allocation */}
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Sector Allocation</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sectorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stage Distribution */}
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Portfolio by Stage</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" width={80} tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Performers Table */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Performing Assets</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Company</th>
                                    <th className="px-4 py-3">Sector</th>
                                    <th className="px-4 py-3">Invested</th>
                                    <th className="px-4 py-3">Current Value</th>
                                    <th className="px-4 py-3 rounded-r-lg">ROI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {topPerformers.map((company, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{company.name}</td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/10">
                                                {company.sector}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{company.invested}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{company.current}</td>
                                        <td className="px-4 py-3 font-bold text-blue-500 dark:text-blue-400">{company.roi}</td>
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
