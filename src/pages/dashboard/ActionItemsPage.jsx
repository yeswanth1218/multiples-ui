import React, { useState } from 'react';
import {
    Plus,
    ChevronDown,
    ChevronRight,
    Paperclip,
    MessageSquare,
    Calendar,
    User,
    MoreHorizontal,
    CheckCircle,
    Circle,
    AlertCircle,
    Filter,
    Search,
    Upload,
    FileText
} from 'lucide-react';

const ActionItemsPage = () => {
    const [expandedRows, setExpandedRows] = useState({ 2: true }); // Default expand 2nd item for demo
    const [items, setItems] = useState([
        {
            id: 1,
            date: '2025-08-09',
            section: 'Strategy & Vision',
            title: 'Prepare a Sector Strategy & get it approved post discussion',
            eta: '2025-10-09',
            status: 'Done',
            owner: 'Shanil',
            progress: 100,
            subItems: [],
            notes: 2,
            files: 1
        },
        {
            id: 2,
            date: '2025-08-09',
            section: 'Strategy & Vision',
            title: 'Prepare HR Strategy & Get it approved',
            eta: '2026-03-31',
            status: 'In-Progress',
            owner: 'Shanil',
            progress: 50,
            subItems: [
                { id: 21, title: 'Filed DRFP approval is done', completed: true },
                { id: 22, title: 'Already obtained Permission', completed: true },
                { id: 23, title: 'Action item 2 completed', completed: true },
                { id: 24, title: 'Final review pending', completed: false }
            ],
            notes: 5,
            files: 3
        },
        {
            id: 3,
            date: '2025-08-09',
            section: 'Exit Strategy',
            title: 'Prepare Exit Road map & discuss with board - IPO',
            eta: '2026-03-31',
            status: 'In-Progress',
            owner: 'Shanil',
            progress: 20,
            subItems: [],
            notes: 1,
            files: 0
        },
        {
            id: 4,
            date: '2025-08-09',
            section: 'Strategy & Vision',
            title: 'Action Item 24',
            eta: '',
            status: 'Blocked',
            owner: '',
            progress: 0,
            subItems: [],
            notes: 0,
            files: 0
        }
    ]);

    const toggleExpand = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Done': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20';
            case 'In-Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
            case 'Blocked': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Action Items</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage checklists, ticketing, and assignments</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#3f3f46] transition-colors text-sm font-medium">
                        <Upload size={16} />
                        Import
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium shadow-lg shadow-black/20 dark:shadow-white/10">
                        <Plus size={16} />
                        New Item
                    </button>
                </div>
            </div>

            <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] rounded-xl border border-gray-200/60 dark:border-white/10 shadow-sm overflow-hidden flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 dark:border-[#27272a] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search action items..."
                                className="pl-9 pr-4 py-2 w-full bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                            />
                        </div>
                        <button className="p-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-[#3f3f46]">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-auto flex-1">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead className="bg-gray-50/50 dark:bg-[#27272a]/50 sticky top-0 z-10 backdrop-blur-sm">
                            <tr>
                                <th className="w-10 px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"></th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sno</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Section</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-1/3">Action Item</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">End ETA</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Owner</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Progress</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
                            {items.map((item) => (
                                <React.Fragment key={item.id}>
                                    {/* Main Row */}
                                    <tr className={`group hover:bg-gray-50/80 dark:hover:bg-[#27272a]/50 transition-colors ${expandedRows[item.id] ? 'bg-gray-50/50 dark:bg-[#27272a]/30' : ''}`}>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleExpand(item.id)}
                                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-[#3f3f46] text-gray-400 transition-colors"
                                            >
                                                {expandedRows[item.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium whitespace-nowrap">{item.date}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-[#27272a] text-xs border border-gray-200 dark:border-gray-700">
                                                {item.section}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                                            {item.title}
                                            {item.subItems.length > 0 && (
                                                <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                                                    <CheckCircle size={12} />
                                                    {item.subItems.filter(s => s.completed).length}/{item.subItems.length} sub-items
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            {item.eta ? (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={12} />
                                                    {item.eta}
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.owner ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                                                        {item.owner.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.owner}</span>
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="w-24">
                                                <div className="flex justify-between text-[10px] mb-1 text-gray-500">
                                                    <span>{item.progress}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 dark:bg-[#27272a] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors relative group/btn">
                                                    <MessageSquare size={16} />
                                                    {item.notes > 0 && (
                                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 text-white text-[8px] flex items-center justify-center rounded-full">
                                                            {item.notes}
                                                        </span>
                                                    )}
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors relative">
                                                    <Paperclip size={16} />
                                                    {item.files > 0 && (
                                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 text-white text-[8px] flex items-center justify-center rounded-full">
                                                            {item.files}
                                                        </span>
                                                    )}
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded transition-colors">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expanded Row (Sub-checklist) */}
                                    {expandedRows[item.id] && (
                                        <tr className="bg-gray-50/30 dark:bg-[#27272a]/20 animate-in slide-in-from-top-2 duration-200">
                                            <td colSpan="10" className="px-4 py-4">
                                                <div className="ml-14 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                            <CheckCircle size={14} /> Sub-Checklist
                                                        </h4>
                                                        <button className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
                                                            <Plus size={12} /> Add Sub-item
                                                        </button>
                                                    </div>

                                                    {item.subItems.length > 0 ? (
                                                        <div className="space-y-2">
                                                            {item.subItems.map((sub) => (
                                                                <div key={sub.id} className="flex items-center gap-3 group/sub p-2 rounded hover:bg-white dark:hover:bg-[#27272a] border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all">
                                                                    <button className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${sub.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-green-500'}`}>
                                                                        {sub.completed && <CheckCircle size={10} fill="currentColor" />}
                                                                    </button>
                                                                    <span className={`text-sm ${sub.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                                                        {sub.title}
                                                                    </span>
                                                                    <div className="ml-auto opacity-0 group-hover/sub:opacity-100 flex items-center gap-2">
                                                                        <button className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                                                            <FileText size={12} /> Note
                                                                        </button>
                                                                        <button className="text-xs text-gray-400 hover:text-purple-500 flex items-center gap-1">
                                                                            <Upload size={12} /> File
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-gray-400 italic py-2">No sub-items created yet. Click "Add Sub-item" to start.</div>
                                                    )}
                                                    
                                                    {/* Quick Actions for Item */}
                                                    <div className="mt-4 flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[10px] text-gray-400 font-medium uppercase">Ownership</span>
                                                            <div className="flex items-center gap-2 cursor-pointer hover:bg-white dark:hover:bg-[#27272a] p-1 rounded transition-colors">
                                                                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">S</div>
                                                                <span className="text-xs text-gray-600 dark:text-gray-300">Shanil</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[10px] text-gray-400 font-medium uppercase">Due Date</span>
                                                            <div className="flex items-center gap-2 cursor-pointer hover:bg-white dark:hover:bg-[#27272a] p-1 rounded transition-colors">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                <span className="text-xs text-gray-600 dark:text-gray-300">{item.eta || 'Set Date'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Footer / Pagination */}
                <div className="p-4 border-t border-gray-200 dark:border-[#27272a] flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Showing 4 of 12 action items</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-[#3f3f46] disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-[#3f3f46]">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionItemsPage;
