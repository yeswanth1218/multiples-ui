import React from 'react';
import { Plus, MoreVertical, Calendar } from 'lucide-react';

const NotesPage = () => {
    const notes = [
        { id: 1, title: 'Meeting with Sequoia', content: 'Discussed the Series A valuation caps and potential lead investors. Need to follow up on the term sheet details by Friday.', date: 'Oct 24, 2025', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
        { id: 2, title: 'Competitor Analysis: Finzo', content: 'Key strengths: low latency, high adoption in EU. Weaknesses: lack of mobile support. Action: Update our comparison deck.', date: 'Oct 22, 2025', color: 'bg-blue-100 dark:bg-blue-900/20' },
        { id: 3, title: 'Product Roadmap Ideas', content: '1. AI-driven analytics\n2. Automated reporting\n3. Mobile app launch in Q4.\nFocus on user retention features.', date: 'Oct 20, 2025', color: 'bg-purple-100 dark:bg-purple-900/20' },
        { id: 4, title: 'Interview Notes: Senior Dev', content: 'Strong background in Rust and WASM. Good culture fit. Recommendation: Hire.', date: 'Oct 18, 2025', color: 'bg-green-100 dark:bg-green-900/20' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notes</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Your personal scratchpad</span>
                </div>
                <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Plus size={16} /> New Note
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div key={note.id} className={`p-6 rounded-xl border border-transparent ${note.color} hover:shadow-lg transition-shadow cursor-pointer group relative`}>
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{note.title}</h3>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-black dark:hover:text-white">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                            {note.content}
                        </p>
                        <div className="absolute bottom-6 left-6 flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                            <Calendar size={12} className="mr-1.5" />
                            {note.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesPage;
