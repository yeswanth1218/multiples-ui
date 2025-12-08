import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { 
    ArrowLeft, 
    TrendingUp, 
    DollarSign, 
    Calendar, 
    Users, 
    FileText, 
    Activity, 
    Mail, 
    Phone,
    Globe,
    PieChart,
    MessageSquare,
    File
} from 'lucide-react';

const CompanyPage = () => {
    const { companyId } = useParams();
    const navigate = useNavigate();

    // Dummy Data map
    const companiesData = {
        razorpay: {
            name: 'Razorpay',
            description: 'Razorpay is the only payments solution in India that allows businesses to accept, process and disburse payments with its product suite.',
            founded: '2014',
            valuation: '$7.5B',
            revenue: [
                { year: '2021', amount: '$50M' },
                { year: '2022', amount: '$85M' },
                { year: '2023', amount: '$140M' }
            ]
        },
        phonepe: {
            name: 'PhonePe',
            description: 'PhonePe is an Indian digital payments and financial technology company headquartered in Bengaluru, Karnataka, India.',
            founded: '2015',
            valuation: '$12B',
            revenue: [
                { year: '2021', amount: '$60M' },
                { year: '2022', amount: '$100M' },
                { year: '2023', amount: '$200M' }
            ]
        },
        cred: {
            name: 'CRED',
            description: 'CRED is a members-only club that rewards individuals for their timely credit card bill payments by providing them with exclusive offers.',
            founded: '2018',
            valuation: '$6.4B',
            revenue: [
                { year: '2021', amount: '$10M' },
                { year: '2022', amount: '$40M' },
                { year: '2023', amount: '$80M' }
            ]
        }
    };

    const selectedCompany = companiesData[companyId.toLowerCase()] || {
        name: companyId.charAt(0).toUpperCase() + companyId.slice(1),
        description: 'A leading company in the sector.',
        founded: '2010',
        valuation: '$1B',
        revenue: [
            { year: '2021', amount: '$10M' },
            { year: '2022', amount: '$20M' },
            { year: '2023', amount: '$30M' }
        ]
    };

    const companyData = {
        name: selectedCompany.name,
        description: selectedCompany.description,
        website: `https://${selectedCompany.name.toLowerCase()}.com`,
        founded: selectedCompany.founded,
        headquarters: 'Bangalore, India',
        investment: {
            initialDate: 'May 2018',
            totalInvested: '$45M',
            equity: '12%',
            stage: 'Series E',
            currentValuation: selectedCompany.valuation,
            multiple: '15x'
        },
        contacts: [
            { name: 'Harshil Mathur', role: 'CEO & Co-founder', email: `ceo@${selectedCompany.name.toLowerCase()}.com`, phone: '+91 98765 43210' },
            { name: 'Shashank Kumar', role: 'CTO & Co-founder', email: `cto@${selectedCompany.name.toLowerCase()}.com`, phone: '+91 98765 43211' }
        ],
        advancements: [
            { date: 'Oct 2023', title: 'Launched New Product', desc: 'New 1-click checkout product causing 20% revenue bump.' },
            { date: 'Aug 2023', title: 'Strategic Acquisition', desc: 'Acquired a smaller competitor to enter offline payments market.' },
            { date: 'Jun 2023', title: 'International Expansion', desc: 'Started operations in Southeast Asia.' }
        ],
        revenue: selectedCompany.revenue,
        proposals: [
            { id: 1, title: 'Series F Participation', status: 'Under Review', date: 'Nov 10, 2023' },
            { id: 2, title: 'Board Seat Nomination', status: 'Approved', date: 'Sep 15, 2023' }
        ],
        interactions: [
            { id: 1, type: 'Meeting', date: 'Dec 05, 2023', summary: 'Quarterly Board Meeting', participants: ['Harshil Mathur', 'Partner A'] },
            { id: 2, type: 'Email', date: 'Nov 28, 2023', summary: 'Follow up on Series F timeline', participants: ['Shashank Kumar', 'Associate B'] },
            { id: 3, type: 'Call', date: 'Nov 15, 2023', summary: 'Product Roadmap Review', participants: ['Product Head', 'Analyst C'] }
        ],
        documents: [
            { id: 1, name: 'Q3 2023 Financial Report', type: 'PDF', size: '2.4 MB', date: 'Oct 20, 2023' },
            { id: 2, name: 'Series F Term Sheet', type: 'DOC', size: '1.1 MB', date: 'Nov 01, 2023' },
            { id: 3, name: 'Board Meeting Minutes - Q3', type: 'PDF', size: '1.5 MB', date: 'Oct 25, 2023' }
        ]
    };

    // Transform revenue data for Recharts
    const chartData = companyData.revenue.map(item => ({
        year: item.year,
        value: parseInt(item.amount.replace(/\D/g, '')),
        display: item.amount
    }));

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header / Navigation */}
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors no-print"
                >
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        {companyData.name}
                        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50 font-medium">
                            Active Portfolio
                        </span>
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1"><Globe size={14}/> {companyData.website}</span>
                        <span>•</span>
                        <span>Founded {companyData.founded}</span>
                        <span>•</span>
                        <span>{companyData.headquarters}</span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Overview & Investment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {companyData.description}
                        </p>
                    </div>

                    {/* Investment Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <div className="text-blue-600 dark:text-blue-400 mb-2"><DollarSign size={24} /></div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Total Invested</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{companyData.investment.totalInvested}</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-xl border border-purple-100 dark:border-purple-900/30">
                            <div className="text-purple-600 dark:text-purple-400 mb-2"><PieChart size={24} /></div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Equity Owned</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{companyData.investment.equity}</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-100 dark:border-green-900/30">
                            <div className="text-green-600 dark:text-green-400 mb-2"><TrendingUp size={24} /></div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Current Value</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{companyData.investment.currentValuation}</div>
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">+{companyData.investment.multiple} ROI</div>
                        </div>
                    </div>

                    {/* Recent Advancements */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Activity size={20} /> Recent Advancements
                        </h3>
                        <div className="space-y-6">
                            {companyData.advancements.map((item, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    {idx !== companyData.advancements.length - 1 && (
                                        <div className="absolute left-[19px] top-8 bottom-[-24px] w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                                    )}
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10 z-10">
                                        <Calendar size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{item.date}</div>
                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revenue Growth</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis 
                                        dataKey="year" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value}M`}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ 
                                            backgroundColor: '#fff', 
                                            borderRadius: '8px', 
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                                        }}
                                        formatter={(value) => [`$${value}M`, 'Revenue']}
                                    />
                                    <Bar 
                                        dataKey="value" 
                                        fill="#3b82f6" 
                                        radius={[4, 4, 0, 0]} 
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Previous Interactions */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <MessageSquare size={20} /> Previous Interactions
                        </h3>
                        <div className="space-y-4">
                            {companyData.interactions.map((interaction) => (
                                <div key={interaction.id} className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                        interaction.type === 'Meeting' ? 'bg-purple-100 text-purple-600' : 
                                        interaction.type === 'Email' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                        {interaction.type === 'Meeting' ? <Users size={18} /> : 
                                         interaction.type === 'Email' ? <Mail size={18} /> : <Phone size={18} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{interaction.summary}</h4>
                                            <span className="text-xs text-gray-500">{interaction.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="px-2 py-0.5 rounded bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700">
                                                {interaction.type}
                                            </span>
                                            <span>•</span>
                                            <span>With: {interaction.participants.join(', ')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Contacts & Actions */}
                <div className="space-y-6">
                    {/* Key Contacts */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Users size={20} /> Key Contacts
                        </h3>
                        <div className="space-y-4">
                            {companyData.contacts.map((contact, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                    <div className="font-semibold text-gray-900 dark:text-white">{contact.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{contact.role}</div>
                                    <div className="space-y-1">
                                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                            <Mail size={14} /> {contact.email}
                                        </a>
                                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                            <Phone size={14} /> {contact.phone}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requests & Proposals */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText size={20} /> Requests
                        </h3>
                        <div className="space-y-3">
                            {companyData.proposals.map((prop) => (
                                <div key={prop.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="font-medium text-gray-900 dark:text-white text-sm">{prop.title}</div>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                            prop.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                                        }`}>{prop.status}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">{prop.date}</div>
                                </div>
                            ))}
                            <button className="w-full py-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors no-print">
                                + New Request
                            </button>
                        </div>
                    </div>

                    {/* Mutual Documents */}
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText size={20} /> Mutual Documents
                        </h3>
                        <div className="space-y-3">
                            {companyData.documents.map((doc) => (
                                <div key={doc.id} className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="w-8 h-8 rounded bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mr-3">
                                        <File size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{doc.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span>{doc.date}</span>
                                            <span>•</span>
                                            <span>{doc.size}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors no-print">
                                + Upload Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
