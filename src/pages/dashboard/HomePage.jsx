import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Upload, Check } from 'lucide-react';
import { useSectors } from '../../context/SectorContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { sectors, addSector, AVAILABLE_ICONS, AVAILABLE_LOGOS } = useSectors();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSector, setNewSector] = useState({
        title: '',
        desc: '',
        iconName: '',
        logo: null
    });
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(null);

    const handleAddSector = () => {
        if (!newSector.title) return;
        
        addSector({
            ...newSector,
            iconName: selectedIcon?.name,
            logo: selectedLogo?.logo
        });
        
        setIsModalOpen(false);
        setNewSector({ title: '', desc: '', iconName: '', logo: null });
        setSelectedIcon(null);
        setSelectedLogo(null);
    };

    const getIconComponent = (iconName) => {
        const iconObj = AVAILABLE_ICONS.find(i => i.name === iconName);
        return iconObj ? iconObj.icon : null;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark dark:text-white">Sectors</h2>
                    <p className="text-sm text-brand-secondary dark:text-brand-muted mt-1">Detailed breakdown by domain</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Add Sector
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sectors.map((sector, index) => {
                    const IconComponent = sector.iconName ? getIconComponent(sector.iconName) : null;
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(`/dashboard/action-items`)}
                            className="relative bg-white dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-6 rounded-2xl border border-brand-secondary/30 dark:border-white/10 shadow-lg shadow-brand-secondary/10 dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] hover:border-brand-primary/50 dark:hover:border-white/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1 flex flex-col overflow-hidden"
                        >

                            <div className="flex-1 flex items-center justify-center py-8 min-h-[140px] relative z-10">
                                <div className={`px-6 py-3 rounded-full border border-brand-primary/10 bg-brand-primary/5 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                    {sector.logo ? (
                                        <img src={sector.logo} alt={sector.title} className="w-8 h-8 object-contain dark:brightness-0 dark:invert" />
                                    ) : IconComponent ? (
                                        <IconComponent size={24} className="text-brand-primary" />
                                    ) : (
                                        <Building2 size={24} className="text-brand-primary" />
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="mt-auto relative z-10">
                                <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">{sector.title}</h3>
                                <p className="text-sm text-brand-muted dark:text-brand-muted/80 leading-relaxed">{sector.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Sector Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Sector</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sector Name</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. Artificial Intelligence"
                                    value={newSector.title}
                                    onChange={(e) => setNewSector({...newSector, title: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-brand-dark/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                                <textarea 
                                    placeholder="Briefly describe this sector..."
                                    rows={3}
                                    value={newSector.desc}
                                    onChange={(e) => setNewSector({...newSector, desc: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-brand-dark/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Choose an Icon or Logo</label>
                                
                                <div className="space-y-3">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Standard Icons</span>
                                    <div className="grid grid-cols-4 gap-3">
                                        {AVAILABLE_ICONS.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => {
                                                    setSelectedIcon(item);
                                                    setSelectedLogo(null);
                                                }}
                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedIcon?.name === item.name ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-sm' : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'}`}
                                            >
                                                <item.icon size={24} />
                                                <span className="text-[10px] mt-1 truncate w-full text-center">{item.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Industry Logos</span>
                                    <div className="grid grid-cols-4 gap-3">
                                        {AVAILABLE_LOGOS.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => {
                                                    setSelectedLogo(item);
                                                    setSelectedIcon(null);
                                                }}
                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedLogo?.name === item.name ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                            >
                                                <img src={item.logo} alt={item.name} className={`w-6 h-6 object-contain ${selectedLogo?.name === item.name ? '' : 'grayscale opacity-50'} dark:brightness-0 dark:invert`} />
                                                <span className="text-[10px] mt-1 text-gray-500 dark:text-gray-400 truncate w-full text-center">{item.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-brand-dark/20 flex gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddSector}
                                disabled={!newSector.title}
                                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${newSector.title ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}
                            >
                                <Check size={18} />
                                Create Sector
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
