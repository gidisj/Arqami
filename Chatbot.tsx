import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, User as UserIcon } from 'lucide-react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'مرحباً بك في أرقامي! أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم في حماية هويتك الرقمية؟\nWelcome to Arqami! I am the AI Assistant. How can I help you protect your telecom identity today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    if (!chatRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are an official AI assistant for 'Arqami' (أرقامي), the National Telecom Identity Protection platform in Oman.
Your job is to help users understand the platform, how to use it, how to check their registered SIM cards, and what to do if they find an unrecognized number.
If they find an unrecognized number, advise them to use the 'Not Mine / لست أنا' button to instantly isolate it and get a Non-Liability Certificate.
You must ONLY answer questions related to Arqami, telecom identity, SIM fraud prevention, and the features of this app.
If a user asks about anything else (e.g., weather, general knowledge, coding, etc.), politely decline and state that you are only authorized to assist with Arqami-related inquiries.
Answer in the language the user speaks (Arabic or English). Keep answers concise, professional, and helpful.`,
          }
        });
      } catch (e: any) {
        console.error("Failed to initialize AI", e);
        setInitError(e?.message || String(e));
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsLoading(true);

    if (!chatRef.current) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'model', 
          text: `عذراً، خدمة الذكاء الاصطناعي غير متوفرة حالياً. السبب: ${initError || 'Missing API Key'}\nSorry, the AI service is currently unavailable. Reason: ${initError || 'Missing API Key'}` 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: response.text }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: `عذراً، حدث خطأ في الاتصال: ${error?.message || 'Unknown error'}\nSorry, a connection error occurred: ${error?.message || 'Unknown error'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-20 w-96 max-w-[calc(100vw-6rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Header */}
      <div className="bg-gov-navy text-white p-4 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={20} className="text-gov-tealLight" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Arqami Assistant</h3>
            <p className="text-[10px] text-gray-300">المساعد الذكي لأرقامي</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gov-teal text-white ml-2' : 'bg-gov-navy text-white mr-2'}`}>
                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div 
                className={`p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gov-teal text-white rounded-tr-none shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}
                dir="auto"
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gov-navy text-white mr-2 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-gov-teal" />
                <span className="text-xs text-gray-500">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Arqami... / اسأل عن أرقامي..."
            className="flex-grow bg-gray-100 border-transparent focus:bg-white focus:border-gov-teal focus:ring-2 focus:ring-gov-teal/20 rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
            dir="auto"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gov-navy text-white p-2.5 rounded-xl hover:bg-gov-navyDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
