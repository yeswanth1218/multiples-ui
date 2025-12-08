import React from 'react';
import { useTasks } from '../../context/TaskContext';
import {
    MoreHorizontal,
    Plus,
    CheckCircle,
    Calendar,
} from 'lucide-react';
import { Tag, Avatar, PaperclipIcon, MessageSquareIcon } from '../../components/dashboard/Shared';

const WorkflowPage = () => {
    const { tasks } = useTasks();

    // Helper to map status to column
    const getStatusTasks = (status) => {
        return tasks.filter(t => t.status === status);
    };

    const columns = [
        { title: 'To Do', count: getStatusTasks('To Do').length, color: 'bg-gray-200 dark:bg-gray-700' },
        { title: 'In-Progress', count: getStatusTasks('In-Progress').length, color: 'bg-blue-200 dark:bg-blue-900' },
        { title: 'Blocked', count: getStatusTasks('Blocked').length, color: 'bg-red-200 dark:bg-red-900' },
        { title: 'Done', count: getStatusTasks('Done').length, color: 'bg-green-200 dark:bg-green-900' },
    ];

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Product Roadmap</h2>
                <div className="flex gap-2">
                    <div className="flex -space-x-2 mr-4">
                        <Avatar initials="JS" color="bg-indigo-100" />
                        <Avatar initials="DN" color="bg-pink-100" />
                        <Avatar initials="RM" color="bg-green-100" />
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-[#18181b] flex items-center justify-center text-[10px] text-gray-500">
                            {tasks.length}
                        </div>
                    </div>
                    <button className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg flex items-center gap-2 no-print">
                        <Plus size={14} /> Add Task
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4 workflow-scroll-container">
                <div className="flex gap-6 min-w-[1000px] h-full workflow-container">
                    {columns.map((col, i) => (
                        <div key={i} className="flex-1 min-w-[280px] flex flex-col bg-gray-50/80 dark:bg-gradient-to-b dark:from-[#1a1a1a]/80 dark:to-[#0f0f0f]/80 rounded-xl p-4 border border-gray-200/50 dark:border-white/5 ring-1 ring-gray-100 dark:ring-white/5 workflow-column">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                                    {col.title}
                                </span>
                                <span className="bg-white dark:bg-[#27272a] text-gray-500 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full border border-gray-200 dark:border-[#3f3f46]">
                                    {col.count}
                                </span>
                            </div>

                            <div className="space-y-3 overflow-y-auto pr-1">
                                {getStatusTasks(col.title).map((task, idx) => (
                                    <div key={idx} className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] p-4 rounded-lg border border-gray-200/60 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.12),0_16px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.5),0_16px_32px_rgba(0,0,0,0.4)] hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 cursor-grab active:cursor-grabbing">
                                        <div className="flex justify-between items-start mb-2">
                                            <Tag label={task.priority || 'Normal'} />
                                            <MoreHorizontal size={14} className="text-gray-400 cursor-pointer no-print" />
                                        </div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 leading-snug">{task.title}</h4>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-3 truncate">{task.section}</div>
                                        
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex -space-x-1.5">
                                                <Avatar initials={getInitials(task.assignee)} />
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                <PaperclipIcon size={12} /> {task.attachments?.length || 0}
                                                <MessageSquareIcon size={12} className="ml-1" /> {task.comments?.length || 0}
                                            </div>
                                        </div>

                                        {(task.eta || (task.subItems && task.subItems.length > 0)) && (
                                            <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                                {task.eta && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                        <Calendar size={12} />
                                                        <span>{task.eta.split('-').slice(1).join('/')}</span>
                                                    </div>
                                                )}
                                                {task.subItems && task.subItems.length > 0 && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                        <CheckCircle size={12} />
                                                        <span>{task.subItems.filter(s => s.completed).length}/{task.subItems.length}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button className="mt-3 w-full py-2 flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-200 dark:hover:bg-[#27272a] rounded-lg transition-colors text-sm font-medium border border-dashed border-gray-300 dark:border-[#3f3f46] no-print">
                                <Plus size={14} /> Add Item
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkflowPage;
