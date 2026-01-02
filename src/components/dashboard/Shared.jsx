import React from 'react';
import {
    Plus,
    TrendingUp,
    CheckSquare
} from 'lucide-react';

export const SidebarItem = ({ icon, label, active, badge, onClick, collapsed }) => {
    const Icon = icon;
    return (
        <div
            onClick={onClick}
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-white font-medium' : 'text-black dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-brand-primary/10'}`}           title={collapsed ? label : ''}
        >
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <Icon size={18} />
                {!collapsed && <span className="text-sm font-semibold">{label}</span>}
            </div>
            {!collapsed && badge && (
                <span className="bg-gray-200 dark:bg-[#3f3f46] text-xs px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-200">
                    {badge}
                </span>
            )}
        </div>
    );
};

export const SectionHeader = ({ title, action, onAction }) => (
    <div className="flex items-center justify-between px-4 mt-6 mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
        {action && (
            <button
                onClick={onAction}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
                <Plus size={14} />
            </button>
        )}
    </div>
);

export const StatCard = ({ title, subtitle, value, trend, icon, isNegative, colorClass }) => {
    const Icon = icon;
    return (
        <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-brand-surface dark:to-brand-surface p-6 rounded-xl border border-gray-200/60 dark:border-brand-muted/20 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] flex-1 min-w-[240px] transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.12),0_16px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.5),0_16px_32px_rgba(0,0,0,0.4)] hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{subtitle}</p>
                </div>
                <div className={`p-2 rounded-lg ${colorClass || 'bg-gray-50 dark:bg-brand-muted/10 text-gray-400 dark:text-gray-300'}`}>
                    <Icon size={18} />
                </div>
            </div>
            <div className="flex items-end gap-3 mt-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium">
                <span className={`flex items-center ${isNegative ? 'text-red-500' : 'text-emerald-500'}`}>
                    <TrendingUp size={14} className="mr-1" />
                    {trend}
                </span>
                <span className="text-gray-400 ml-1">vs Last Month</span>
            </div>
        </div>
    );
};

export const Tag = ({ label }) => {
    const styles = {
        pink: 'bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-white border-brand-primary/20',
        green: 'bg-brand-dark/10 text-brand-dark dark:bg-brand-secondary/20 dark:text-brand-secondary border-brand-dark/20 dark:border-brand-secondary/20',
        yellow: 'bg-brand-accent/10 text-brand-accent dark:bg-brand-accent/20 dark:text-white border-brand-accent/20',
        blue: 'bg-brand-muted/10 text-brand-muted dark:bg-brand-muted/20 dark:text-brand-muted border-brand-muted/20',
        purple: 'bg-brand-secondary/20 text-brand-dark dark:bg-brand-secondary/10 dark:text-brand-secondary border-brand-secondary/30',
    };

    let colorClass = styles.blue;
    if (label.includes('Serial') || label.includes('Founder') || label.includes('High')) colorClass = styles.pink;
    if (label.includes('Technical') || label.includes('Done')) colorClass = styles.green;
    if (label.includes('Masters') || label.includes('Review')) colorClass = styles.yellow;
    if (label.includes('FAANG') || label.includes('Design')) colorClass = styles.blue;
    if (label.includes('Research')) colorClass = styles.purple;

    return (
        <span className={`text-[10px] px-2.5 py-1 rounded-md font-medium border ${colorClass} whitespace-nowrap`}>
            {label}
        </span>
    );
};

export const Bar = ({ height, color }) => (
    <div
        className={`w-3 sm:w-5 rounded-t-sm transition-all duration-500 flex-shrink-0 ${color}`}
        style={{ height: height }}
    ></div>
);

export const Avatar = ({ initials, color }) => (
    <div className={`w-6 h-6 rounded-full ${color || 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center text-[10px] font-bold text-gray-700 dark:text-gray-300 border-2 border-white dark:border-brand-dark`}>
        {initials}
    </div>
);

export const PaperclipIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
);

export const MessageSquareIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
