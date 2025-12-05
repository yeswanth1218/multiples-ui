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
    "Regulatory & Compliance Adherence": Shield
};

const SECTIONS = [
    "Strategy & Vision",
    "Deal Sourcing & Origination",
    "Deal Execution & Structuring",
    "Portfolio Company Oversight & Value Creation",
    "Exit Strategy & Execution",
    "Stakeholder Management (Internal & External)",
    "Investment Committee",
    "Franchisee Building",
    "Fundraising & Investor relations",
    "Team Leadership & Development",
    "Brand Building",
    "Regulatory & Compliance Adherence"
];

const STATUS_STYLES = {
    "In-Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Done": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "Blocked": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "Not Started": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
};

const ActionItemsPage = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [expandedRows, setExpandedRows] = useState({ 2: true }); // Default expand 2nd item for demo
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubItemModalOpen, setIsSubItemModalOpen] = useState(false);
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

    const [items, setItems] = useState([
        {
            id: 1,
            date: '2025-08-09',
            section: 'Strategy & Vision',
            title: 'Prepare a Sector Strategy & get it approved post discussion',
            eta: '2025-10-09',
            status: 'Done',
            owner: 'Shanil',
            assignee: 'Yeswanth',
            progress: 100,
            subItems: [],
            comments: [
                { id: 1, text: "Draft needs review before approval.", user: "Shanil", date: "2025-08-10", avatar: "S" },
                { id: 2, text: "Working on the edits.", user: "Yeswanth", date: "2025-08-11", avatar: "Y" }
            ],
            attachments: [
                { id: 1, name: "Sector_Strategy_v1.pdf", size: "2.4 MB", date: "2025-08-09", type: "pdf" }
            ]
        },
        {
            id: 2,
            date: '2025-08-09',
            section: 'Strategy & Vision',
            title: 'Prepare HR Strategy & Get it approved',
            eta: '2026-03-31',
            status: 'In-Progress',
            owner: 'Shanil',
            assignee: 'John',
            progress: 50,
            subItems: [
                { id: 21, title: 'Filed DRFP approval is done', completed: true },
                { id: 22, title: 'Already obtained Permission', completed: true },
                { id: 23, title: 'Action item 2 completed', completed: true },
                { id: 24, title: 'Final review pending', completed: false }
            ],
            comments: [
                { id: 1, text: "HR team needs to be aligned.", user: "Shanil", date: "2025-08-12", avatar: "S" },
                { id: 2, text: "Meeting scheduled for next week.", user: "John", date: "2025-08-13", avatar: "J" },
                { id: 3, text: "Don't forget the budget report.", user: "Shanil", date: "2025-08-14", avatar: "S" },
                { id: 4, text: "Received.", user: "John", date: "2025-08-14", avatar: "J" },
                { id: 5, text: "Any updates?", user: "Shanil", date: "2025-08-20", avatar: "S" }
            ],
            attachments: [
                { id: 1, name: "HR_Policy_Draft.docx", size: "1.2 MB", date: "2025-08-10", type: "doc" },
                { id: 2, name: "Budget_2026.xlsx", size: "500 KB", date: "2025-08-12", type: "xls" },
                { id: 3, name: "Meeting_Minutes.pdf", size: "1.5 MB", date: "2025-08-15", type: "pdf" }
            ]
        },
        {
            id: 3,
            date: '2025-08-09',
            section: 'Exit Strategy & Execution',
            title: 'Prepare Exit Road map & discuss with board - IPO',
            eta: '2026-03-31',
            status: 'In-Progress',
            owner: 'Shanil',
            assignee: 'Jane',
            progress: 20,
            subItems: [],
            comments: [
                { id: 1, text: "Initial roadmap created.", user: "Jane", date: "2025-08-15", avatar: "J" }
            ],
            attachments: []
        },
        {
            id: 4,
            date: '2025-08-09',
            section: 'Strategy & Vision',
            title: 'Action Item 24',
            eta: '',
            status: 'Blocked',
            owner: '',
            assignee: '',
            progress: 0,
            subItems: [],
            comments: [],
            attachments: []
        }
    ]);

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
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            section: newItemData.section,
            title: newItemData.title,
            eta: newItemData.eta,
            status: newItemData.status,
            owner: newItemData.owner,
            assignee: newItemData.assignee,
            progress: 0,
            subItems: [],
            comments: [],
            attachments: []
        };

        setItems(prev => [newItem, ...prev]);
        setIsModalOpen(false);
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

        setItems(prevItems => prevItems.map(item => {
            if (item.id === currentParentId) {
                const newSub = {
                    id: Date.now(),
                    title: newSubItemData.title,
                    completed: false,
                    eta: newSubItemData.eta,
                    assignee: newSubItemData.assignee
                };
                const updatedSubItems = [...item.subItems, newSub];
                
                // Recalculate progress
                const total = updatedSubItems.length;
                const completed = updatedSubItems.filter(s => s.completed).length;
                const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

                return { ...item, subItems: updatedSubItems, progress };
            }
            return item;
        }));
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
            setItems(prev => prev.filter(item => item.id !== itemToDelete.id));
        } else if (itemToDelete.type === 'subItem') {
            setItems(prevItems => prevItems.map(item => {
                if (item.id === itemToDelete.id) {
                    const updatedSubItems = item.subItems.filter(sub => sub.id !== itemToDelete.subId);
                    
                    // Recalculate progress
                    const total = updatedSubItems.length;
                    const completed = updatedSubItems.filter(s => s.completed).length;
                    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

                    return { ...item, subItems: updatedSubItems, progress };
                }
                return item;
            }));
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

        const updatedComments = [...activeItemForComments.comments, comment];
        const updatedItem = { ...activeItemForComments, comments: updatedComments };

        setItems(prev => prev.map(item => 
            item.id === activeItemForComments.id ? updatedItem : item
        ));
        
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

        const updatedAttachments = [...activeItemForAttachments.attachments, attachment];
        const updatedItem = { ...activeItemForAttachments, attachments: updatedAttachments };

        setItems(prev => prev.map(item => 
            item.id === activeItemForAttachments.id ? updatedItem : item
        ));
        
        setActiveItemForAttachments(updatedItem);
    };

    const handleStatusChange = (itemId, newStatus) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.id === itemId) {
                return { ...item, status: newStatus };
            }
            return item;
        }));
    };

    const toggleSubItemCompletion = (itemId, subItemId) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.id === itemId) {
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
                else if (progress > 0) status = 'In-Progress';

                return { ...item, subItems: updatedSubItems, progress, status };
            }
            return item;
        }));
    };

    const filteredItems = selectedSection 
        ? items.filter(item => item.section === selectedSection)
        : items;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Action Items</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage key deliverables</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search actions..." 
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#18181b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
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
                    { label: 'Total Items', value: items.length, icon: LayoutGrid, color: 'blue' },
                    { label: 'In Progress', value: items.filter(i => i.status === 'In-Progress').length, icon: TrendingUp, color: 'amber' },
                    { label: 'Completed', value: items.filter(i => i.status === 'Done').length, icon: CheckCircle, color: 'emerald' },
                    { label: 'Overdue', value: '2', icon: AlertCircle, color: 'red' },
                ].map((stat, index) => (
                    <div 
                        key={index} 
                        className="relative bg-gradient-to-br from-white/90 via-white/60 to-white/30 dark:from-gray-800/90 dark:via-gray-800/60 dark:to-gray-800/30 backdrop-blur-xl p-5 rounded-xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.10)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(31,38,135,0.15)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group"
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
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ETA</label>
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

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#27272a]/50">
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
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Section</label>
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
                                            <option>Not Started</option>
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
                                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ETA</label>
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
                                Create Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!selectedSection ? (
                // Grid View
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Action Items</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Select a section to view tasks</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto pb-4">
                        {SECTIONS.map(section => {
                            const count = items.filter(i => i.section === section).length;
                            const Icon = SECTION_ICONS[section] || Folder;

                            return (
                                <button 
                                    key={section}
                                    onClick={() => setSelectedSection(section)}
                                    className="p-4 text-left bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all group flex flex-col h-full"
                                >
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-[#27272a] rounded-lg flex items-center justify-center mb-3 text-gray-900 dark:text-white transition-colors">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 flex-1">{section}</h3>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/50 w-full">
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            {count} tasks
                                        </span>
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                // Detail View
                <div className="flex flex-col h-full space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setSelectedSection(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white group"
                                title="Back to Sections"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                                    <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => setSelectedSection(null)}>Action Items</span>
                                    <ChevronRight size={12} />
                                    <span>Section</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSection}</h2>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#3f3f46] transition-colors text-sm font-medium">
                                <Upload size={16} />
                                Import
                            </button>
                            <button onClick={handleAddNewItem} className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium shadow-lg shadow-black/20 dark:shadow-white/10">
                                <Plus size={16} />
                                New Item
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-gray-100/80 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] rounded-xl border border-gray-200/60 dark:border-white/10 shadow-sm overflow-hidden flex-1 flex flex-col">
                        <div className="overflow-auto flex-1">
                            <table className="w-full border-collapse min-w-[1000px]">
                                <thead className="bg-gray-50/50 dark:bg-[#27272a]/50 sticky top-0 z-10 backdrop-blur-sm">
                                    <tr>
                                        <th className="w-10 px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"></th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sno</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase w-1/3">Action Item</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">End ETA</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Owner</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Assignee</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Progress</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-[#27272a]">
                                    {items.filter(item => item.section === selectedSection).map((item) => (
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
                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                                                    {item.title}
                                                    {item.subItems.length > 0 && (
                                                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                                                            <CheckCircle size={12} />
                                                            {item.subItems.filter(s => s.completed).length}/{item.subItems.length} sub-items
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[item.status] || STATUS_STYLES['Not Started']}`}>
                                                        {item.status || 'Not Started'}
                                                    </span>
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
                                                    {item.assignee ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                                                                {item.assignee.charAt(0)}
                                                            </div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.assignee}</span>
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
                                                        <button 
                                                            onClick={() => handleOpenCommentsModal(item)}
                                                            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors relative group/btn"
                                                            title="Comments"
                                                        >
                                                            <MessageSquare size={16} />
                                                            {item.comments.length > 0 && (
                                                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 text-white text-[8px] flex items-center justify-center rounded-full">
                                                                    {item.comments.length}
                                                                </span>
                                                            )}
                                                        </button>
                                                        <button 
                                                            onClick={() => handleOpenAttachmentsModal(item)}
                                                            className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors relative"
                                                            title="Attachments"
                                                        >
                                                            <Paperclip size={16} />
                                                            {item.attachments.length > 0 && (
                                                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 text-white text-[8px] flex items-center justify-center rounded-full">
                                                                    {item.attachments.length}
                                                                </span>
                                                            )}
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
                                                                    {['In-Progress', 'Done', 'Blocked', 'Not Started'].map(status => (
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
                                                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2">
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

                                            {/* Expanded Row (Sub-checklist) */}
                                            {expandedRows[item.id] && (
                                                <tr className="bg-gray-50/30 dark:bg-[#27272a]/20 animate-in slide-in-from-top-2 duration-200">
                                                    <td colSpan="10" className="px-4 py-4">
                                                        <div className="ml-14 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                    <CheckCircle size={14} /> Sub-Checklist
                                                                </h4>
                                                                <button onClick={() => handleAddSubItem(item.id)} className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
                                                                    <Plus size={12} /> Add Sub-item
                                                                </button>
                                                            </div>

                                                            {item.subItems.length > 0 ? (
                                                                <div className="space-y-2">
                                                                    {item.subItems.map((sub) => (
                                                                        <div key={sub.id} className="flex items-center gap-3 group/sub p-2 rounded hover:bg-white dark:hover:bg-[#27272a] border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all">
                                                                            <button onClick={() => toggleSubItemCompletion(item.id, sub.id)} className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${sub.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-green-500'}`}>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionItemsPage;