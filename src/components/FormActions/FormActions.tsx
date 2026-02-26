import React from 'react';
import { Save, X } from 'lucide-react';

interface FormActionsProps {
    onCancel: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    variant?: 'red' | 'dark';
}

export const FormActions: React.FC<FormActionsProps> = ({
    onCancel,
    submitLabel = 'Salvar',
    cancelLabel = 'Cancelar',
    loading = false,
    variant = 'red'
}) => {
    const submitStyles = variant === 'red'
        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:to-red-800'
        : 'bg-gray-800 hover:bg-gray-900';

    return (
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 pb-12">
            <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center transition-colors"
            >
                <X size={20} className="mr-2" />
                {cancelLabel}
            </button>
            <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl text-white font-bold flex items-center justify-center shadow-lg transform hover:-translate-y-0.5 transition-all ${submitStyles} ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
                {loading ? (
                    <span>Salvando...</span>
                ) : (
                    <>
                        <Save size={20} className="mr-2" />
                        {submitLabel}
                    </>
                )}
            </button>
        </div>
    );
};
