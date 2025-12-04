import React from 'react';
import { Mail, Phone, MoreVertical } from 'lucide-react';
import { Avatar } from '../../components/dashboard/Shared';

const TeamPage = () => {
    const team = [
        { id: 1, name: 'Alex Morgan', role: 'Product Manager', email: 'alex@multiples.com', status: 'Active', initials: 'AM' },
        { id: 2, name: 'Sarah Connor', role: 'Engineering Lead', email: 'sarah@multiples.com', status: 'In Meeting', initials: 'SC' },
        { id: 3, name: 'John Wick', role: 'Security Analyst', email: 'john@multiples.com', status: 'Offline', initials: 'JW' },
        { id: 4, name: 'Neo Anderson', role: 'Frontend Dev', email: 'neo@multiples.com', status: 'Active', initials: 'NA' },
        { id: 5, name: 'Trinity', role: 'Backend Dev', email: 'trinity@multiples.com', status: 'Active', initials: 'TR' },
        { id: 6, name: 'Morpheus', role: 'Team Lead', email: 'morpheus@multiples.com', status: 'Away', initials: 'MO' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-500';
            case 'In Meeting': return 'bg-amber-500';
            case 'Offline': return 'bg-gray-400';
            case 'Away': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{team.length} active members</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-[#27272a] flex flex-col items-center text-center relative hover:shadow-lg transition-shadow group">
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={16} />
                        </button>
                        
                        <div className="relative mb-4">
                            <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {member.initials}
                            </div>
                            <span className={`absolute bottom-1 right-1 w-4 h-4 border-2 border-white dark:border-[#18181b] rounded-full ${getStatusColor(member.status)}`}></span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.role}</p>
                        
                        <div className="flex items-center gap-2 w-full mt-auto">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors text-sm font-medium">
                                <Mail size={14} /> Email
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 dark:bg-[#27272a] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors text-sm font-medium">
                                <Phone size={14} /> Call
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamPage;
