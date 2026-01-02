import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSectors } from '../../context/SectorContext';
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
    Legend,
    LabelList
} from 'recharts';
import {
    DollarSign,
    Briefcase,
    TrendingUp,
    Activity,
    ChevronDown,
    Filter
} from 'lucide-react';

const PortfolioPage = () => {
    const navigate = useNavigate();
    const { sectors } = useSectors();
    const [selectedSector, setSelectedSector] = useState('All Sectors');

    // Active Portfolio Companies Table (Generic Data - 3+ companies per sector)
    const allPortfolioCompanies = [
        // BFSI
        { name: 'BFSI-Company-1', sector: 'BFSI', equity: '12.5%', cost: 45, currentVal: 540, multiple: 12.0 },
        { name: 'BFSI-Company-2', sector: 'BFSI', equity: '5.2%', cost: 80, currentVal: 960, multiple: 12.0 },
        { name: 'BFSI-Company-3', sector: 'BFSI', equity: '3.5%', cost: 40, currentVal: 280, multiple: 7.0 },
        // HealthCare/Pharma
        { name: 'Health-Company-1', sector: 'HealthCare/Pharma', equity: '4.0%', cost: 50, currentVal: 200, multiple: 4.0 },
        { name: 'Health-Company-2', sector: 'HealthCare/Pharma', equity: '6.0%', cost: 30, currentVal: 150, multiple: 5.0 },
        { name: 'Health-Company-3', sector: 'HealthCare/Pharma', equity: '2.5%', cost: 20, currentVal: 80, multiple: 4.0 },
        // IT
        { name: 'IT-Company-1', sector: 'IT', equity: '8.2%', cost: 25, currentVal: 310, multiple: 12.4 },
        { name: 'IT-Company-2', sector: 'IT', equity: '15.0%', cost: 30, currentVal: 240, multiple: 8.0 },
        { name: 'IT-Company-3', sector: 'IT', equity: '10.0%', cost: 15, currentVal: 120, multiple: 8.0 },
        // Enterprise
        { name: 'Ent-Company-1', sector: 'Enterprise', equity: '10.0%', cost: 40, currentVal: 200, multiple: 5.0 },
        { name: 'Ent-Company-2', sector: 'Enterprise', equity: '5.0%', cost: 20, currentVal: 100, multiple: 5.0 },
        { name: 'Ent-Company-3', sector: 'Enterprise', equity: '15.0%', cost: 60, currentVal: 300, multiple: 5.0 },
        // Green
        { name: 'Green-Company-1', sector: 'Green', equity: '12.0%', cost: 35, currentVal: 175, multiple: 5.0 },
        { name: 'Green-Company-2', sector: 'Green', equity: '8.0%', cost: 25, currentVal: 125, multiple: 5.0 },
        { name: 'Green-Company-3', sector: 'Green', equity: '10.0%', cost: 45, currentVal: 225, multiple: 5.0 },
        // Fundraising & Investor Relations
        { name: 'Fund-Company-1', sector: 'Fundraising & Investor Relations', equity: '5.0%', cost: 15, currentVal: 45, multiple: 3.0 },
        { name: 'Fund-Company-2', sector: 'Fundraising & Investor Relations', equity: '3.0%', cost: 10, currentVal: 30, multiple: 3.0 },
        { name: 'Fund-Company-3', sector: 'Fundraising & Investor Relations', equity: '7.0%', cost: 20, currentVal: 60, multiple: 3.0 },
        // Consumer / Manufacturing
        { name: 'Cons-Company-1', sector: 'Consumer / Manufacturing', equity: '2.5%', cost: 35, currentVal: 140, multiple: 4.0 },
        { name: 'Cons-Company-2', sector: 'Consumer / Manufacturing', equity: '4.5%', cost: 55, currentVal: 220, multiple: 4.0 },
        { name: 'Cons-Company-3', sector: 'Consumer / Manufacturing', equity: '6.5%', cost: 75, currentVal: 300, multiple: 4.0 },
        // Credit
        { name: 'Cred-Company-1', sector: 'Credit', equity: '6.0%', cost: 20, currentVal: 180, multiple: 9.0 },
        { name: 'Cred-Company-2', sector: 'Credit', equity: '4.0%', cost: 15, currentVal: 135, multiple: 9.0 },
        { name: 'Cred-Company-3', sector: 'Credit', equity: '8.0%', cost: 25, currentVal: 225, multiple: 9.0 },
        // Fitness
        { name: 'Fit-Company-1', sector: 'Fitness', equity: '5.0%', cost: 10, currentVal: 20, multiple: 2.0 },
        { name: 'Fit-Company-2', sector: 'Fitness', equity: '10.0%', cost: 20, currentVal: 40, multiple: 2.0 },
        { name: 'Fit-Company-3', sector: 'Fitness', equity: '15.0%', cost: 30, currentVal: 60, multiple: 2.0 },
        // HR
        { name: 'HR-Company-1', sector: 'HR', equity: '3.0%', cost: 5, currentVal: 15, multiple: 3.0 },
        { name: 'HR-Company-2', sector: 'HR', equity: '6.0%', cost: 10, currentVal: 30, multiple: 3.0 },
        { name: 'HR-Company-3', sector: 'HR', equity: '9.0%', cost: 15, currentVal: 45, multiple: 3.0 },
    ];

    // Filtered Companies
    const filteredCompanies = useMemo(() => {
        if (selectedSector === 'All Sectors') return allPortfolioCompanies;
        return allPortfolioCompanies.filter(c => c.sector.toLowerCase() === selectedSector.toLowerCase());
    }, [selectedSector]);

    // Derived Metrics
    const metrics = useMemo(() => {
        const totalCost = filteredCompanies.reduce((acc, c) => acc + c.cost, 0);
        const totalVal = filteredCompanies.reduce((acc, c) => acc + c.currentVal, 0);
        const avgMultiple = totalCost > 0 ? (totalVal / totalCost).toFixed(2) : '0.00';
        
        return [
            { title: 'Capital Deployed', value: `$${totalCost}M`, icon: DollarSign, change: '+12.4%', color: 'bg-slate-900' },
            { title: 'Portfolio Fair Value', value: `$${(totalVal/1000).toFixed(2)}B`, icon: Briefcase, change: '+24.1%', color: 'bg-blue-500' },
            { title: 'Net Multiple (MOIC)', value: `${avgMultiple}x`, icon: TrendingUp, change: '+0.2x', color: 'bg-blue-300' },
            { title: 'Active Companies', value: filteredCompanies.length.toString(), icon: Activity, change: 'Active Deals', color: 'bg-slate-500' },
        ];
    }, [filteredCompanies]);

    // Reactive Pie Chart Data (Sector-wise for 'All Sectors', Company-wise for specific sector)
    const pieChartData = useMemo(() => {
        if (selectedSector === 'All Sectors') {
            // Sector-wise segmentation
            const distribution = allPortfolioCompanies.reduce((acc, company) => {
                acc[company.sector] = (acc[company.sector] || 0) + company.currentVal;
                return acc;
            }, {});

            const colors = ['#0f172a', '#3b82f6', '#93c5fd', '#64748b', '#cbd5e1', '#94a3b8', '#1e293b', '#2563eb', '#60a5fa', '#334155'];
            return Object.entries(distribution).map(([name, value], index) => ({
                name,
                value,
                color: colors[index % colors.length]
            }));
        } else {
            // Company-wise segmentation for the selected sector
            const sectorCompanies = allPortfolioCompanies.filter(c => c.sector.toLowerCase() === selectedSector.toLowerCase());
            const colors = ['#0f172a', '#3b82f6', '#93c5fd', '#64748b', '#cbd5e1'];
            return sectorCompanies.map((c, index) => ({
                name: c.name,
                value: c.currentVal,
                color: colors[index % colors.length]
            }));
        }
    }, [selectedSector, allPortfolioCompanies]);

    // Ownership Stake Distribution (Reactive)
    const stakeDistribution = useMemo(() => {
        const ranges = [
            { range: '< 5%', count: 0 },
            { range: '5% - 15%', count: 0 },
            { range: '15% - 25%', count: 0 },
            { range: '25% - 50%', count: 0 },
            { range: '> 50%', count: 0 },
        ];

        filteredCompanies.forEach(c => {
            const val = parseFloat(c.equity);
            if (val < 5) ranges[0].count++;
            else if (val < 15) ranges[1].count++;
            else if (val < 25) ranges[2].count++;
            else if (val < 50) ranges[3].count++;
            else ranges[4].count++;
        });

        return ranges;
    }, [filteredCompanies]);

    // Performance Data (Mock reactive historical data)
    const performanceData = useMemo(() => {
        const baseData = [
            { year: '2019', cost: 0.2, fairValue: 0.3 },
            { year: '2020', cost: 0.4, fairValue: 0.6 },
            { year: '2021', cost: 0.6, fairValue: 1.2 },
            { year: '2022', cost: 0.8, fairValue: 1.8 },
            { year: '2023', cost: 1.0, fairValue: 2.4 },
        ];

        const totalCost = filteredCompanies.reduce((acc, c) => acc + c.cost, 0);
        const totalVal = filteredCompanies.reduce((acc, c) => acc + c.currentVal, 0);

        return baseData.map(d => ({
            ...d,
            cost: (d.cost * totalCost).toFixed(0),
            fairValue: (d.fairValue * (totalVal / 2.4)).toFixed(0)
        }));
    }, [filteredCompanies]);

    const availableSectors = useMemo(() => {
        const sectorTitles = sectors.map(s => s.title);
        return ['All Sectors', ...sectorTitles];
    }, [sectors]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Overview</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Detailed view of Multiples equity holdings and performance</p>
                </div>
                
                <div className="flex items-center gap-3 no-print">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <select 
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="pl-9 pr-10 py-2 text-sm font-medium border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                            {availableSectors.map(sector => (
                                <option key={sector} value={sector}>{sector}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className="relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(31,38,135,0.15)] dark:hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.5),0_16px_32px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                    >
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
                {/* Cost vs Fair Value Growth */}
                <div className="relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Investment Cost vs. Fair Value (USD M)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Area type="monotone" dataKey="fairValue" name="Fair Market Value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                                <Area type="monotone" dataKey="cost" name="Invested Capital" stroke="#0f172a" fillOpacity={1} fill="url(#colorCost)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Value Distribution */}
                <div className="relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                        {selectedSector === 'All Sectors' ? 'Value Distribution by Sector' : `Value Distribution within ${selectedSector}`}
                    </h3>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color} 
                                            stroke={selectedSector === entry.name ? '#fff' : 'none'}
                                            strokeWidth={2}
                                            opacity={selectedSector === 'All Sectors' || selectedSector === entry.name ? 1 : 0.3}
                                        />
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Ownership Stake Distribution */}
                <div className="lg:col-span-5 relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Equity Stake Distribution</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Number of companies grouped by Multiples' ownership %</p>
                    </div>
                    <div className="h-[360px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stakeDistribution} layout="vertical" margin={{ top: 5, right: 40, left: 40, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="range" 
                                    type="category" 
                                    width={80} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                                />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white dark:bg-[#1a1a1a] p-3 border border-gray-100 dark:border-white/10 rounded-lg shadow-xl">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{payload[0].payload.range} Stake</p>
                                                    <p className="text-xs text-blue-500 font-medium mt-1">{payload[0].value} Companies</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32}>
                                    {stakeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.count > 0 ? '#3b82f6' : '#94a3b8'} opacity={entry.count > 0 ? 1 : 0.3} />
                                    ))}
                                    <LabelList dataKey="count" position="right" style={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} formatter={(val) => val > 0 ? `${val} Co.` : ''} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Portfolio Companies Table */}
                <div className="lg:col-span-7 relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24_rgba(0,0,0,0.3)] flex flex-col h-[500px]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex-none">Portfolio Holdings ({filteredCompanies.length})</h3>
                    <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                        <table className="w-full text-sm text-left border-separate border-spacing-0">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Company</th>
                                    <th className="px-4 py-3">Sector</th>
                                    <th className="px-4 py-3">Equity</th>
                                    <th className="px-4 py-3">Cost</th>
                                    <th className="px-4 py-3">Fair Value</th>
                                    <th className="px-4 py-3 rounded-tr-lg">Multiple</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {filteredCompanies.map((company, index) => (
                                    <tr 
                                        key={index} 
                                        onClick={() => navigate(`/dashboard/company/${company.name.toLowerCase()}`)}
                                        className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{company.name}</td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                            <span 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedSector(company.sector);
                                                }}
                                                className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                            >
                                                {company.sector}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{company.equity}</td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">${company.cost}M</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">${company.currentVal}M</td>
                                        <td className="px-4 py-3 font-bold text-blue-500 dark:text-blue-400">{company.multiple}x</td>
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

export default PortfolioPage;