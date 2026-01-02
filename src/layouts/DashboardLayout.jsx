import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import multiplesLogo from '../assets/multiples.png';
import {
    Bell,
    CheckSquare,
    ListTodo,
    BarChart2,
    FileText,
    Workflow,
    Search,
    ChevronRight,
    Moon,
    Sun,
    Home,
    LogOut,
    Plus,
    Printer,
} from 'lucide-react';
import { SidebarItem } from '../components/dashboard/Shared';

const DashboardLayout = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Apply dark mode class on mount and when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const getBreadcrumbs = () => {
        const parts = location.pathname.split('/').filter(Boolean);
        // parts will be ['dashboard', 'home'] or ['dashboard', 'sector', 'bfsi']
        
        const breadcrumbs = [];
        
        if (parts.includes('sector') || parts.includes('company') || parts.includes('portfolio')) {
            breadcrumbs.push('Portfolio');
            if (parts.includes('sector')) breadcrumbs.push('Sector');
            if (parts.includes('company')) breadcrumbs.push('Company');
            
            const lastPart = parts[parts.length - 1];
            if (lastPart !== 'portfolio' && lastPart !== 'sector' && lastPart !== 'company') {
                breadcrumbs.push(lastPart.charAt(0).toUpperCase() + lastPart.slice(1));
            }
        } else {
            const lastPart = parts[parts.length - 1];
            if (lastPart && lastPart !== 'dashboard') {
                breadcrumbs.push(lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' '));
            } else {
                breadcrumbs.push('Home');
            }
        }
        
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    const navItems = [
        { icon: Home, label: 'Home', path: '/dashboard/home' },
        { icon: CheckSquare, label: 'Overview', path: '/dashboard/overview' },
        { icon: ListTodo, label: 'Action Items', path: '/dashboard/action-items' },
        { icon: BarChart2, label: 'Portfolio', path: '/dashboard/portfolio' },
        { icon: FileText, label: 'Notes', path: '/dashboard/notes' },
        { icon: Workflow, label: 'Workflow', path: '/dashboard/workflow' },
    ];

    const isItemActive = (itemPath) => {
        if (itemPath === '/dashboard/portfolio') {
            return location.pathname.startsWith('/dashboard/portfolio') || 
                   location.pathname.startsWith('/dashboard/sector') || 
                   location.pathname.startsWith('/dashboard/company');
        }
        return location.pathname === itemPath;
    };

    return (
        <div className={`flex h-screen bg-gray-50 dark:bg-brand-dark font-sans transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>

            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-white dark:bg-brand-surface border-r border-gray-200 dark:border-brand-muted/20 flex flex-col transition-all duration-300 z-20`}
            >
                <div className="h-16 flex items-center px-6 border-b border-transparent flex-shrink-0">
                    <div className="flex items-center gap-2">
                        {sidebarOpen ? (
                            <img src={multiplesLogo} alt="Multiples Logo" className="h-8 object-contain dark:brightness-0 dark:invert" />
                        ) : (
                            <img src={multiplesLogo} alt="M" className="h-8 w-8 object-contain dark:brightness-0 dark:invert" />
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
                    <div className="mb-2 px-3 py-2 bg-gray-50 dark:bg-brand-primary/10 rounded-lg flex items-center gap-2 text-gray-400">
                        <Search size={16} />
                        {sidebarOpen && <input type="text" placeholder="Search here" className="bg-transparent text-sm w-full focus:outline-none text-gray-600 dark:text-gray-200" />}
                        {sidebarOpen && <span className="text-xs border border-gray-200 dark:border-gray-600 px-1.5 rounded bg-white dark:bg-[#3f3f46] dark:text-gray-300">/</span>}
                    </div>

                    <nav className="space-y-1 mt-4">
                        {navItems.map((item) => (
                            <SidebarItem
                                key={item.label}
                                icon={item.icon}
                                label={item.label}
                                badge={item.badge}
                                active={isItemActive(item.path)}
                                onClick={() => navigate(item.path)}
                                collapsed={!sidebarOpen}
                            />
                        ))}
                    </nav>
                </div>

                <div className="p-3 border-t border-gray-200 dark:border-brand-muted/20 flex-shrink-0">
                    <SidebarItem
                        icon={LogOut}
                        label="Logout"
                        active={false}
                        onClick={() => navigate('/')}
                        collapsed={!sidebarOpen}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">

                {/* Top Header */}
                <header className="h-16 bg-white/50 dark:bg-brand-surface/80 backdrop-blur-md border-b border-gray-200 dark:border-brand-muted/20 flex items-center justify-between px-6 z-10 sticky top-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2 hover:bg-gray-100 dark:hover:bg-[#27272a] p-1 rounded">
                            <div className="flex flex-col gap-1 w-4">
                                <span className="h-0.5 bg-gray-500 w-full"></span>
                                <span className="h-0.5 bg-gray-500 w-2/3"></span>
                                <span className="h-0.5 bg-gray-500 w-full"></span>
                            </div>
                        </button>
                        <Home size={14} />
                        {breadcrumbs.map((breadcrumb, index) => (
                            <React.Fragment key={index}>
                                <ChevronRight size={14} />
                                <span className={`${index === breadcrumbs.length - 1 ? 'text-gray-900 dark:text-white font-medium' : ''}`}>
                                    {breadcrumb}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 no-print">
                        <button
                            onClick={() => window.print()}
                            className="p-2 rounded-full bg-gray-100 dark:bg-brand-muted/20 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-brand-muted/30 transition-colors"
                            title="Print Page"
                        >
                            <Printer size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/notifications')}
                            className="p-2 rounded-full bg-gray-100 dark:bg-brand-muted/20 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-brand-muted/30 transition-colors relative"
                        >
                            <Bell size={18} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-white dark:border-brand-dark"></span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-brand-muted/20 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-brand-muted/30 transition-colors"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-semibold text-sm">
                            JS
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
