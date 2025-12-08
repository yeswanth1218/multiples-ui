import React, { useState } from 'react';
import { Plus, MoreVertical, Calendar, Link as LinkIcon, X, Check } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const NotesPage = () => {
    const { notes, addNote, updateNote, deleteNote, linkNoteToTask, unlinkNoteFromTask, tasks } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [newNoteData, setNewNoteData] = useState({ title: '', content: '' });

    const handleCreateNote = () => {
        if (!newNoteData.title.trim()) return;
        addNote({
            title: newNoteData.title,
            content: newNoteData.content,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        setIsModalOpen(false);
        setNewNoteData({ title: '', content: '' });
    };

    const handleLinkNote = (taskId) => {
        if (!currentNote) return;
        
        const isLinked = currentNote.linkedTaskIds?.includes(taskId);
        if (isLinked) {
            unlinkNoteFromTask(currentNote.id, taskId);
        } else {
            linkNoteToTask(currentNote.id, taskId);
        }
    };

    const openLinkModal = (note) => {
        setCurrentNote(note);
        setIsLinkModalOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notes</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Your personal scratchpad</span>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} /> New Note
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div key={note.id} className="relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:from-gray-800/90 dark:via-gray-800/60 dark:to-gray-800/30 backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-64">
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg truncate pr-2">{note.title}</h3>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => openLinkModal(note)}
                                    className="p-1.5 text-gray-500 hover:text-blue-500 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    title="Link to Action Item"
                                >
                                    <LinkIcon size={16} />
                                </button>
                                <button className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-6 flex-1 overflow-y-auto scrollbar-hide">
                            {note.content}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center">
                                <Calendar size={12} className="mr-1.5" />
                                {note.date || 'No Date'}
                            </div>
                            {note.linkedTaskIds && note.linkedTaskIds.length > 0 && (
                                <div className="flex items-center text-blue-500">
                                    <LinkIcon size={12} className="mr-1" />
                                    {note.linkedTaskIds.length} Linked
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* New Note Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-lg rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Note</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input
                                type="text"
                                placeholder="Note Title"
                                value={newNoteData.title}
                                onChange={(e) => setNewNoteData({...newNoteData, title: e.target.value})}
                                className="w-full text-lg font-bold bg-transparent border-b border-gray-200 dark:border-gray-700 pb-2 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                            />
                            <textarea
                                placeholder="Start typing..."
                                value={newNoteData.content}
                                onChange={(e) => setNewNoteData({...newNoteData, content: e.target.value})}
                                rows={10}
                                className="w-full bg-transparent resize-none focus:outline-none text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-[#27272a]/50">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded-lg">
                                Cancel
                            </button>
                            <button onClick={handleCreateNote} className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90">
                                Create Note
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Link to Task Modal */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Link to Action Item</h3>
                            <button onClick={() => setIsLinkModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto space-y-2">
                            {tasks.map(task => {
                                const isLinked = currentNote?.linkedTaskIds?.includes(task.id);
                                return (
                                    <button 
                                        key={task.id}
                                        onClick={() => handleLinkNote(task.id)}
                                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${isLinked ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-[#27272a] border-transparent hover:border-gray-200 dark:hover:border-gray-600'}`}
                                    >
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400">{task.id}</span>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${task.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{task.status}</span>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{task.title}</p>
                                        </div>
                                        {isLinked && <Check size={16} className="text-blue-500 flex-shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesPage;
