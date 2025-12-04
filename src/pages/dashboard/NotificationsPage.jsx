import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';

const NotificationsPage = () => {
    const notifications = [
        { id: 1, type: 'alert', title: 'New Investment Opportunity', message: 'Quno Corp has opened a new Series B round.', time: '2 hours ago', read: false },
        { id: 2, type: 'success', title: 'Task Completed', message: 'Due diligence for Figma is 100% complete.', time: '5 hours ago', read: true },
        { id: 3, type: 'info', title: 'System Update', message: 'Platform maintenance scheduled for tonight at 2 AM.', time: '1 day ago', read: true },
        { id: 4, type: 'message', title: 'New Comment', message: 'Sarah Connor commented on the Loom deal.', time: '1 day ago', read: false },
        { id: 5, type: 'alert', title: 'Meeting Reminder', message: 'Meeting with John Wick in 30 minutes.', time: '2 days ago', read: true },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'alert': return <AlertCircle className="text-amber-500" size={20} />;
            case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
            case 'info': return <Info className="text-blue-500" size={20} />;
            default: return <Bell className="text-gray-500" size={20} />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">Stay updated with latest activities</span>
            </div>

            <div className="bg-white dark:bg-[#18181b] rounded-xl border border-gray-200 dark:border-[#27272a] overflow-hidden">
                {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b border-gray-100 dark:border-[#27272a] last:border-0 hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors flex items-start gap-4 ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                        <div className="mt-1 bg-gray-100 dark:bg-[#27272a] p-2 rounded-lg">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {notification.title}
                                    {!notification.read && <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
                                </h3>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock size={12} /> {notification.time}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;
