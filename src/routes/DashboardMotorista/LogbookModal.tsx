import React, { useState } from 'react';
import { X, BookOpen, Clock, Save, Plus } from 'lucide-react';

interface LogEntry {
    id: number;
    time: string;
    description: string;
}

interface LogbookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LogbookModal: React.FC<LogbookModalProps> = ({ isOpen, onClose }) => {
    const [entries, setEntries] = useState<LogEntry[]>([
        { id: 1, time: '08:30', description: 'Abastecimento - 50L Diesel' },
        { id: 2, time: '12:00', description: 'Pausa para almoço' }
    ]);
    const [newEntry, setNewEntry] = useState('');

    const handleAddEntry = () => {
        if (!newEntry.trim()) return;

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const entry: LogEntry = {
            id: Date.now(),
            time: timeStr,
            description: newEntry
        };

        setEntries([entry, ...entries]);
        setNewEntry('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center">
                        <BookOpen className="mr-2 text-red-500" size={20} />
                        <h3 className="font-bold text-lg">Diário de Bordo</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Input Area */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                        Nova Ocorrência
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newEntry}
                            onChange={(e) => setNewEntry(e.target.value)}
                            placeholder="Ex: Pneu calibrado, Trânsito intenso..."
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddEntry()}
                        />
                        <button
                            onClick={handleAddEntry}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 flex items-center justify-center transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                {/* List Body */}
                <div className="p-4 overflow-y-auto space-y-3 flex-1">
                    {entries.length === 0 ? (
                        <p className="text-center text-gray-400 py-4 text-sm">Nenhum registro hoje.</p>
                    ) : (
                        entries.map((entry) => (
                            <div key={entry.id} className="flex items-start bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                                <div className="bg-red-50 text-red-700 font-bold text-xs px-2 py-1 rounded mr-3 flex items-center mt-0.5">
                                    <Clock size={10} className="mr-1" />
                                    {entry.time}
                                </div>
                                <p className="text-sm text-gray-700 leading-tight">{entry.description}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                    <button
                        onClick={() => {
                            // Mock save action
                            onClose();
                        }}
                        className="w-full bg-gray-800 hover:bg-black text-white font-bold py-3 rounded-xl shadow-sm text-sm flex items-center justify-center transition-colors"
                    >
                        <Save size={16} className="mr-2" />
                        Salvar e Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};
