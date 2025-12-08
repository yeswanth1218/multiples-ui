import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Bell,
    CheckSquare,
    ListTodo,
    BarChart2,
    FileText,
    Mail,
    Workflow,
    Calendar,
    Users,
    Search,
    ChevronRight,
    Moon,
    Sun,
    Home,
    LogOut,
    Plus,
} from 'lucide-react';
import { SidebarItem, SectionHeader } from '../components/dashboard/Shared';
import { useTasks } from '../context/TaskContext';

const DashboardLayout = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { notes } = useTasks();

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

    const getActivePage = () => {
        const path = location.pathname.split('/').pop();
        return path.charAt(0).toUpperCase() + path.slice(1) || 'Home';
    };

    const navItems = [
        { icon: Home, label: 'Home', path: '/dashboard/home' },
        { icon: CheckSquare, label: 'Overview', path: '/dashboard/overview' },
        { icon: ListTodo, label: 'Action Items', path: '/dashboard/action-items', badge: 'New' },
        { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
        { icon: FileText, label: 'Notes', path: '/dashboard/notes' },
        { icon: Mail, label: 'Emails', path: '/dashboard/emails' },
        { icon: Workflow, label: 'Workflow', path: '/dashboard/workflow' },
        { icon: Calendar, label: 'Schedule', path: '/dashboard/schedule' },
        { icon: Users, label: 'Team', path: '/dashboard/team' },
    ];

    return (
        <div className={`flex h-screen bg-gray-50 dark:bg-[#09090b] font-sans transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>

            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-white dark:bg-[#18181b] border-r border-gray-200 dark:border-[#27272a] flex flex-col transition-all duration-300 z-20`}
            >
                <div className="h-16 flex items-center px-6 border-b border-transparent flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold text-xl">
                            M
                        </div>
                        {sidebarOpen && <span className="font-bold text-xl text-gray-900 dark:text-white">Multiples</span>}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
                    <div className="mb-2 px-3 py-2 bg-gray-50 dark:bg-[#27272a] rounded-lg flex items-center gap-2 text-gray-400">
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
                                active={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                collapsed={!sidebarOpen}
                            />
                        ))}
                    </nav>

                    {sidebarOpen && (
                        <>
                            <SectionHeader 
                                title="Quick Notes" 
                                action 
                                onAction={() => navigate('/dashboard/notes')} 
                            />
                            <div className="mt-1 mb-4 space-y-1">
                                {notes && notes.length > 0 ? (
                                    notes.slice(0, 5).map(note => (
                                        <div 
                                            key={note.id}
                                            onClick={() => navigate('/dashboard/notes')}
                                            className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white cursor-pointer group transition-colors"
                                        >
                                            <div className="w-2 h-2 rounded-full border border-gray-400 group-hover:border-blue-500 transition-colors"></div>
                                            <span className="truncate">{note.title}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-xs text-gray-400 italic">No notes yet</div>
                                )}
                            </div>

                            <SectionHeader title="Your Spaces" action />
                            <SectionHeader title="Folders" action />
                            <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white cursor-pointer">
                                    <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                                    <span>Quno Corp</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white cursor-pointer">
                                    <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                                    <span>Arc Redesign</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white cursor-pointer">
                                    <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                                    <span>Finzo Expansion</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                
                <div className="p-3 border-t border-gray-200 dark:border-[#27272a] flex-shrink-0">
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
                <header className="h-16 bg-white/50 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#27272a] flex items-center justify-between px-6 z-10 sticky top-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2 hover:bg-gray-100 dark:hover:bg-[#27272a] p-1 rounded">
                            <div className="flex flex-col gap-1 w-4">
                                <span className="h-0.5 bg-gray-500 w-full"></span>
                                <span className="h-0.5 bg-gray-500 w-2/3"></span>
                                <span className="h-0.5 bg-gray-500 w-full"></span>
                            </div>
                        </button>
                        <Home size={14} />
                        <ChevronRight size={14} />
                        <span className="text-gray-900 dark:text-white font-medium">{getActivePage()}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard/notifications')}
                            className="p-2 rounded-full bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#3f3f46] transition-colors relative"
                        >
                            <Bell size={18} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#09090b]"></span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#3f3f46] transition-colors"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
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
