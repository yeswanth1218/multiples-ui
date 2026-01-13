import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    User,
    Tag,
    Paperclip,
    MessageSquare,
    MoreHorizontal,
    Edit,
    Trash2,
    Download,
    Share2,
    Flag,
    CheckSquare,
    Save,
    X,
    Plus,
    Upload
} from 'lucide-react';

const ActionItemDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { itemId } = useParams();
    const { tasks, updateTask, notes, addNote, linkNoteToTask, unlinkNoteFromTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [selectedSubTask, setSelectedSubTask] = useState(null);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '' });

    // Get item from context based on ID
    const item = tasks.find(t => t.id.toString() === itemId);

    useEffect(() => {
        if (item) {
            setEditedItem(item);
        }
    }, [item]);

    // Sub-task Modal Handlers
    const openSubTask = (sub) => {
        setSelectedSubTask({ ...sub });
    };

    const closeSubTask = () => {
        setSelectedSubTask(null);
    };

    const saveSubTask = () => {
        if (!selectedSubTask) return;

        if (isEditing) {
            // Update in local editedItem
            setEditedItem(prev => ({
                ...prev,
                subItems: prev.subItems.map(s => s.id === selectedSubTask.id ? selectedSubTask : s)
            }));
        } else {
            // Update in global state
            const updatedSubItems = item.subItems.map(s => s.id === selectedSubTask.id ? selectedSubTask : s);
            updateTask(item.id, { subItems: updatedSubItems });
        }
        closeSubTask();
    };

    const handleSubTaskAttachmentAdd = () => {
         const newFile = {
            id: Date.now(),
            name: `SubTask_File_${Date.now()}.pdf`,
            size: '0 KB',
            date: new Date().toISOString().split('T')[0],
            type: 'pdf'
        };
        setSelectedSubTask(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), newFile]
        }));
    };

    const handleSubTaskAttachmentDelete = (fileId) => {
        setSelectedSubTask(prev => ({
            ...prev,
            attachments: (prev.attachments || []).filter(f => f.id !== fileId)
        }));
    };

    // Notes Handlers
    const linkedNotes = notes.filter(n => n.linkedTaskIds?.includes(item?.id));

    const handleCreateNote = () => {
        if (!newNote.title.trim()) return;
        const noteToAdd = {
            ...newNote,
            linkedTaskIds: [item.id]
        };
        addNote(noteToAdd);
        setNewNote({ title: '', content: '' });
        setIsAddingNote(false);
    };

    const handleSave = () => {
        updateTask(item.id, editedItem);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedItem(item);
        setIsEditing(false);
    };

    const handleSubItemChange = (id, field, value) => {
        setEditedItem(prev => ({
            ...prev,
            subItems: prev.subItems.map(sub => 
                sub.id === id ? { ...sub, [field]: value } : sub
            )
        }));
    };

    const handleAddSubItem = () => {
        const newSub = {
            id: Date.now(),
            title: '',
            completed: false
        };
        setEditedItem(prev => ({
            ...prev,
            subItems: [...prev.subItems, newSub]
        }));
    };

    const handleDeleteSubItem = (subId) => {
        setEditedItem(prev => ({
            ...prev,
            subItems: prev.subItems.filter(sub => sub.id !== subId)
        }));
    };

    const handleAddAttachment = () => {
        // Mock attachment
        const newFile = {
            id: Date.now(),
            name: `New_File_${Date.now()}.pdf`,
            size: '0 KB',
            date: new Date().toISOString().split('T')[0],
            type: 'pdf'
        };
        setEditedItem(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), newFile]
        }));
    };

    const handleDeleteAttachment = (fileId) => {
        setEditedItem(prev => ({
            ...prev,
            attachments: prev.attachments.filter(f => f.id !== fileId)
        }));
    };

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Item not found</h2>
                <button 
                    onClick={() => navigate('/dashboard/action-items')}
                    className="text-blue-500 hover:underline"
                >
                    Return to Action Items
                </button>
            </div>
        );
    }

    const STATUS_COLORS = {
        "In-Progress": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        "Done": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        "Blocked": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
        "To Do": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-300">
            {/* Header / Nav */}
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white no-print"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">KRAs</span>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{item.section}</span>
                        <span className="text-xs text-gray-400 ml-2">ID: {item.id}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h1>
                </div>
                <div className="flex gap-2 no-print">
                    <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button 
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                            >
                                <X size={16} /> Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <Edit size={16} /> Edit Issue
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
                    
                    {/* Status Card */}
                    <div className="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Title</label>
                                    <input 
                                        type="text" 
                                        value={editedItem?.title}
                                        onChange={(e) => setEditedItem({...editedItem, title: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Status</label>
                                        <select 
                                            value={editedItem?.status}
                                            onChange={(e) => setEditedItem({...editedItem, status: e.target.value})}
                                            className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>In-Progress</option>
                                            <option>Done</option>
                                            <option>Blocked</option>
                                            <option>To Do</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Priority</label>
                                        <select 
                                            value={editedItem?.priority || 'Medium'}
                                            onChange={(e) => setEditedItem({...editedItem, priority: e.target.value})}
                                            className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Critical</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${STATUS_COLORS[item.status] || STATUS_COLORS['To Do']}`}>
                                    {item.status}
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>Created: {item.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Flag size={16} />
                                        <span>Priority: {item.priority || 'Medium'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
                            {isEditing ? (
                                <textarea 
                                    value={editedItem?.description || ''}
                                    onChange={(e) => setEditedItem({...editedItem, description: e.target.value})}
                                    placeholder="Add a detailed description..."
                                    rows={5}
                                    className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {item.description || "No detailed description provided for this KRA."}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sub-Items Section */}
                    <div className="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <CheckSquare size={20} />
                                Sub-Tasks
                                <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                    {(isEditing ? editedItem?.subItems : item.subItems)?.length || 0}
                                </span>
                            </h3>
                            {isEditing && (
                                <button 
                                    onClick={handleAddSubItem}
                                    className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium"
                                >
                                    <Plus size={14} /> Add Task
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            {(isEditing ? editedItem?.subItems : item.subItems) && (isEditing ? editedItem?.subItems : item.subItems).length > 0 ? (
                                (isEditing ? editedItem?.subItems : item.subItems).map(sub => (
                                    <div 
                                        key={sub.id} 
                                        onClick={(e) => {
                                            // Don't open if clicking checkbox or delete
                                            if (e.target.type === 'checkbox' || e.target.closest('button')) return;
                                            openSubTask(sub);
                                        }}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors group cursor-pointer"
                                    >
                                        {isEditing ? (
                                            <>
                                                <input 
                                                    type="checkbox"
                                                    checked={sub.completed}
                                                    onChange={(e) => handleSubItemChange(sub.id, 'completed', e.target.checked)}
                                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                                <input 
                                                    type="text" 
                                                    value={sub.title}
                                                    onChange={(e) => handleSubItemChange(sub.id, 'title', e.target.value)}
                                                    className="flex-1 bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none text-sm text-gray-900 dark:text-white"
                                                    placeholder="Enter task name..."
                                                />
                                                <button 
                                                    onClick={() => handleDeleteSubItem(sub.id)}
                                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${sub.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                                    {sub.completed && <CheckCircle size={14} />}
                                                </div>
                                                <div className="flex-1">
                                                    <span className={`text-sm block ${sub.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {sub.title}
                                                    </span>
                                                    {sub.description && <span className="text-xs text-gray-400 line-clamp-1">{sub.description}</span>}
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 text-xs text-blue-500">
                                                    View Details
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">No sub-tasks created.</p>
                            )}
                        </div>
                    </div>

                    {/* Activity / Comments */}
                    <div className="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <MessageSquare size={20} />
                            Activity & Comments
                        </h3>
                        
                        <div className="space-y-6">
                            {item.comments && item.comments.length > 0 ? (
                                item.comments.map(comment => (
                                    <div key={comment.id} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold flex-shrink-0">
                                            {comment.avatar}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900 dark:text-white">{comment.user}</span>
                                                <span className="text-xs text-gray-500">{comment.date}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">{comment.text}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">No comments yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Meta Info */}
                <div className="space-y-6">
                    {/* Important Notes */}
                    <div className="bg-white dark:bg-[#18181b] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Important Notes</h4>
                            <button 
                                onClick={() => setIsAddingNote(!isAddingNote)}
                                className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                            >
                                <Plus size={12} /> Add
                            </button>
                        </div>
                        
                        {isAddingNote && (
                            <div className="bg-gray-50 dark:bg-[#27272a] p-3 rounded-lg space-y-2 animate-in fade-in zoom-in-95 duration-200">
                                <input
                                    type="text"
                                    placeholder="Note Title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                                    className="w-full text-sm bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <textarea
                                    placeholder="Note Content"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                                    rows={2}
                                    className="w-full text-xs bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                />
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => setIsAddingNote(false)}
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleCreateNote}
                                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {linkedNotes.length > 0 ? (
                                linkedNotes.map(note => (
                                    <div key={note.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg group relative">
                                        <h5 className="font-medium text-sm text-gray-900 dark:text-white">{note.title}</h5>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{note.content}</p>
                                        <button 
                                            onClick={() => unlinkNoteFromTask(note.id, item.id)}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic">No important notes linked.</p>
                            )}
                        </div>
                    </div>

                    {/* People */}
                    <div className="bg-white dark:bg-[#18181b] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">People</h4>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Assignee</span>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={editedItem?.assignee || ''}
                                    onChange={(e) => setEditedItem({...editedItem, assignee: e.target.value})}
                                    className="text-sm text-right bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white w-32"
                                    placeholder="Unassigned"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                                        {item.assignee ? item.assignee.charAt(0) : '?'}
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.assignee || 'Unassigned'}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Owner</span>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={editedItem?.owner || ''}
                                    onChange={(e) => setEditedItem({...editedItem, owner: e.target.value})}
                                    className="text-sm text-right bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none text-gray-900 dark:text-white w-32"
                                    placeholder="Unassigned"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                                        {item.owner ? item.owner.charAt(0) : '?'}
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.owner || 'Unassigned'}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-white dark:bg-[#18181b] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Dates</h4>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Closure Date</label>
                                {isEditing ? (
                                    <input 
                                        type="date"
                                        value={editedItem?.eta || ''}
                                        onChange={(e) => setEditedItem({...editedItem, eta: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                        <Calendar size={16} className="text-gray-400" />
                                        {item.eta || 'No date set'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white dark:bg-[#18181b] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Attachments</h4>
                            {isEditing && (
                                <button 
                                    onClick={handleAddAttachment}
                                    className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                                >
                                    <Upload size={12} /> Add
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-3">
                            {(isEditing ? editedItem?.attachments : item.attachments) && (isEditing ? editedItem?.attachments : item.attachments).length > 0 ? (
                                (isEditing ? editedItem?.attachments : item.attachments).map(file => (
                                    <div key={file.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-[#27272a] group">
                                        <div className="w-8 h-8 bg-white dark:bg-[#18181b] rounded flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-600">
                                            <Paperclip size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                            <p className="text-[10px] text-gray-500">{file.size}</p>
                                        </div>
                                        {isEditing ? (
                                            <button 
                                                onClick={() => handleDeleteAttachment(file.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 rounded transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        ) : (
                                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all">
                                                <Download size={14} className="text-gray-500" />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic">No attachments.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Sub-Task Detail Modal */}
            {selectedSubTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-xl w-full max-w-lg border border-gray-200 dark:border-gray-700 flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sub-Task Details</h3>
                            <button onClick={closeSubTask} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6 overflow-y-auto">
                            {/* Title */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Title</label>
                                <input 
                                    type="text" 
                                    value={selectedSubTask.title}
                                    onChange={(e) => setSelectedSubTask({...selectedSubTask, title: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Description</label>
                                <textarea 
                                    value={selectedSubTask.description || ''}
                                    onChange={(e) => setSelectedSubTask({...selectedSubTask, description: e.target.value})}
                                    placeholder="Add description..."
                                    rows={3}
                                    className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            {/* Attachments */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Attachments</label>
                                    <button 
                                        onClick={handleSubTaskAttachmentAdd}
                                        className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                                    >
                                        <Upload size={12} /> Add
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {selectedSubTask.attachments && selectedSubTask.attachments.length > 0 ? (
                                        selectedSubTask.attachments.map(file => (
                                            <div key={file.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-[#27272a] group">
                                                <div className="w-8 h-8 bg-white dark:bg-[#18181b] rounded flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-600">
                                                    <Paperclip size={14} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                                    <p className="text-[10px] text-gray-500">{file.size}</p>
                                                </div>
                                                <button 
                                                    onClick={() => handleSubTaskAttachmentDelete(file.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 rounded transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 italic bg-gray-50 dark:bg-[#27272a] p-3 rounded-lg text-center">No attachments.</p>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox"
                                    id="subtask-completed"
                                    checked={selectedSubTask.completed}
                                    onChange={(e) => setSelectedSubTask({...selectedSubTask, completed: e.target.checked})}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <label htmlFor="subtask-completed" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">Mark as Completed</label>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2 bg-gray-50 dark:bg-[#27272a]/50 rounded-b-xl">
                            <button 
                                onClick={closeSubTask}
                                className="px-4 py-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#3f3f46] transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveSubTask}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionItemDetailPage;