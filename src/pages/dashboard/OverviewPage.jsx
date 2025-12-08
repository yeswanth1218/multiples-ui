import React, { useState, useEffect } from 'react';
import {
    CheckSquare,
    Search,
    MoreHorizontal,
    Filter,
    ArrowUpDown,
    ChevronDown,
    Clock,
    AlertTriangle,
    TrendingUp,
    Linkedin,
    Globe,
    DollarSign,
    Briefcase,
    Sparkles
} from 'lucide-react';
import { StatCard, Tag, Bar } from '../../components/dashboard/Shared';
import { PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    RadialBarChart,
    RadialBar,
    AreaChart,
    Area,
    ReferenceLine,
    ReferenceDot
} from 'recharts';

const OverviewPage = ({ chartData: initialChartData, tableData: initialTableData }) => {
    const [savingsData, setSavingsData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedSector, setSelectedSector] = useState('All');

    const sectors = [
        'FinTech',
        'HealthCare',
        'AI & ML',
        'SaaS',
        'Agritech',
        'Pharma',
        'Manufacturing',
        'EduTech'
    ];

    // Reactive data based on selection
    const getChartData = () => {
        if (selectedSector === 'All') return initialChartData;
        
        // Generate deterministic random data based on sector name length
        const seed = selectedSector.length;
        return initialChartData.map(item => ({
            ...item,
            thisYear: Math.max(10, Math.min(100, parseInt(item.thisYear) + (seed % 2 === 0 ? 10 : -10))) + '%',
            lastYear: Math.max(10, Math.min(100, parseInt(item.lastYear) + (seed % 3 === 0 ? 15 : -5))) + '%'
        }));
    };

    const getTableData = () => {
        if (selectedSector === 'All') return initialTableData;
        
        // Filter or modify table data
        return initialTableData.map((item, index) => ({
            ...item,
            company: `${item.company} (${selectedSector})`, // Just to show reactivity
            dueDate: `${index + 10}/11/2025`
        }));
    };

    const getStats = () => {
        if (selectedSector === 'All') {
            return {
                reserve: { value: "$2.4M", trend: "+12% ($300k)" },
                investments: { value: "$14.5M", trend: "+8% ($1.2M)" },
                projects: { value: "21", trend: "+24% (5)" }
            };
        }

        // Mock stats for sectors
        const multipliers = {
            'FinTech': 0.8,
            'HealthCare': 0.6,
            'AI & ML': 0.5,
            'SaaS': 0.7,
            'Agritech': 0.3,
            'Pharma': 0.4,
            'Manufacturing': 0.9,
            'EduTech': 0.2
        };

        const mult = multipliers[selectedSector] || 0.5;

        return {
            reserve: { 
                value: `$${(2.4 * mult).toFixed(1)}M`, 
                trend: `${mult > 0.5 ? '+' : '-'}${Math.floor(12 * mult)}% ($${Math.floor(300 * mult)}k)` 
            },
            investments: { 
                value: `$${(14.5 * mult).toFixed(1)}M`, 
                trend: `+${Math.floor(8 * mult)}% ($${(1.2 * mult).toFixed(1)}M)` 
            },
            projects: { 
                value: Math.floor(21 * mult).toString(), 
                trend: `+${Math.floor(24 * mult)}% (${Math.floor(5 * mult)})` 
            }
        };
    };

    const getSectorRevenueData = () => {
        const baseData = [
            { name: 'FinTech', value: 400, color: '#0f172a' }, // Slate 900
            { name: 'HealthCare', value: 300, color: '#3b82f6' }, // Blue 500
            { name: 'AI & ML', value: 300, color: '#93c5fd' }, // Blue 300
            { name: 'SaaS', value: 200, color: '#64748b' }, // Slate 500
            { name: 'Agritech', value: 100, color: '#cbd5e1' }, // Slate 300
        ];

        if (selectedSector === 'All') return baseData;

        // Mock sub-sector data
        return [
            { name: 'Product A', value: 300, color: '#0f172a' },
            { name: 'Product B', value: 200, color: '#3b82f6' },
            { name: 'Services', value: 150, color: '#93c5fd' },
            { name: 'Licensing', value: 100, color: '#64748b' },
        ];
    };

    const getMarketGrowthData = () => {
        const baseData = [
            { month: 'Jan', FinTech: 2.5, HealthCare: 1.8, 'AI & ML': 3.2 },
            { month: 'Feb', FinTech: 2.8, HealthCare: 2.0, 'AI & ML': 3.5 },
            { month: 'Mar', FinTech: 3.0, HealthCare: 2.1, 'AI & ML': 3.8 },
            { month: 'Apr', FinTech: 3.2, HealthCare: 2.3, 'AI & ML': 4.2 },
            { month: 'May', FinTech: 3.1, HealthCare: 2.5, 'AI & ML': 4.5 },
            { month: 'Jun', FinTech: 3.4, HealthCare: 2.6, 'AI & ML': 4.8 },
        ];

        if (selectedSector === 'All') return baseData;

        const offset = selectedSector.length * 0.1;
        return baseData.map(d => ({
            month: d.month,
            'Your Growth': parseFloat((d.FinTech + offset).toFixed(1)),
            'Market Avg': parseFloat((d.HealthCare + offset/2).toFixed(1)),
            'Top Competitor': parseFloat((d['AI & ML'] + offset).toFixed(1))
        }));
    };

    const getGrowthKeys = () => {
        if (selectedSector === 'All') return ['FinTech', 'HealthCare', 'AI & ML'];
        return ['Your Growth', 'Market Avg', 'Top Competitor'];
    };

    const chartData = getChartData();
    const tableData = getTableData();
    const stats = getStats();
    const sectorRevenueData = getSectorRevenueData();
    const marketGrowthData = getMarketGrowthData();
    const growthKeys = getGrowthKeys();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSavingsData(Array.from({ length: 40 }).map(() => Math.random() * 80 + 20));
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Data for Radial Bar Chart
    const radialData = [
        { name: 'High Priority', uv: 100, fill: '#0f172a' }, // Slate 900
        { name: 'Medium Priority', uv: 80, fill: '#3b82f6' }, // Blue 500
        { name: 'Low Priority', uv: 60, fill: '#93c5fd' }, // Blue 300
        { name: 'Backlog', uv: 40, fill: '#cbd5e1' }, // Slate 300
    ];

    // Data for Area Chart with Pins
    const milestoneData = [
        { x: 0, y: 5 },
        { x: 20, y: 15, label: '20%' },
        { x: 40, y: 35, label: '40%' },
        { x: 50, y: 45, label: '50%' },
        { x: 80, y: 70, label: '80%' },
        { x: 100, y: 90, label: '80%' },
    ];

    const CustomPin = (props) => {
        const { cx, cy, payload } = props;
        if (!payload.label) return null;
        const isHovered = props.index === props.activeIndex;
        return (
            <g className="cursor-pointer hover:scale-110 transition-transform duration-300 origin-bottom">
                <line x1={cx} y1={cy} x2={cx} y2={cy - 40} stroke={props.stroke} strokeWidth="2" />
                <circle cx={cx} cy={cy - 40} r="4" fill={props.stroke} className="hover:r-6 transition-all" />
                <text x={cx} y={cy - 50} textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="bold">{payload.label}</text>
            </g>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header with Sector Dropdown */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {selectedSector === 'All' ? 'Organization Level View' : `${selectedSector} Sector View`}
                    </p>
                </div>
                <div className="relative z-20 no-print">
                    <select
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="appearance-none bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 py-2.5 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer text-sm font-medium min-w-[160px] transition-all hover:border-gray-300 dark:hover:border-white/20"
                    >
                        <option value="All">All Sectors</option>
                        {sectors.map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6">
                <StatCard
                    title="Funds in reserve"
                    subtitle="Available for allocation"
                    value={stats.reserve.value}
                    trend={stats.reserve.trend}
                    icon={DollarSign}
                />
                <StatCard
                    title="Total investments"
                    subtitle="Cumulative capital deployed"
                    value={stats.investments.value}
                    trend={stats.investments.trend}
                    icon={Briefcase}
                />
                <StatCard
                    title="Active Projects"
                    subtitle="Updated in the last 7 days"
                    value={stats.projects.value}
                    trend={stats.projects.trend}
                    icon={Clock}
                />
            </div>

            {/* Charts Row */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-[2] bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Flow</h3>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
                                This Year
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span className="w-2 h-2 rounded-full bg-blue-300 dark:bg-blue-600"></span>
                                Last Year
                            </div>
                            <MoreHorizontal className="text-gray-400 cursor-pointer no-print" />
                        </div>
                    </div>

                    <div className="h-48 flex items-end justify-between px-2 gap-4">
                        {chartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer h-full justify-end">
                                <div className="flex items-end gap-1 sm:gap-2 h-full w-full justify-center relative">
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black text-white text-xs py-1 px-2 rounded transition-opacity pointer-events-none whitespace-nowrap z-10">
                                        Rev: {data.thisYear}
                                    </div>
                                    <Bar height={isLoaded ? data.thisYear : 0} color="bg-gray-900 dark:bg-white group-hover:opacity-80" />
                                    <Bar height={isLoaded ? data.lastYear : 0} color="bg-blue-300 dark:bg-blue-600 group-hover:opacity-80" />
                                </div>
                                <span className="text-[10px] sm:text-xs text-gray-400 font-medium whitespace-nowrap">{data.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] flex flex-col">
                    <div className="mb-6">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Saving</p>
                        <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">$35,610</h3>
                            <span className="text-blue-500 text-sm font-medium flex items-center bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-full">
                                <TrendingUp size={14} className="mr-1" /> +12.3%
                            </span>
                        </div>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div className="h-8 flex items-end gap-[3px] mb-8 opacity-90">
                        {/* Investment - Slate 900 - 15 bars */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div 
                                key={`inv-${i}`} 
                                className="w-1.5 rounded-sm bg-slate-900 dark:bg-slate-200 transition-all duration-500 ease-out"
                                style={{ height: isLoaded ? '100%' : '0%', transitionDelay: `${i * 20}ms` }}
                            ></div>
                        ))}
                        {/* Holiday - Blue 500 - 10 bars */}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div 
                                key={`hol-${i}`} 
                                className="w-1.5 rounded-sm bg-blue-500 dark:bg-blue-500 transition-all duration-500 ease-out"
                                style={{ height: isLoaded ? '100%' : '0%', transitionDelay: `${(i + 15) * 20}ms` }}
                            ></div>
                        ))}
                        {/* Home - Blue 300 - 8 bars */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div 
                                key={`hom-${i}`} 
                                className="w-1.5 rounded-sm bg-blue-300 dark:bg-blue-300 transition-all duration-500 ease-out"
                                style={{ height: isLoaded ? '100%' : '0%', transitionDelay: `${(i + 25) * 20}ms` }}
                            ></div>
                        ))}
                        {/* Setup - Slate 500 - 5 bars */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                                key={`set-${i}`} 
                                className="w-1.5 rounded-sm bg-slate-500 dark:bg-slate-500 transition-all duration-500 ease-out"
                                style={{ height: isLoaded ? '100%' : '0%', transitionDelay: `${(i + 33) * 20}ms` }}
                            ></div>
                        ))}
                        {/* Sale - Slate 300 - 5 bars */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                                key={`sale-${i}`} 
                                className="w-1.5 rounded-sm bg-slate-300 dark:bg-slate-700 transition-all duration-500 ease-out"
                                style={{ height: isLoaded ? '100%' : '0%', transitionDelay: `${(i + 38) * 20}ms` }}
                            ></div>
                        ))}
                    </div>

                    <div className="space-y-5 mt-auto">
                        {[
                            { label: 'Investment', val: '$12,800', color: 'text-slate-900 dark:text-slate-200' },
                            { label: 'Holiday', val: '$8,450', color: 'text-blue-500' },
                            { label: 'Home', val: '$7,200', color: 'text-blue-300' },
                            { label: 'Setup', val: '$3,200', color: 'text-slate-500' },
                            { label: 'Sale', val: '$950', color: 'text-slate-300' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={18} className={`${item.color}`} />
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white">{item.val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Graphs Row */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sector Wise Revenue - Pie Chart */}
                <div className="flex-1 bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Sector wise revenue</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                        <feOffset in="blur" dx="2" dy="4" result="offsetBlur" />
                                        <feMerge>
                                            <feMergeNode in="offsetBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <Pie
                                    data={sectorRevenueData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={6}
                                    stroke="none"
                                >
                                    {sectorRevenueData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color} 
                                            style={{ filter: 'url(#shadow)' }}
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth={1}
                                        />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Market Growth Rate - Line Chart */}
                <div className="flex-1 bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Market Growth Rate (%) over time by Sector</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={marketGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Legend />
                                {growthKeys.map((key, index) => (
                                    <Line 
                                        key={key}
                                        type="monotone" 
                                        dataKey={key} 
                                        stroke={index === 0 ? "#0f172a" : index === 1 ? "#3b82f6" : "#93c5fd"} 
                                        strokeWidth={3} 
                                        dot={{ r: 4 }} 
                                        activeDot={{ r: 6 }} 
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Three New Tiles Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tile 1: Radial Bar Chart */}
                <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity Distribution</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart 
                                cx="50%" 
                                cy="50%" 
                                innerRadius="30%" 
                                outerRadius="100%" 
                                barSize={10} 
                                data={radialData}
                                startAngle={180} 
                                endAngle={-180}
                            >
                                <RadialBar
                                    minAngle={15}
                                    background
                                    clockWise
                                    dataKey="uv"
                                    cornerRadius={10}
                                />
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tile 2: Pyramid Chart (SVG) */}
                <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Risk Analysis</h3>
                    <div className="h-64 w-full flex items-center justify-center p-4">
                        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl group">
                            {/* Top - Slate 900 - 10% */}
                            <g className="hover:scale-105 transition-transform duration-300 origin-[100px_40px] cursor-pointer hover:opacity-90">
                                <path d="M100 20 L120 60 H80 Z" fill="#0f172a" />
                                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="pointer-events-none">10%</text>
                            </g>
                            
                            {/* Middle Top - Blue 500 - 50% */}
                            <g className="hover:scale-105 transition-transform duration-300 origin-[100px_85px] cursor-pointer hover:opacity-90">
                                <path d="M80 60 H120 L145 110 H55 Z" fill="#3b82f6" />
                                <text x="100" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">50%</text>
                            </g>
                            
                            {/* Middle Bottom - Slate 500 - 30% */}
                            <g className="hover:scale-105 transition-transform duration-300 origin-[100px_130px] cursor-pointer hover:opacity-90">
                                <path d="M55 110 H145 L165 150 H35 Z" fill="#64748b" />
                                <text x="100" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">30%</text>
                            </g>
                            
                            {/* Bottom - Slate 300 - 10% */}
                            <g className="hover:scale-105 transition-transform duration-300 origin-[100px_165px] cursor-pointer hover:opacity-90">
                                <path d="M35 150 H165 L180 180 H20 Z" fill="#cbd5e1" />
                                <text x="100" y="170" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" className="pointer-events-none">10%</text>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Tile 3: Growth Milestones */}
                <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Growth Milestones</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={milestoneData} margin={{ top: 50, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMilestone" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="20%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="40%" stopColor="#0f172a" stopOpacity={0.8}/>
                                        <stop offset="50%" stopColor="#64748b" stopOpacity={0.8}/>
                                        <stop offset="80%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#374151" opacity={0.1} />
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Area 
                                    type="monotone" 
                                    dataKey="y" 
                                    stroke="none" 
                                    fill="url(#colorMilestone)" 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="y" 
                                    stroke="none" 
                                    dot={(props) => <CustomPin {...props} stroke={
                                        props.index === 1 ? '#3b82f6' : 
                                        props.index === 2 ? '#0f172a' : 
                                        props.index === 3 ? '#64748b' : 
                                        props.index === 4 ? '#3b82f6' : 
                                        props.index === 5 ? '#93c5fd' : 'transparent'
                                    } />} 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table Row */}
            <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Latest Founder Leads</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tracking high potential founders</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search founders..."
                                className="pl-9 pr-4 py-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 w-64"
                            />
                        </div>
                        <button className="p-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-[#3f3f46]">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 dark:bg-[#27272a]/50 border-b border-gray-200 dark:border-[#27272a]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                                        Founder Name <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Traits</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                                        Due Date <ChevronDown size={12} />
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
                            {tableData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-[#27272a]/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                                                {row.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{row.name}</div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Linkedin size={12} className="text-blue-500 cursor-pointer" />
                                                    <Globe size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {row.traits.map((trait, i) => (
                                                <Tag key={i} label={trait} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{row.company}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#27272a] px-2 py-1 rounded w-fit">
                                            <Clock size={12} />
                                            {row.dueDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 border-t border-gray-200 dark:border-[#27272a] flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Showing 5 of 24 founders</span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-gray-200 dark:border-[#27272a] rounded hover:bg-gray-50 dark:hover:bg-[#27272a] disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border border-gray-200 dark:border-[#27272a] rounded hover:bg-gray-50 dark:hover:bg-[#27272a]">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
