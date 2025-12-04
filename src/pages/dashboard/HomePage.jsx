import React from 'react';
import { ChevronRight, Cloud } from 'lucide-react';

// Import logo images
import fintechLogo from '../../assets/fintech.png';
import healthcareLogo from '../../assets/healthcare.png';
import aiLogo from '../../assets/AI.png';
import agritechLogo from '../../assets/agritech.png';
import pharmaLogo from '../../assets/pharma.png';
import manufacturingLogo from '../../assets/manufacturing.png';
import edtechLogo from '../../assets/ed-tech.png';

const HomePage = () => {
    const sectors = [
        { title: 'FinTech', logo: fintechLogo, count: '124 Projects', desc: 'Financial technology solutions & payments', color: 'bg-blue-100 dark:bg-blue-900/30' },
        { title: 'HealthCare', logo: healthcareLogo, count: '86 Active', desc: 'Medical records & patient management', color: 'bg-red-100 dark:bg-red-900/30' },
        { title: 'AI & ML', logo: aiLogo, count: '45 Models', desc: 'Artificial intelligence & automation', color: 'bg-purple-100 dark:bg-purple-900/30' },
        { title: 'SaaS', icon: Cloud, count: '210 Products', desc: 'Software as a service platforms', color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' },
        { title: 'Agritech', logo: agritechLogo, count: '32 Farms', desc: 'Agricultural innovation & tracking', color: 'bg-green-100 dark:bg-green-900/30' },
        { title: 'Pharma', logo: pharmaLogo, count: '18 Labs', desc: 'Pharmaceutical research & trials', color: 'bg-teal-100 dark:bg-teal-900/30' },
        { title: 'Manufacturing', logo: manufacturingLogo, count: '64 Units', desc: 'Industrial production & supply chain', color: 'bg-orange-100 dark:bg-orange-900/30' },
        { title: 'EduTech', logo: edtechLogo, count: '95 Courses', desc: 'Educational technology & LMS', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Industry Sectors</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Overview of all active domains</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sectors.map((sector, index) => (
                    <div key={index} className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.12),0_16px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.5),0_16px_32px_rgba(0,0,0,0.4)] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-lg ${sector.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 overflow-hidden`}>
                            {sector.logo ? (
                                <img src={sector.logo} alt={sector.title} className="w-8 h-8 object-contain dark:invert dark:brightness-200" />
                            ) : (
                                <sector.icon size={24} />
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{sector.title}</h3>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{sector.count}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{sector.desc}</p>
                        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-[#27272a] flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#27272a] border-2 border-white dark:border-[#18181b]"></div>
                                ))}
                            </div>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
