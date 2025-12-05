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
        { title: 'FinTech', logo: fintechLogo, count: '124 Projects', desc: 'Financial technology solutions & payments' },
        { title: 'HealthCare', logo: healthcareLogo, count: '86 Active', desc: 'Medical records & patient management' },
        { title: 'AI & ML', logo: aiLogo, count: '45 Models', desc: 'Artificial intelligence & automation' },
        { title: 'SaaS', icon: Cloud, count: '210 Products', desc: 'Software as a service platforms' },
        { title: 'Agritech', logo: agritechLogo, count: '32 Farms', desc: 'Agricultural innovation & tracking' },
        { title: 'Pharma', logo: pharmaLogo, count: '18 Labs', desc: 'Pharmaceutical research & trials' },
        { title: 'Manufacturing', logo: manufacturingLogo, count: '64 Units', desc: 'Industrial production & supply chain' },
        { title: 'EduTech', logo: edtechLogo, count: '95 Courses', desc: 'Educational technology & LMS' },
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
                        className="relative bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-xl border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.12),0_16px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.5),0_16px_32px_rgba(0,0,0,0.4)] hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 cursor-pointer group hover:-translate-y-1 flex flex-col overflow-hidden"
                    >
                        
                        {/* Count Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-2 py-1 rounded text-[10px] font-semibold bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 uppercase tracking-wide">
                                {sector.count}
                            </span>
                        </div>

                        {/* Icon Section - Centered & Pill shaped */}
                        <div className="flex-1 flex items-center justify-center py-8 min-h-[140px] relative z-10">
                            <div className="px-6 py-3 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                {sector.logo ? (
                                    <img src={sector.logo} alt={sector.title} className="w-8 h-8 object-contain dark:invert dark:brightness-200" />
                                ) : (
                                    <sector.icon size={24} className="text-gray-900 dark:text-white" />
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
