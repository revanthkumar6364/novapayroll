"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NovaAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hi! I am Nova, your payroll AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const pathname = usePathname();

    // Only show on home page and support page
    const isVisible = pathname === '/' || pathname === '/support';

    if (!isVisible) return null;

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;
        
        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput("");
        setIsThinking(true);

        try {
            const response = await fetch('http://localhost:3002/api/v1/bot/web', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();
            
            setMessages(prev => [...prev, {
                role: 'bot',
                content: data.message
            }]);
        } catch (error) {
            console.error("AI connection failed:", error);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: "I'm having trouble connecting to my brain right now. Please try again or check the Support page."
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="fixed bottom-8 right-8 z-50"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-[#245DF1] rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group"
                >
                    <Sparkles className="absolute -top-2 -right-2 text-yellow-500 group-hover:animate-ping" size={20} />
                    <Bot size={32} className="text-white" />
                </button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#0F172A] p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Bot size={24} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Nova AI</h4>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Payroll Specialist</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${m.role === 'user'
                                            ? 'bg-[#245DF1] text-white rounded-br-none shadow-md shadow-blue-500/20'
                                            : 'bg-white text-[#0F172A] rounded-bl-none border border-slate-100 shadow-sm'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-[#0F172A] p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-100 bg-white">
                            <div className="relative flex items-center gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about policy, compliance, taxes..."
                                    className="flex-grow bg-[#F8FAFC] border border-slate-200 outline-none px-5 py-4 rounded-2xl text-sm pr-4 focus:ring-2 focus:ring-[#245DF1]/20 transition-all text-[#0F172A] font-medium placeholder:text-slate-400"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-4 bg-[#245DF1] text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-[#1d4ed8] transition-all active:scale-95 flex items-center justify-center shrink-0"
                                    title="Send Message"
                                >
                                    <Send size={18} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
