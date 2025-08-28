import React from 'react';
import {IconMessage, IconUser} from '@tabler/icons-react';
import type {FormData} from '@/types/studio';

interface MessageFormProps {
    formData: FormData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({
    formData,
    onInputChange,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit} className="liquid-glass rounded-2xl p-6 max-lg:order-3 lg:col-span-3">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <IconUser className="w-4 h-4 inline mr-1"/>
                        Name (Optional)
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onInputChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Major
                    </label>
                    <select
                        name="major"
                        value={formData.major}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    >
                        <option value="CS">Computer Science (CS)</option>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="DSI">Digital Service Innovation (DSI)</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IconMessage className="w-4 h-4 inline mr-1"/>
                    Your Appreciation Message
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={onInputChange}
                    required
                    rows={4}
                    maxLength={500}
                    placeholder="Share your heartfelt appreciation message to our wonderful teachers & professors..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                />
                <div className="mt-2 text-sm text-gray-500 text-right">
                    {formData.message.length}/500 characters
                </div>
            </div>
        </form>
    );
};

export default MessageForm;