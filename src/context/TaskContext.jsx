import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const SECTIONS = [
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
    "Regulatory & Compliance Adherence",
    "Others"
];

export const TaskProvider = ({ children }) => {
    // Notes Data
    const [notes, setNotes] = useState([
        { id: 1001, title: 'Q3 Goals Review', content: 'Ensure all team members are aligned on Q3 targets.', linkedTaskIds: ['ME-1'] },
        { id: 1002, title: 'Client Feedback', content: 'Discuss the recent client feedback during the standup.', linkedTaskIds: [] }
    ]);

    // Unified data combining KRAs and Workflow tasks
    const [tasks, setTasks] = useState([
        {
            id: 'ME-1',
            date: '2026-01-02',
            section: 'Strategy & Vision',
            title: 'Conduct a sector strategy workshop with leadership to define long-term goals and investment themes.',
            eta: '2026-02-15',
            status: 'In-Progress',
            owner: 'Shanil',
            assignee: 'Yeswanth',
            progress: 35,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-2',
            date: '2026-01-02',
            section: 'Strategy & Vision',
            title: 'Publish a 3-year strategic roadmap and communicate it internally and externally.',
            eta: '2026-06-30',
            status: 'To Do',
            owner: 'Shanil',
            assignee: 'Arjun',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-3',
            date: '2026-01-02',
            section: 'Deal Sourcing & Origination',
            title: 'Build a pipeline of 3 potential targets through industry networking and proprietary research.',
            eta: '2026-01-20',
            status: 'In-Progress',
            owner: 'Vikram',
            assignee: 'Yeswanth',
            progress: 65,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-4',
            date: '2026-01-02',
            section: 'Deal Sourcing & Origination',
            title: 'Implement a quarterly “deal origination scorecard” to track sourcing effectiveness.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Vikram',
            assignee: 'Priya',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-5',
            date: '2026-01-02',
            section: 'Deal Execution & Structuring',
            title: 'Develop a standardized negotiation playbook for pricing and structuring.',
            eta: '2026-02-28',
            status: 'Blocked',
            owner: 'Ananya',
            assignee: 'Siddharth',
            progress: 15,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-6',
            date: '2026-01-02',
            section: 'Deal Execution & Structuring',
            title: 'Conduct mock negotiation sessions with the team to enhance deal execution skills.',
            eta: '2026-03-15',
            status: 'To Do',
            owner: 'Ananya',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-7',
            date: '2026-01-02',
            section: 'Portfolio Company Oversight & Value Creation',
            title: 'Set up quarterly performance dashboards for all portfolio companies.',
            eta: '2026-02-10',
            status: 'In-Progress',
            owner: 'Rohan',
            assignee: 'Meera',
            progress: 45,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-8',
            date: '2026-01-02',
            section: 'Portfolio Company Oversight & Value Creation',
            title: 'Launch a “Value Creation Taskforce” to identify operational improvement initiatives.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Rohan',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-9',
            date: '2026-01-02',
            section: 'Exit Strategy & Execution',
            title: 'Create an exit readiness checklist for portfolio companies.',
            eta: '2026-01-15',
            status: 'Done',
            owner: 'Shanil',
            assignee: 'Karan',
            progress: 100,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-10',
            date: '2026-01-02',
            section: 'Exit Strategy & Execution',
            title: 'Identify top 3 potential exit opportunities and initiate preliminary discussions.',
            eta: '2026-04-30',
            status: 'To Do',
            owner: 'Shanil',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-11',
            date: '2026-01-02',
            section: 'Stakeholder Management (Internal & External)',
            title: 'Host a bi-annual stakeholder roundtable for alignment and relationship building.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Aditi',
            assignee: 'Rahul',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-12',
            date: '2026-01-02',
            section: 'Stakeholder Management (Internal & External)',
            title: 'Develop a stakeholder engagement calendar for the year.',
            eta: '2026-01-10',
            status: 'In-Progress',
            owner: 'Aditi',
            assignee: 'Yeswanth',
            progress: 80,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-13',
            date: '2026-01-02',
            section: 'Investment Committee',
            title: 'Create a template for investment proposals highlighting risks and opportunities.',
            eta: '2026-01-05',
            status: 'Done',
            owner: 'Vikram',
            assignee: 'Sanya',
            progress: 100,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-14',
            date: '2026-01-02',
            section: 'Investment Committee',
            title: 'Conduct a quarterly training session on effective IC presentations.',
            eta: '2026-02-20',
            status: 'To Do',
            owner: 'Vikram',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-15',
            date: '2026-01-02',
            section: 'Franchisee Building',
            title: 'Launch a sector insights newsletter to position the firm as a thought leader.',
            eta: '2026-02-15',
            status: 'In-Progress',
            owner: 'Ananya',
            assignee: 'Ishaan',
            progress: 25,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-16',
            date: '2026-01-02',
            section: 'Franchisee Building',
            title: 'Identify and secure speaking opportunities at 2 major industry events.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Ananya',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Low',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-17',
            date: '2026-01-02',
            section: 'Fundraising & Investor relations',
            title: 'Prepare a fundraising pitch deck aligned with strategic objectives.',
            eta: '2026-02-10',
            status: 'Blocked',
            owner: 'Shanil',
            assignee: 'Neha',
            progress: 10,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-18',
            date: '2026-01-02',
            section: 'Fundraising & Investor relations',
            title: 'Schedule investor update calls every quarter.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Shanil',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-19',
            date: '2026-01-02',
            section: 'Team Leadership & Development',
            title: 'Implement a mentorship program for junior team members.',
            eta: '2026-02-28',
            status: 'In-Progress',
            owner: 'Rohan',
            assignee: 'Kabir',
            progress: 40,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-20',
            date: '2026-01-02',
            section: 'Team Leadership & Development',
            title: 'Conduct a quarterly talent review and succession planning session.',
            eta: '2026-03-15',
            status: 'To Do',
            owner: 'Rohan',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-21',
            date: '2026-01-02',
            section: 'Brand Building',
            title: 'Develop a media engagement plan for industry visibility.',
            eta: '2026-01-25',
            status: 'In-Progress',
            owner: 'Aditi',
            assignee: 'Tanvi',
            progress: 55,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-22',
            date: '2026-01-02',
            section: 'Brand Building',
            title: 'Publish 2 thought leadership articles in leading financial publications.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Aditi',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-23',
            date: '2026-01-02',
            section: 'Regulatory & Compliance Adherence',
            title: 'Conduct a compliance audit across all investment processes.',
            eta: '2026-02-28',
            status: 'To Do',
            owner: 'Vikram',
            assignee: 'Aakash',
            progress: 0,
            priority: 'High',
            subItems: [], comments: [], attachments: []
        },
        {
            id: 'ME-24',
            date: '2026-01-02',
            section: 'Regulatory & Compliance Adherence',
            title: 'Roll out quarterly compliance training for the team.',
            eta: '2026-03-31',
            status: 'To Do',
            owner: 'Vikram',
            assignee: 'Yeswanth',
            progress: 0,
            priority: 'Medium',
            subItems: [], comments: [], attachments: []
        }
    ]);

    const [sections, setSections] = useState(SECTIONS);

    const addSection = (sectionName) => {
        if (sectionName && !sections.includes(sectionName)) {
            setSections(prev => [...prev, sectionName]);
        }
    };


    const generateId = () => {
        // Find the highest ME-XXX number
        const maxId = tasks.reduce((max, task) => {
            const match = task.id.toString().match(/ME-(\d+)/);
            if (match) {
                return Math.max(max, parseInt(match[1], 10));
            }
            return max;
        }, 0);
        return `ME-${maxId + 1}`;
    };

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: generateId(),
            subItems: [],
            comments: [],
            attachments: []
        };
        setTasks(prev => [...prev, newTask]);
    };

    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates } : task));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    // Notes Functions
    const addNote = (note) => {
        setNotes(prev => [...prev, { ...note, id: Date.now(), linkedTaskIds: note.linkedTaskIds || [] }]);
    };

    const updateNote = (id, updates) => {
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    };

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(n => n.id !== id));
    };

    const linkNoteToTask = (noteId, taskId) => {
        setNotes(prev => prev.map(n => {
            if (n.id === noteId) {
                const currentLinks = n.linkedTaskIds || [];
                if (!currentLinks.includes(taskId)) {
                    return { ...n, linkedTaskIds: [...currentLinks, taskId] };
                }
            }
            return n;
        }));
    };

    const unlinkNoteFromTask = (noteId, taskId) => {
        setNotes(prev => prev.map(n => {
            if (n.id === noteId) {
                return { ...n, linkedTaskIds: (n.linkedTaskIds || []).filter(id => id !== taskId) };
            }
            return n;
        }));
    };

    return (
        <TaskContext.Provider value={{ 
            tasks, addTask, updateTask, deleteTask, SECTIONS: sections, addSection,
            notes, addNote, updateNote, deleteNote, linkNoteToTask, unlinkNoteFromTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};
