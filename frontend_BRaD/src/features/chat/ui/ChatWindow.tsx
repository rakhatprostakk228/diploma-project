import { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { Button, Input } from '@shared/ui';
import { useMessageStore } from '@entities/message';
import { useUserStore } from '@entities/user';

interface ChatWindowProps {
  conversationId: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
  onClose?: () => void;
  embedded?: boolean;
}

export const ChatWindow = ({
  conversationId,
  receiverId,
  receiverName,
  receiverAvatar,
  onClose,
  embedded = false,
}: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getMessages, sendMessage } = useMessageStore();
  const { currentUser, getUser } = useUserStore();

  const messages = getMessages(conversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() && currentUser) {
      sendMessage(conversationId, message.trim(), receiverId);
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const containerStyle = embedded
    ? { backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
    : { 
        position: 'fixed' as const, 
        bottom: '1rem', 
        right: '1rem', 
        width: '24rem', 
        height: '600px', 
        backgroundColor: 'white', 
        borderRadius: '1rem', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      };

  return (
    <div className={`w-full h-full flex flex-col ${embedded ? '' : 'fixed bottom-4 right-4 w-96 h-[600px] z-50'}`} style={containerStyle}>
      <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid rgba(51, 58, 47, 0.1)' }}>
        <div className="flex items-center gap-3">
          {receiverAvatar ? (
            <img src={receiverAvatar} alt={receiverName} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EBEDDF' }}>
              <span className="font-semibold" style={{ color: '#333A2F' }}>{receiverName[0]}</span>
            </div>
          )}
          <div>
            <p className="font-semibold" style={{ color: '#333A2F' }}>{receiverName}</p>
            <p className="text-xs" style={{ color: 'rgba(51, 58, 47, 0.6)' }}>Online</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'rgba(51, 58, 47, 0.6)' }}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUser?.id;
          const sender = getUser(msg.senderId);

          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                {!isOwn && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBEDDF' }}>
                    <span className="text-xs font-semibold" style={{ color: '#333A2F' }}>
                      {sender?.name[0] || 'U'}
                    </span>
                  </div>
                )}
                <div
                  className="rounded-lg px-4 py-2"
                  style={isOwn
                    ? { backgroundColor: '#333A2F', color: 'white' }
                    : { backgroundColor: '#EBEDDF', color: '#333A2F' }
                  }
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1" style={{ color: isOwn ? 'rgba(255, 255, 255, 0.7)' : 'rgba(51, 58, 47, 0.6)' }}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4" style={{ borderTop: '1px solid rgba(51, 58, 47, 0.1)' }}>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
            style={{ borderColor: 'rgba(51, 58, 47, 0.2)', borderRadius: '0.75rem' }}
          />
          <Button 
            onClick={handleSend} 
            variant="hero" 
            size="icon"
            style={{ backgroundColor: '#333A2F', color: 'white' }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

