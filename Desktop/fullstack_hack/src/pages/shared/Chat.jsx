import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Send, Hash, User, MessageCircle, Users, Trash2 } from 'lucide-react';
import { chatAPI } from '../../services/api';

export default function Chat() {
  const { user, socket, addToast } = useApp();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // the selected chat object
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const isAdmin = user?.role === 'admin';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  // Fetch all chats
  const loadChats = async () => {
    try {
      const { data } = await chatAPI.getMyChats();
      if (data.success) {
        setChats(data.data);
        if (data.data.length > 0 && !activeChat) {
          setActiveChat(data.data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to load chats", error);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  // Fetch messages when a chat is strictly selected
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      try {
        const { data } = await chatAPI.getChat(activeChat.eventId._id);
        if (data.success && data.data) {
          setMessages(data.data.messages || []);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();

    if (socket) {
      socket.emit('join_room', activeChat.eventId._id);

      socket.on('receive_message', (msg) => {
        // Only add if it's for the currently active chat event room
        if (msg.eventId === activeChat.eventId._id) {
          setMessages((prev) => [...prev, msg]);
        }
      });

      socket.on('chat_deleted', (data) => {
        if (data.eventId === activeChat.eventId._id) {
          addToast(data.message, 'warning');
          setChats(prev => prev.filter(c => c.eventId._id !== data.eventId));
          setActiveChat(null);
          setMessages([]);
        }
      });

      return () => {
        socket.emit('leave_room', activeChat.eventId._id);
        socket.off('receive_message');
        socket.off('chat_deleted');
      };
    }
  }, [activeChat, socket, addToast]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat || !socket) return;

    socket.emit('send_message', { eventId: activeChat.eventId._id, text: message });
    setMessage('');
  };

  const handleDeleteChat = async () => {
    if (!activeChat || !isAdmin) return;
    if (!window.confirm("Are you sure you want to delete this group chat?")) return;

    try {
      await chatAPI.deleteChat(activeChat.eventId._id);
      addToast('Chat deleted successfully', 'success');
      setChats(prev => prev.filter(c => c.eventId._id !== activeChat.eventId._id));
      setActiveChat(null);
      setMessages([]);
    } catch (e) {
      addToast('Failed to delete chat', 'danger');
    }
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-7rem)]">
      <div className="flex h-full bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary-500" /> Messages
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 && (
              <p className="text-gray-400 p-4 text-center text-sm">No group chats yet</p>
            )}
            {chats.map(chat => (
              <button
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                  activeChat?._id === chat._id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 text-primary-600`}>
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-gray-800 truncate">{chat.eventId?.title || 'Unknown Event'}</p>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.members?.length || 0} members</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {activeChat ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary-100 text-primary-600">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {activeChat.eventId?.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activeChat.members?.length} members • Group Chat
                  </p>
                </div>
              </div>
              
              {isAdmin && (
                <button 
                  onClick={handleDeleteChat}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Group Chat"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 py-10 text-sm">No messages yet. Say hi!</div>
              )}
              {messages.map((msg, index) => {
                const isMe = String(msg.senderId?._id || msg.senderId) === String(user?._id);
                return (
                  <div key={msg._id || index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <p className={`text-[10px] font-bold mb-1 px-1 ${
                      isMe ? 'text-gray-500' : (msg.senderRole === 'admin' ? 'text-primary-600' : 'text-emerald-600')
                    }`}>
                      {isMe ? 'You' : (msg.senderName || msg.senderId?.name || 'User')}
                    </p>
                    <div className={`chat-bubble max-w-[85%] ${
                      isMe
                        ? 'bg-primary-500 text-white rounded-2xl rounded-tr-none shadow-md'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none shadow-sm'
                    }`}>
                      <p className="text-sm px-4 py-2 leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center justify-end px-4 pb-2 gap-1`}>
                        <p className={`text-[9px] ${isMe ? 'text-primary-100' : 'text-gray-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 text-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-11 h-11 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl flex items-center justify-center transition-all shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-12 h-12 mb-4 opacity-50 text-primary-300" />
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
