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
        },
        {
            title: 'HealthCare',
            logo: healthcareLogo,
            count: '8 Projects',
            desc: 'Medical records & patient management',
        },
        {
            title: 'AI & ML',
            logo: aiLogo,
            count: '5 Projects',
            desc: 'Artificial intelligence & automation',
        },
        {
            title: 'SaaS',
            icon: Cloud,
            count: '10 Projects',
            desc: 'Software as a service platforms',
        },
        {
            title: 'Agritech',
            logo: agritechLogo,
            count: '6 Projects',
            desc: 'Agricultural innovation & tracking',
        },
        {
            title: 'Pharma',
            logo: pharmaLogo,
            count: '4 Projects',
            desc: 'Pharmaceutical research & trials',
        },
        {
            title: 'Manufacturing',
            logo: manufacturingLogo,
            count: '9 Projects',
            desc: 'Industrial production & supply chain',
        },
        {
            title: 'EduTech',
            logo: edtechLogo,
            count: '7 Projects',
            desc: 'Educational technology & LMS',
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-brand-dark dark:text-white">Industry Sectors</h2>
                <span className="text-sm text-brand-secondary dark:text-brand-muted">Overview of all active domains</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sectors.map((sector, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/dashboard/sector/${sector.title.toLowerCase()}`)}
                        className="relative bg-white dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-2xl border border-brand-secondary/30 dark:border-white/10 shadow-lg shadow-brand-secondary/10 dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] hover:border-brand-primary/50 dark:hover:border-white/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1 flex flex-col overflow-hidden"
                    >

                        {/* Count Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-2 py-1 rounded text-[10px] font-semibold bg-brand-primary text-white border border-transparent shadow-sm uppercase tracking-wide">
                                {sector.count}
                            </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center py-8 min-h-[140px] relative z-10">
                            <div className={`px-6 py-3 rounded-full border border-brand-primary/10 bg-brand-primary/5 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                {sector.logo ? (
                                    <img src={sector.logo} alt={sector.title} className="w-8 h-8 object-contain dark:brightness-0 dark:invert" />
                                ) : (
                                    <sector.icon size={24} className="text-brand-primary" />
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="mt-auto relative z-10">
                            <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">{sector.title}</h3>
                            <p className="text-sm text-brand-muted dark:text-brand-muted/80 leading-relaxed">{sector.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
