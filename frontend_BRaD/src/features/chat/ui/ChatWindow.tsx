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

  const containerClass = embedded
    ? 'w-full h-full bg-card rounded-2xl shadow-xl flex flex-col'
    : 'fixed bottom-4 right-4 w-96 h-[600px] bg-card rounded-2xl shadow-xl flex flex-col z-50';

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          {receiverAvatar ? (
            <img src={receiverAvatar} alt={receiverName} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">{receiverName[0]}</span>
            </div>
          )}
          <div>
            <p className="font-semibold">{receiverName}</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
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
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">
                      {sender?.name[0] || 'U'}
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isOwn
                      ? 'bg-hero-gradient text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} variant="hero" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

