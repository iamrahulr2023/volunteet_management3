import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Send, Hash, User, MessageCircle, Users } from 'lucide-react';

export default function Chat() {
  const { groupMessages, addGroupMessage, directMessages, addDirectMessage, user } = useApp();
  const [activeTab, setActiveTab] = useState('group');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const isAdmin = user?.role === 'admin';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [groupMessages, directMessages, activeTab]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (activeTab === 'group') {
      addGroupMessage(message, isAdmin ? 'Admin (NGO)' : (user?.name || 'Volunteer'), isAdmin);
      // Simulate a reply after a delay
      if (!isAdmin) {
        setTimeout(() => {
          addGroupMessage('Thanks for the update! Keep up the great work. 👍', 'Admin (NGO)', true);
        }, 2000);
      }
    } else {
      addDirectMessage(message, isAdmin ? 'Admin' : (user?.name || 'Volunteer'), isAdmin);
      // Simulate a reply
      setTimeout(() => {
        if (isAdmin) {
          addDirectMessage('Got it, thanks! I\'ll be there shortly.', 'Aarav Sharma', false);
        } else {
          addDirectMessage('Great, let me check and get back to you.', 'Admin', true);
        }
      }, 1500);
    }
    setMessage('');
  };

  const currentMessages = activeTab === 'group' ? groupMessages : directMessages;

  const chatContacts = [
    { id: 'group', name: 'Flood Relief Camp', type: 'group', lastMsg: 'Admin: Please check in once you arrive', unread: 3 },
    { id: 'direct', name: isAdmin ? 'Aarav Sharma' : 'Admin (NGO)', type: 'direct', lastMsg: 'Can you lead the medical team?', unread: 1 },
  ];

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
            {chatContacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setActiveTab(contact.id === 'group' ? 'group' : 'direct')}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                  (contact.id === 'group' && activeTab === 'group') || (contact.id === 'direct' && activeTab === 'direct')
                    ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  contact.type === 'group' ? 'bg-primary-100 text-primary-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {contact.type === 'group' ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-gray-800 truncate">{contact.name}</p>
                    {contact.unread > 0 && (
                      <span className="w-5 h-5 bg-primary-500 text-white rounded-full text-xs flex items-center justify-center shrink-0">{contact.unread}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            {/* Mobile tabs */}
            <div className="flex md:hidden bg-gray-100 rounded-lg p-0.5 mr-2">
              <button onClick={() => setActiveTab('group')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'group' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}>
                Group
              </button>
              <button onClick={() => setActiveTab('direct')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'direct' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}>
                Direct
              </button>
            </div>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              activeTab === 'group' ? 'bg-primary-100 text-primary-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {activeTab === 'group' ? <Hash className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {activeTab === 'group' ? 'Flood Relief Camp' : (isAdmin ? 'Aarav Sharma' : 'Admin (NGO)')}
              </p>
              <p className="text-xs text-gray-500">
                {activeTab === 'group' ? '6 members • Group Chat' : 'Direct Message'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {currentMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isAdmin === isAdmin ? 'justify-end' : 'justify-start'}`}>
                <div className={`chat-bubble max-w-[75%] ${
                  msg.isAdmin === isAdmin
                    ? 'bg-primary-500 text-white rounded-2xl rounded-br-md'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-md shadow-sm'
                }`}>
                  {activeTab === 'group' && msg.isAdmin !== isAdmin && (
                    <p className={`text-xs font-semibold mb-1 ${msg.isAdmin === isAdmin ? 'text-primary-100' : 'text-primary-600'}`}>
                      {msg.sender}
                    </p>
                  )}
                  <p className="text-sm px-4 py-2">{msg.text}</p>
                  <p className={`text-[10px] px-4 pb-2 ${msg.isAdmin === isAdmin ? 'text-primary-200' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
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
      </div>
    </div>
  );
}
