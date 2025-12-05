import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, TrendingUp, Users, ArrowRight } from 'lucide-react';

const SectorPage = () => {
    const { sectorId } = useParams();
    const navigate = useNavigate();

    // Dummy data for companies (specifically for FinTech/General)
    const companies = [
        {
            id: 'razorpay',
            name: 'Razorpay',
            description: 'Payment gateway and financial services platform for businesses.',
            valuation: '$7.5B',
            status: 'Active',
            logo: null // Placeholder
        },
        {
            id: 'phonepe',
            name: 'PhonePe',
            description: 'Digital payments and financial services company.',
            valuation: '$12B',
            status: 'Active',
            logo: null
        },
        {
            id: 'cred',
            name: 'CRED',
            description: 'Reward-based credit card payments app.',
            valuation: '$6.4B',
            status: 'Watchlist',
            logo: null
        },
        {
            id: 'zerodha',
            name: 'Zerodha',
            description: 'Financial services company offering retail brokerage.',
            valuation: '$2B',
            status: 'Active',
            logo: null
        },
        {
            id: 'groww',
            name: 'Groww',
            description: 'Online investment platform for stocks and mutual funds.',
            valuation: '$3B',
            status: 'Active',
            logo: null
        },
         {
            id: 'policybazaar',
            name: 'PolicyBazaar',
            description: 'Insurance aggregator and financial technology company.',
            valuation: '$5.5B',
            status: 'Exit',
            logo: null
        }
    ];

    // Filter companies based on sector if needed, for now showing all for the selected sector
    // In a real app, we would fetch companies by sectorId

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/dashboard/home')}>Home</span>
                        <span>/</span>
                        <span className="capitalize">{sectorId}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{sectorId} Portfolio</h2>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/home')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                >
                    Back to Sectors
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                    <div 
                        key={company.id} 
                        onClick={() => navigate(`/dashboard/company/${company.id}`)}
                        className="group bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Building2 size={24} />
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold border ${
                                company.status === 'Active' 
                                    ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-900/30'
                                    : company.status === 'Watchlist'
                                    ? 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/30'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                            }`}>
                                {company.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {company.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            {company.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                <TrendingUp size={16} className="text-green-500" />
                                {company.valuation}
                            </div>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                View Details <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectorPage;
