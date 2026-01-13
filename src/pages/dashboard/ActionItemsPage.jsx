import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
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
    FileText,
    X,
    Trash2,
    Edit,
    Copy,
    Download,
    Eye,
    Send,
    ArrowLeft,
    LayoutGrid,
    Folder,
    Target,
    Globe,
    Briefcase,
    TrendingUp,
    LogOut,
    Users,
    Gavel,
    Store,
    DollarSign,
    Award,
    Megaphone,
    Shield
} from 'lucide-react';

const SECTION_ICONS = {
    "Strategy & Vision": Target,
    "Deal Sourcing & Origination": Globe,
    "Deal Execution & Structuring": Briefcase,
    "Portfolio Company Oversight & Value Creation": TrendingUp,
    "Exit Strategy & Execution": LogOut,
    "Stakeholder Management (Internal & External)": Users,
    "Investment Committee": Gavel,
    "Franchisee Building": Store,
    "Fundraising & Investor relations": DollarSign,
    "Team Leadership & Development": Award,
    "Brand Building": Megaphone,
    "Regulatory & Compliance Adherence": Shield,
    "Others": MoreHorizontal
};

const STATUS_STYLES = {
    "In-Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Done": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "Blocked": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "To Do": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
};

const ActionItemsPage = () => {
    const { tasks: items, addTask, updateTask, deleteTask, SECTIONS, addSection } = useTasks();
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [expandedRows, setExpandedRows] = useState({}); // No items expanded by default
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubItemModalOpen, setIsSubItemModalOpen] = useState(false);
    const [isKRAModalOpen, setIsKRAModalOpen] = useState(false);
    const [newKRAName, setNewKRAName] = useState('');
    const [currentParentId, setCurrentParentId] = useState(null);
    
    // New Modals State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [activeItemForComments, setActiveItemForComments] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [attachmentsModalOpen, setAttachmentsModalOpen] = useState(false);
    const [activeItemForAttachments, setActiveItemForAttachments] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);

    const [newItemData, setNewItemData] = useState({
        section: SECTIONS[0],
        title: '',
        eta: '',
        status: 'In-Progress',
        owner: '',
        assignee: ''
    });
    const [newSubItemData, setNewSubItemData] = useState({
        title: '',
        eta: '',
        assignee: ''
    });


    const toggleExpand = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddNewItem = () => {
        setIsModalOpen(true);
        setNewItemData({
            section: selectedSection || SECTIONS[0],
            title: '',
            eta: '',
            status: 'In-Progress',
            owner: '',
            assignee: ''
        });
    };

    const handleSaveNewItem = () => {
        if (!newItemData.title) return;

        const newItem = {
            date: new Date().toISOString().split('T')[0],
            section: newItemData.section,
            title: newItemData.title,
            eta: newItemData.eta,
            status: newItemData.status,
            owner: newItemData.owner,
            assignee: newItemData.assignee,
            progress: 0,
            priority: 'Medium'
        };

        addTask(newItem);
        setIsModalOpen(false);
    };

    const handleSaveNewKRA = () => {
        if (!newKRAName.trim()) return;
        addSection(newKRAName.trim());
        setIsKRAModalOpen(false);
        setNewKRAName('');
    };

    const handleAddSubItem = (itemId) => {
        setCurrentParentId(itemId);
        setIsSubItemModalOpen(true);
        setNewSubItemData({
            title: '',
            eta: '',
            assignee: ''
        });
    };

    const handleSaveSubItem = () => {
        if (!newSubItemData.title || !currentParentId) return;

        const item = items.find(i => i.id === currentParentId);
        if (!item) return;

        const newSub = {
            id: Date.now(),
            title: newSubItemData.title,
            completed: false,
            eta: newSubItemData.eta,
            assignee: newSubItemData.assignee,
            description: '',
            attachments: []
        };
        const updatedSubItems = [...(item.subItems || []), newSub];
        
        // Recalculate progress
        const total = updatedSubItems.length;
        const completed = updatedSubItems.filter(s => s.completed).length;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        updateTask(currentParentId, { subItems: updatedSubItems, progress });
        setIsSubItemModalOpen(false);
    };

    // Delete Handlers
    const handleOpenDeleteModal = (type, id, subId = null) => {
        setItemToDelete({ type, id, subId });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!itemToDelete) return;

        if (itemToDelete.type === 'item') {
            deleteTask(itemToDelete.id);
        } else if (itemToDelete.type === 'subItem') {
            const item = items.find(i => i.id === itemToDelete.id);
            if (item) {
                const updatedSubItems = item.subItems.filter(sub => sub.id !== itemToDelete.subId);
                
                // Recalculate progress
                const total = updatedSubItems.length;
                const completed = updatedSubItems.filter(s => s.completed).length;
                const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

                updateTask(item.id, { subItems: updatedSubItems, progress });
            }
        }
        setDeleteModalOpen(false);
        setItemToDelete(null);
    };

    // Comments Handlers
    const handleOpenCommentsModal = (item) => {
        setActiveItemForComments(item);
        setCommentsModalOpen(true);
    };

    const handleAddComment = () => {
        if (!newComment.trim() || !activeItemForComments) return;
        
        const comment = {
            id: Date.now(),
            text: newComment,
            user: 'Me',
            date: new Date().toISOString().split('T')[0],
            avatar: 'M'
        };

        const updatedComments = [...(activeItemForComments.comments || []), comment];
        const updatedItem = { ...activeItemForComments, comments: updatedComments };

        updateTask(activeItemForComments.id, { comments: updatedComments });
        
        setActiveItemForComments(updatedItem);
        setNewComment('');
    };

    // Attachments Handlers
    const handleOpenAttachmentsModal = (item) => {
        setActiveItemForAttachments(item);
        setAttachmentsModalOpen(true);
    };

    const handleAddAttachment = (e) => {
        const file = e.target.files[0];
        if (!file || !activeItemForAttachments) return;

        // Simulate file upload
        const attachment = {
            id: Date.now(),
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            date: new Date().toISOString().split('T')[0],
            type: file.name.split('.').pop()
        };

        const updatedAttachments = [...(activeItemForAttachments.attachments || []), attachment];
        const updatedItem = { ...activeItemForAttachments, attachments: updatedAttachments };

        updateTask(activeItemForAttachments.id, { attachments: updatedAttachments });
        
        setActiveItemForAttachments(updatedItem);
    };

    const handleStatusChange = (itemId, newStatus) => {
        updateTask(itemId, { status: newStatus });
    };

    const toggleSubItemCompletion = (itemId, subItemId) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            const updatedSubItems = item.subItems.map(sub =>
                sub.id === subItemId ? { ...sub, completed: !sub.completed } : sub
            );
            
            // Recalculate progress
            const total = updatedSubItems.length;
            const completed = updatedSubItems.filter(s => s.completed).length;
            const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
            
            // Update status based on progress
            let status = item.status;
            if (progress === 100) status = 'Done';
            else if (progress > 0 && status === 'Not Started') status = 'In-Progress';

            updateTask(itemId, { subItems: updatedSubItems, progress, status });
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSection = selectedSection ? item.section === selectedSection : true;
        const matchesStatus = statusFilter === 'All' 
            ? true 
            : statusFilter === 'Overdue'
                ? new Date(item.eta) < new Date() && item.status !== 'Done'
                : item.status === statusFilter;
        return matchesSection && matchesStatus;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Action Items</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage your tasks and responsibilities</p>
                </div>
                <div className="flex items-center gap-3 no-print">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search actions..." 
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#18181b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={selectedSection || ''}
                            onChange={(e) => setSelectedSection(e.target.value || null)}
                            className="appearance-none pl-3 pr-8 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="">All KRAs</option>
                            {SECTIONS.map(section => (
                                <option key={section} value={section}>{section}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                    <button 
                        onClick={() => setIsKRAModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        <Plus size={16} />
                        Add new KRA
                    </button>
                    <button 
                        onClick={handleAddNewItem}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        <Plus size={16} />
                        New Item
                    </button>
                </div>
            </div>

            {/* Quick Stats / Overview Tiles - Glassmorphism applied */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Items', value: items.length, icon: LayoutGrid, color: 'blue', filter: 'All' },
                    { label: 'In Progress', value: items.filter(i => i.status === 'In-Progress').length, icon: TrendingUp, color: 'amber', filter: 'In-Progress' },
                    { label: 'Completed', value: items.filter(i => i.status === 'Done').length, icon: CheckCircle, color: 'emerald', filter: 'Done' },
                    { label: 'Overdue', value: items.filter(i => new Date(i.eta) < new Date() && i.status !== 'Done').length, icon: AlertCircle, color: 'red', filter: 'Overdue' },
                ].map((stat, index) => (
                    <div 
                        key={index} 
                        onClick={() => setStatusFilter(stat.filter)}
                        className={`relative backdrop-blur-xl p-5 rounded-xl border shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(31,38,135,0.15)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group cursor-pointer ${
                            statusFilter === stat.filter 
                                ? `bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border-${stat.color}-200 dark:border-${stat.color}-800 ring-2 ring-${stat.color}-500/20` 
                                : 'bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:from-gray-800/90 dark:via-gray-800/60 dark:to-gray-800/30 border-white/60 dark:border-white/10'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                <stat.icon size={20} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                +12%
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {isKRAModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New KRA</h3>
                            <button onClick={() => setIsKRAModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">KRA Name</label>
                                <input 
                                    type="text"
                                    value={newKRAName}
                                    onChange={(e) => setNewKRAName(e.target.value)}
                                    placeholder="Enter KRA name..."
                                    className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-[#27272a]/50">
                            <button 
                                onClick={() => setIsKRAModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveNewKRA}
                                className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-black/20 dark:shadow-white/10"
                            >
                                Save KRA
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isSubItemModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Sub-Item</h3>
                            <button onClick={() => setIsSubItemModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sub-Item Description</label>
                                <textarea 
                                    value={newSubItemData.title}
                                    onChange={(e) => setNewSubItemData({...newSubItemData, title: e.target.value})}
                                    placeholder="Enter detailed description..."
                                    rows={3}
                                    className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Closure Date</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            value={newSubItemData.eta}
                                            onChange={(e) => setNewSubItemData({...newSubItemData, eta: e.target.value})}
                                            className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Assignee</label>
                                    <div className="relative">
                                        <select 
                                            value={newSubItemData.assignee}
                                            onChange={(e) => setNewSubItemData({...newSubItemData, assignee: e.target.value})}
                                            className="w-full appearance-none bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        >
                                            <option value="">Select</option>
                                            <option>Shanil</option>
                                            <option>Yeswanth</option>
                                            <option>John</option>
                                            <option>Jane</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-[#27272a]/50">
                            <button 
                                onClick={() => setIsSubItemModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveSubItem}
                                className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-black/20 dark:shadow-white/10"
                            >
                                Create Sub-Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Confirm Deletion</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Are you sure you want to delete this {itemToDelete?.type === 'item' ? 'action item' : 'sub-item'}? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-lg shadow-red-500/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Modal */}
            {commentsModalOpen && activeItemForComments && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comments</h3>
                            <button onClick={() => setCommentsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeItemForComments.comments.length > 0 ? (
                                activeItemForComments.comments.map(comment => (
                                    <div key={comment.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                            {comment.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-50 dark:bg-[#27272a] p-3 rounded-lg rounded-tl-none">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{comment.user}</span>
                                                    <span className="text-[10px] text-gray-400">{comment.date}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                                    No comments yet. Be the first to comment!
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#27272a]/50">
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..." 
                                    className="flex-1 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                />
                                <button 
                                    onClick={handleAddComment}
                                    disabled={!newComment.trim()}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Attachments Modal */}
            {attachmentsModalOpen && activeItemForAttachments && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attachments</h3>
                            <button onClick={() => setAttachmentsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {activeItemForAttachments.attachments.length > 0 ? (
                                activeItemForAttachments.attachments.map(file => (
                                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#27272a] rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileText size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</h4>
                                                <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                <Eye size={14} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-green-500 rounded hover:bg-green-50 dark:hover:bg-green-900/20">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic flex flex-col items-center gap-2">
                                    <Paperclip size={24} className="opacity-50" />
                                    <span>No attachments yet.</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#27272a]/50 no-print">
                            <label className="flex items-center justify-center gap-2 w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
                                <Upload size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors">Upload New File</span>
                                <input type="file" className="hidden" onChange={handleAddAttachment} />
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* New Item Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#18181b] w-full max-w-lg rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Action Item</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">KRAs</label>
                                    <div className="relative">
                                        <select 
                                            value={newItemData.section}
                                            onChange={(e) => setNewItemData({...newItemData, section: e.target.value})}
                                            className="w-full appearance-none bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        >
                                            {SECTIONS.map(section => (
                                                <option key={section} value={section}>{section}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</label>
                                    <div className="relative">
                                        <select 
                                            value={newItemData.status}
                                            onChange={(e) => setNewItemData({...newItemData, status: e.target.value})}
                                            className="w-full appearance-none bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        >
                                            <option>In-Progress</option>
                                            <option>Done</option>
                                            <option>Blocked</option>
                                            <option>To Do</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action Item Description</label>
                                <textarea 
                                    value={newItemData.title}
                                    onChange={(e) => setNewItemData({...newItemData, title: e.target.value})}
                                    placeholder="Enter detailed description..."
                                    rows={3}
                                    className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Closure Date</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            value={newItemData.eta}
                                            onChange={(e) => setNewItemData({...newItemData, eta: e.target.value})}
                                            className="w-full bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Owner</label>
                                    <div className="relative">
                                        <select 
                                            value={newItemData.owner}
                                            onChange={(e) => setNewItemData({...newItemData, owner: e.target.value})}
                                            className="w-full appearance-none bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        >
                                            <option value="">Select</option>
                                            <option>Shanil</option>
                                            <option>Yeswanth</option>
                                            <option>John</option>
                                            <option>Jane</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Assignee</label>
                                    <div className="relative">
                                        <select 
                                            value={newItemData.assignee}
                                            onChange={(e) => setNewItemData({...newItemData, assignee: e.target.value})}
                                            className="w-full appearance-none bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        >
                                            <option value="">Select</option>
                                            <option>Shanil</option>
                                            <option>Yeswanth</option>
                                            <option>John</option>
                                            <option>Jane</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-[#27272a]/50">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveNewItem}
                                className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-black/20 dark:shadow-white/10"
                            >
                                Create Action Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col h-full space-y-4 mt-6">
                <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] rounded-xl border border-gray-200/60 dark:border-white/10 shadow-sm overflow-hidden flex-1 flex flex-col">
                        <div className="overflow-auto flex-1">
                            <table className="w-full border-collapse min-w-[1000px]">
                                <thead className="bg-gray-50/50 dark:bg-[#27272a]/50 sticky top-0 z-10 backdrop-blur-sm">
                                    <tr>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-16">Sno</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">KRA</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Description</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Closure Date</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Owner</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Assignee</th>
                                        <th className="px-2 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Progress</th>
                                        <th className="px-2 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase no-print">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
                                    {filteredItems.map((item) => (
                                        <React.Fragment key={item.id}>
                                            {/* Main Row */}
                                            <tr 
                                                onClick={() => toggleExpand(item.id)}
                                                className={`group cursor-pointer relative hover:shadow-lg hover:z-10 hover:bg-white dark:hover:bg-[#202022] transition-all duration-200 border-l-4 ${expandedRows[item.id] ? 'bg-gray-50/50 dark:bg-[#27272a]/30 shadow-md border-blue-500 dark:border-blue-400' : 'border-transparent'}`}
                                            >
                                                <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">{item.id}</td>
                                                <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm dark:bg-[#18181b] dark:border-gray-700 dark:text-gray-300 text-xs font-medium">
                                                        {(SECTION_ICONS[item.section] || MoreHorizontal) && React.createElement(SECTION_ICONS[item.section] || MoreHorizontal, { size: 12 })}
                                                        {item.section}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-3 text-sm text-gray-900 dark:text-white font-medium">
                                                    {item.title}
                                                    {item.subItems.length > 0 && (
                                                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                                                            <CheckCircle size={12} />
                                                            {item.subItems.filter(s => s.completed).length}/{item.subItems.length} sub-items
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-2 py-3">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[item.status] || STATUS_STYLES['To Do']}`}>
                                                        {item.status || 'To Do'}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {item.eta ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar size={12} />
                                                            {item.eta.split('-').slice(1).join('/')}
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-2 py-3">
                                                    {item.owner ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                                                                {item.owner.charAt(0)}
                                                            </div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.owner}</span>
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-2 py-3">
                                                    {item.assignee ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                                                                {item.assignee.charAt(0)}
                                                            </div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.assignee}</span>
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-2 py-3">
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
                                                <td className="px-2 py-3 text-right no-print" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => navigate(`/dashboard/action-items/${item.id}`, { state: { item } })}
                                                            className="p-1.5 bg-[#141640]/10 hover:bg-[#141640]/20 text-[#141640] dark:text-white dark:bg-white/10 dark:hover:bg-white/20 rounded-lg transition-colors relative shadow-sm"
                                                            title="Open Issue"
                                                        >
                                                            <ArrowLeft size={16} className="rotate-180" />
                                                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#18181b]"></span>
                                                        </button>
                                                        <div className="relative">
                                                            <button 
                                                                onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                                                                className={`p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3f3f46] rounded transition-colors ${activeMenuId === item.id ? 'bg-gray-100 dark:bg-[#3f3f46] text-gray-900 dark:text-white' : ''}`}
                                                            >
                                                                <MoreHorizontal size={16} />
                                                            </button>
                                                            
                                                            {activeMenuId === item.id && (
                                                                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden animate-in zoom-in-95 duration-100">
                                                                    <div className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-[#27272a]/50">Status</div>
                                                                    {['In-Progress', 'Done', 'Blocked', 'To Do'].map(status => (
                                                                        <button
                                                                            key={status}
                                                                            onClick={() => {
                                                                                handleStatusChange(item.id, status);
                                                                                setActiveMenuId(null);
                                                                            }}
                                                                            className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#27272a] ${item.status === status ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50/50 dark:bg-blue-900/10' : 'text-gray-700 dark:text-gray-300'}`}
                                                                        >
                                                                           <span>{status}</span>
                                                                           {item.status === status && <CheckCircle size={14} />}
                                                                        </button>
                                                                    ))}
                                                                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                                                                    <button 
                                                                        onClick={() => navigate(`/dashboard/action-items/${item.id}`, { state: { item } })}
                                                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2"
                                                                    >
                                                                        <Edit size={14} /> Edit
                                                                    </button>
                                                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">
                                                                        <Copy size={14} /> Duplicate
                                                                    </button>
                                                                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                                                                    <button 
                                                                        onClick={() => {
                                                                            handleOpenDeleteModal('item', item.id);
                                                                            setActiveMenuId(null);
                                                                        }}
                                                                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                                                                    >
                                                                        <Trash2 size={14} /> Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Expanded Row (Sub-checklist & Info) */}
                                            {expandedRows[item.id] && (
                                                <tr className="bg-gray-50/30 dark:bg-[#27272a]/20 animate-in slide-in-from-top-2 duration-200">
                                                    <td colSpan="9" className="px-4 py-4">
                                                        <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                            {/* Left: Sub-items */}
                                                            <div className="lg:col-span-2 space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                        <CheckCircle size={14} /> Sub-Checklist
                                                                    </h4>
                                                                    <button onClick={() => handleAddSubItem(item.id)} className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 no-print">
                                                                        <Plus size={12} /> Add Sub-item
                                                                    </button>
                                                                </div>

                                                                {item.subItems.length > 0 ? (
                                                                    <div className="space-y-2">
                                                                        {item.subItems.map((sub) => (
                                                                            <div key={sub.id} className="flex items-center gap-3 group/sub p-2 rounded hover:bg-white dark:hover:bg-[#27272a] border border-transparent border-l-4 border-l-gray-300 dark:border-l-gray-600 hover:border-gray-100 dark:hover:border-gray-700 transition-all pl-3 bg-white/50 dark:bg-[#27272a]/30">
                                                                                <button onClick={() => toggleSubItemCompletion(item.id, sub.id)} className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${sub.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-green-500'}`}>
                                                                                    {sub.completed && <CheckCircle size={10} fill="currentColor" />}
                                                                                </button>
                                                                                <span className={`text-sm ${sub.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                                                                    {sub.title}
                                                </span>
                                                <div className="ml-auto opacity-0 group-hover/sub:opacity-100 flex items-center gap-2 no-print">
                                                    <button className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                                        <FileText size={12} /> Note
                                                    </button>
                                                                                    <button className="text-xs text-gray-400 hover:text-purple-500 flex items-center gap-1">
                                                                                        <Upload size={12} /> File
                                                                                    </button>
                                                                                    <button 
                                                                                        onClick={() => handleOpenDeleteModal('subItem', item.id, sub.id)}
                                                                                        className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 ml-2"
                                                                                    >
                                                                                        <Trash2 size={12} /> Delete
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-sm text-gray-400 italic py-2">No sub-items created yet. Click "Add Sub-item" to start.</div>
                                                                )}
                                                            </div>

                                                            {/* Right: Meta Info (Date, Comments, Attachments) */}
                                                            <div className="space-y-6">
                                                                {/* Dates */}
                                                                <div className="space-y-2">
                                                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                        <Calendar size={14} /> Dates
                                                                    </h4>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#27272a] p-2 rounded border border-gray-100 dark:border-gray-800">
                                                                        <span className="text-gray-500 text-xs uppercase w-16">Created:</span>
                                                                        <span className="font-medium">{item.date}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#27272a] p-2 rounded border border-gray-100 dark:border-gray-800">
                                                                        <span className="text-gray-500 text-xs uppercase w-16">Due:</span>
                                                                        <span className="font-medium">{item.eta || 'Not set'}</span>
                                                                    </div>
                                                                </div>

                                                                {/* Comments Preview */}
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                        <MessageSquare size={14} /> Comments
                                                                    </h4>
                                                                    <button onClick={() => handleOpenCommentsModal(item)} className="text-xs text-blue-500 hover:underline no-print">
                                                                        View All ({item.comments.length})
                                                                    </button>
                                                                </div>
                                                                    {item.comments.length > 0 ? (
                                                                        <div className="bg-white dark:bg-[#27272a] p-3 rounded border border-gray-100 dark:border-gray-800 space-y-2">
                                                                            {item.comments.slice(0, 2).map(c => (
                                                                                <div key={c.id} className="text-xs">
                                                                                    <div className="flex justify-between text-gray-500 mb-0.5">
                                                                                        <span className="font-medium">{c.user}</span>
                                                                                        <span>{c.date}</span>
                                                                                    </div>
                                                                                    <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{c.text}</p>
                                                                                </div>
                                                                            ))}
                                                                            {item.comments.length > 2 && (
                                                                                <div className="text-xs text-gray-400 italic text-center pt-1">
                                                                                    +{item.comments.length - 2} more...
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-xs text-gray-400 italic bg-white dark:bg-[#27272a] p-2 rounded border border-gray-100 dark:border-gray-800">
                                                                            No comments yet.
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Attachments Preview */}
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                        <Paperclip size={14} /> Attachments
                                                                    </h4>
                                                                    <button onClick={() => handleOpenAttachmentsModal(item)} className="text-xs text-blue-500 hover:underline no-print">
                                                                        View All ({item.attachments.length})
                                                                    </button>
                                                                </div>
                                                                    {item.attachments.length > 0 ? (
                                                                        <div className="space-y-1">
                                                                            {item.attachments.slice(0, 2).map(file => (
                                                                                <div key={file.id} className="flex items-center gap-2 bg-white dark:bg-[#27272a] p-2 rounded border border-gray-100 dark:border-gray-800">
                                                                                    <FileText size={12} className="text-gray-400" />
                                                                                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate flex-1">{file.name}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-xs text-gray-400 italic bg-white dark:bg-[#27272a] p-2 rounded border border-gray-100 dark:border-gray-800">
                                                                            No attachments.
                                                                        </div>
                                                                    )}
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
                    </div>
                </div>
        </div>
    );
};

export default ActionItemsPage;
