import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Trash2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  Languages 
} from 'lucide-react';
import { ChatMessage, ChatRequest, ChatResponse } from '../types';

interface AIChatProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onOpenSOS: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hindi', label: 'हिन्दी (Hindi)' },
  { code: 'Spanish', label: 'Español (Spanish)' },
  { code: 'Bengali', label: 'বাংলা (Bengali)' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)' },
  { code: 'Telugu', label: 'తెలుగు (Telugu)' },
  { code: 'Marathi', label: 'मराठी (Marathi)' },
];

const QUICK_PROMPTS = [
  '🔥 There is a fire in my kitchen',
  '🫀 How to do CPR step by step?',
  '🌎 Earthquake shaking right now',
  '🎒 What should I keep in an emergency kit?',
  '🩸 Severe bleeding first aid',
  '🫁 I am having trouble breathing'
];

export const AIChat: React.FC<AIChatProps> = ({
  initialPrompt,
  onClearInitialPrompt,
  onOpenSOS
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('aegis_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse error
      }
    }
    return [
      {
        id: 'welcome',
        role: 'model',
        text: "Hi! I'm Aegis, your disaster emergency guidance and safety assistant. How can I help you today?",
        timestamp: Date.now(),
      },
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aegis_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Handle incoming initial prompt from SOS or Dashboard
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText !== undefined ? messageText : inputMessage).trim();
    if (!textToSend || isLoading) return;

    setGlobalError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputMessage('');

    setIsLoading(true);

    try {
      // Build history for backend
      const historyPayload = messages
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const payload: ChatRequest = {
        message: textToSend,
        history: historyPayload,
        language: language,
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok || data.error) {
        const errorText = data.message || 'AI service is temporarily unavailable. Please try again in a moment.';
        setGlobalError(errorText);

        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'model',
          text: `⚠️ **System Notice**: ${errorText}`,
          timestamp: Date.now(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else if (data.reply) {
        const aiMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response structure received from server');
      }
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const networkErrorMessage = 'Network error or backend server unreachable. Please verify connection.';
      setGlobalError(networkErrorMessage);

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: `⚠️ **Connection Notice**: ${networkErrorMessage}`,
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setSpeakingId(null);
      setGlobalError(null);
      const initial: ChatMessage[] = [
        {
          id: `welcome-${Date.now()}`,
          role: 'model',
          text: "Hi! I'm Aegis, your disaster emergency guidance assistant. How can I help you today?",
          timestamp: Date.now(),
        },
      ];
      setMessages(initial);
      localStorage.removeItem('aegis_chat_history');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeech = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner voice output
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Render text with basic markdown styling
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-sm sm:text-base">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />;

          // Headers
          if (trimmed.startsWith('### ')) {
            return <h4 key={idx} className="font-bold text-slate-100 text-sm mt-2">{trimmed.slice(4)}</h4>;
          }
          if (trimmed.startsWith('## ')) {
            return <h3 key={idx} className="font-bold text-slate-100 text-base mt-2.5">{trimmed.slice(3)}</h3>;
          }
          if (trimmed.startsWith('# ')) {
            return <h2 key={idx} className="font-extrabold text-slate-100 text-lg mt-3">{trimmed.slice(2)}</h2>;
          }

          // Numbered lists
          const numberedMatch = line.match(/^(\d+\.)\s+(.+)$/);
          if (numberedMatch) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-1 py-0.5">
                <span className="font-bold text-red-400 text-sm min-w-[1.5rem]">{numberedMatch[1]}</span>
                <span className="text-slate-200">{formatInline(numberedMatch[2])}</span>
              </div>
            );
          }

          // Bullet lists
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-2 py-0.5">
                <span className="text-red-400 text-base leading-tight">•</span>
                <span className="text-slate-200">{formatInline(trimmed.slice(2))}</span>
              </div>
            );
          }

          return <p key={idx} className="text-slate-200">{formatInline(line)}</p>;
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    // Basic bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-5xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Chat Top Action Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm sm:text-base">Aegis Emergency Assistant</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Official Google Gemini AI Backend</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs">
            <Languages className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select Chat Language"
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Chat Button */}
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            aria-label="Clear Chat History"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Global Error Banner if backend fails */}
      {globalError && (
        <div className="bg-red-950/90 border-b border-red-800 text-red-200 px-4 py-2.5 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{globalError}</span>
          </div>
          <button
            onClick={onOpenSOS}
            className="ml-2 font-bold underline hover:text-white shrink-0 text-[11px]"
          >
            Open Emergency SOS
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-150`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 transition-all shadow-md ${
                  isUser
                    ? 'bg-gradient-to-br from-red-600 to-red-700 text-white rounded-tr-none'
                    : msg.isError
                    ? 'bg-red-950/40 border border-red-700/70 text-red-200 rounded-tl-none'
                    : 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-tl-none'
                }`}
              >
                {/* Bubble Header */}
                <div className="flex items-center justify-between mb-1.5 text-[11px] opacity-75 border-b border-white/10 pb-1">
                  <span className="font-semibold flex items-center space-x-1">
                    {!isUser && <Sparkles className="w-3 h-3 text-red-400 mr-1 inline" />}
                    <span>{isUser ? 'You' : 'Aegis'}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      title="Copy response"
                      aria-label="Copy response text"
                      className="hover:text-white transition-colors p-0.5"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>

                    {/* TTS Button for AI responses */}
                    {!isUser && (
                      <button
                        onClick={() => handleToggleSpeech(msg.text, msg.id)}
                        title={speakingId === msg.id ? 'Stop speaking' : 'Read aloud'}
                        aria-label={speakingId === msg.id ? 'Stop speaking' : 'Read aloud'}
                        className={`transition-colors p-0.5 ${speakingId === msg.id ? 'text-amber-400 animate-pulse' : 'hover:text-white'}`}
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Message Content */}
                <div className="text-slate-100">
                  {renderFormattedText(msg.text)}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-150">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl rounded-tl-none p-4 flex items-center space-x-3 text-slate-300">
              <RefreshCw className="w-4 h-4 text-red-400 animate-spin" />
              <span className="text-sm font-medium">Aegis is analyzing emergency protocols...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-2">
        <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider shrink-0 mr-1">
          Quick Ask:
        </span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt.replace(/^[^\w]+/, '').trim())}
            disabled={isLoading}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 active:scale-95 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex items-end space-x-2">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your emergency question or situation (e.g. 'There is a fire in my house', 'CPR steps')..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none max-h-32 min-h-[44px]"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputMessage.trim()}
            aria-label="Send emergency message"
            className="h-11 px-4 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold flex items-center justify-center transition-all duration-150 active:scale-95 shadow-lg shadow-red-600/30 disabled:shadow-none"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400">
          <span>Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for new line</span>
          <span className="text-red-400 font-medium">Life-threatening emergency? Dial 112 immediately.</span>
        </div>
      </div>
    </div>
  );
};
