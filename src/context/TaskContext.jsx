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
    "Regulatory & Compliance Adherence"
];

export const TaskProvider = ({ children }) => {
    // Unified data combining Action Items and Workflow tasks
    const [tasks, setTasks] = useState([
        // Action Items Data
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
            priority: 'High',
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
            priority: 'Medium',
            subItems: [
                { id: 21, title: 'Filed DRFP approval is done', completed: true },
                { id: 22, title: 'Already obtained Permission', completed: true },
                { id: 23, title: 'Action item 2 completed', completed: true },
                { id: 24, title: 'Final review pending', completed: false }
            ],
            comments: [
                { id: 1, text: "HR team needs to be aligned.", user: "Shanil", date: "2025-08-12", avatar: "S" },
                { id: 2, text: "Meeting scheduled for next week.", user: "John", date: "2025-08-13", avatar: "J" }
            ],
            attachments: [
                { id: 1, name: "HR_Policy_Draft.docx", size: "1.2 MB", date: "2025-08-10", type: "doc" }
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
            priority: 'High',
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
            priority: 'Low',
            subItems: [],
            comments: [],
            attachments: []
        },
        // Workflow Data (Integrated)
        { 
            id: 101, 
            title: 'Design System Update', 
            section: 'Brand Building',
            status: 'To Do', 
            priority: 'High',
            assignee: 'JS', 
            date: '2025-10-01',
            subItems: [], comments: [], attachments: []
        },
        { 
            id: 102, 
            title: 'Client Meeting Prep', 
            section: 'Stakeholder Management (Internal & External)',
            status: 'To Do', 
            priority: 'Medium',
            assignee: 'RM',
            date: '2025-10-02',
            subItems: [], comments: [], attachments: []
        },
        { 
            id: 103, 
            title: 'Login Flow Fix', 
            section: 'Deal Execution & Structuring',
            status: 'In-Progress', 
            priority: 'High',
            assignee: 'JW',
            date: '2025-10-03',
            subItems: [], comments: [], attachments: []
        },
        { 
            id: 104, 
            title: 'Q4 Marketing Plan', 
            section: 'Brand Building',
            status: 'In Review', 
            priority: 'Medium',
            assignee: 'SC',
            date: '2025-10-04',
            subItems: [], comments: [], attachments: []
        },
        { 
            id: 105, 
            title: 'Homepage Refresh', 
            section: 'Brand Building',
            status: 'Done', 
            priority: 'Low',
            assignee: 'JS',
            date: '2025-10-05',
            subItems: [], comments: [], attachments: []
        },
    ]);

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now(),
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

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, SECTIONS }}>
            {children}
        </TaskContext.Provider>
    );
};
