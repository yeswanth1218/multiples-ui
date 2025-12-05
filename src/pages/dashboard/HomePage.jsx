import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud } from 'lucide-react';

// Import logo images
import fintechLogo from '../../assets/fintech.png';
import healthcareLogo from '../../assets/healthcare.png';
import aiLogo from '../../assets/AI.png';
import agritechLogo from '../../assets/agritech.png';
import pharmaLogo from '../../assets/pharma.png';
import manufacturingLogo from '../../assets/manufacturing.png';
import edtechLogo from '../../assets/ed-tech.png';

const HomePage = () => {
    const navigate = useNavigate();

    const sectors = [
        { 
            title: 'FinTech', 
            logo: fintechLogo, 
            count: '12 Projects', 
            desc: 'Financial technology solutions & payments',
            theme: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/50 shadow-blue-100 dark:shadow-blue-900/20'
        },
        { 
            title: 'HealthCare', 
            logo: healthcareLogo, 
            count: '8 Projects', 
            desc: 'Medical records & patient management',
            theme: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700/50 shadow-emerald-100 dark:shadow-emerald-900/20'
        },
        { 
            title: 'AI & ML', 
            logo: aiLogo, 
            count: '5 Projects', 
            desc: 'Artificial intelligence & automation',
            theme: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700/50 shadow-purple-100 dark:shadow-purple-900/20'
        },
        { 
            title: 'SaaS', 
            icon: Cloud, 
            count: '10 Projects', 
            desc: 'Software as a service platforms',
            theme: 'bg-sky-50 border-sky-200 dark:bg-sky-900/20 dark:border-sky-700/50 shadow-sky-100 dark:shadow-sky-900/20 text-sky-600 dark:text-sky-400'
        },
        { 
            title: 'Agritech', 
            logo: agritechLogo, 
            count: '6 Projects', 
            desc: 'Agricultural innovation & tracking',
            theme: 'bg-lime-50 border-lime-200 dark:bg-lime-900/20 dark:border-lime-700/50 shadow-lime-100 dark:shadow-lime-900/20'
        },
        { 
            title: 'Pharma', 
            logo: pharmaLogo, 
            count: '4 Projects', 
            desc: 'Pharmaceutical research & trials',
            theme: 'bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-700/50 shadow-teal-100 dark:shadow-teal-900/20'
        },
        { 
            title: 'Manufacturing', 
            logo: manufacturingLogo, 
            count: '9 Projects', 
            desc: 'Industrial production & supply chain',
            theme: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700/50 shadow-orange-100 dark:shadow-orange-900/20'
        },
        { 
            title: 'EduTech', 
            logo: edtechLogo, 
            count: '7 Projects', 
            desc: 'Educational technology & LMS',
            theme: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/50 shadow-amber-100 dark:shadow-amber-900/20'
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Industry Sectors</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Overview of all active domains</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sectors.map((sector, index) => (
                    <div 
                        key={index} 
                        onClick={() => navigate(`/dashboard/sector/${sector.title.toLowerCase()}`)}
                        className="relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:from-gray-800/90 dark:via-gray-800/60 dark:to-gray-800/30 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_rgba(31,38,135,0.25)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/80 dark:hover:border-white/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1 flex flex-col overflow-hidden"
                    >
                        
                        {/* Count Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-2 py-1 rounded text-[10px] font-semibold bg-gray-900 text-white dark:bg-white dark:text-black border border-transparent shadow-sm uppercase tracking-wide">
                                {sector.count}
                            </span>
                        </div>

                        {/* Icon Section - Centered & Pill shaped */}
                        <div className="flex-1 flex items-center justify-center py-8 min-h-[140px] relative z-10">
                            <div className={`px-6 py-3 rounded-full border shadow-md flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${sector.theme}`}>
                                {sector.logo ? (
                                    <img src={sector.logo} alt={sector.title} className="w-8 h-8 object-contain dark:invert dark:brightness-200" />
                                ) : (
                                    <sector.icon size={24} />
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="mt-auto relative z-10">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{sector.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{sector.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
