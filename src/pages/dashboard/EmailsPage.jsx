import React from 'react';
import { Star, Paperclip, Search } from 'lucide-react';
import { Avatar } from '../../components/dashboard/Shared';

const EmailsPage = () => {
    const emails = [
        { id: 1, sender: 'Dena Neek', subject: 'Re: Investment Proposal', preview: 'Hi Team, thanks for sending this over. We have reviewed the deck and...', time: '10:30 AM', unread: true, hasAttachment: true, starred: true },
        { id: 2, sender: 'Support Team', subject: 'Weekly Analytics Report', preview: 'Your weekly dashboard summary is ready. Click here to view the full...', time: 'Yesterday', unread: false, hasAttachment: false, starred: false },
        { id: 3, sender: 'John Wick', subject: 'Meeting Reschedule', preview: 'Can we push our call to next Tuesday? I have a conflict with...', time: 'Oct 22', unread: false, hasAttachment: false, starred: true },
        { id: 4, sender: 'Sarah Connor', subject: 'Project Updates', preview: 'Here are the latest updates from the engineering team regarding the...', time: 'Oct 20', unread: true, hasAttachment: true, starred: false },
        { id: 5, sender: 'Neo Anderson', subject: 'Matrix Integration', preview: 'The API keys have been generated. Please find the attached doc...', time: 'Oct 18', unread: false, hasAttachment: true, starred: false },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inbox</h2>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search emails..." 
                        className="pl-9 pr-4 py-2 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 w-64"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-[#18181b] rounded-xl border border-gray-200 dark:border-[#27272a] overflow-hidden">
                {emails.map((email) => (
                    <div key={email.id} className={`p-4 border-b border-gray-100 dark:border-[#27272a] last:border-0 hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors flex items-center gap-4 cursor-pointer ${email.unread ? 'bg-gray-50/50 dark:bg-[#27272a]/50' : ''}`}>
                         <div className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                            <Star size={18} fill={email.starred ? "currentColor" : "none"} className={email.starred ? "text-yellow-400" : ""} />
                        </div>
                        <Avatar initials={email.sender.charAt(0)} />
                        
                        <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                            <div className={`col-span-3 text-sm truncate ${email.unread ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                {email.sender}
                            </div>
                            <div className="col-span-7 flex items-center gap-2 overflow-hidden">
                                <span className={`text-sm truncate ${email.unread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {email.subject}
                                </span>
                                <span className="text-sm text-gray-400 truncate">
                                    - {email.preview}
                                </span>
                                {email.hasAttachment && <Paperclip size={14} className="text-gray-400 flex-shrink-0" />}
                            </div>
                            <div className="col-span-2 text-right text-xs text-gray-500 font-medium">
                                {email.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmailsPage;
