import React from 'react';
import { Clock, MapPin, MoreHorizontal } from 'lucide-react';

const SchedulePage = () => {
    const events = [
        { id: 1, title: 'Weekly Team Sync', time: '09:00 AM - 10:00 AM', location: 'Conference Room A', type: 'Internal', color: 'border-l-4 border-blue-500' },
        { id: 2, title: 'Client Call: Loom', time: '11:30 AM - 12:30 PM', location: 'Google Meet', type: 'External', color: 'border-l-4 border-green-500' },
        { id: 3, title: 'Lunch Break', time: '01:00 PM - 02:00 PM', location: 'Cafeteria', type: 'Personal', color: 'border-l-4 border-gray-300' },
        { id: 4, title: 'Project Review: Figma', time: '03:00 PM - 04:30 PM', location: 'Zoom', type: 'Work', color: 'border-l-4 border-purple-500' },
    ];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDay = 24; // Mock

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">October 2025</div>
            </div>

            {/* Calendar Strip Mock */}
            <div className="flex justify-between items-center bg-white dark:bg-[#18181b] p-4 rounded-xl border border-gray-200 dark:border-[#27272a] mb-6">
                {days.map((day, i) => {
                    const date = 21 + i;
                    const isActive = date === currentDay;
                    return (
                        <div key={day} className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#27272a]'}`}>
                            <span className="text-xs font-medium mb-1">{day}</span>
                            <span className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{date}</span>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today, Oct 24</h3>
                {events.map((event) => (
                    <div key={event.id} className={`bg-white dark:bg-[#18181b] p-4 rounded-xl border border-gray-200 dark:border-[#27272a] shadow-sm hover:shadow-md transition-shadow flex items-center justify-between ${event.color}`}>
                        <div className="flex-1">
                            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">{event.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                             <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-[#27272a] text-gray-600 dark:text-gray-300">{event.type}</span>
                             <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchedulePage;
