import { AppHeader } from '@widgets/app-header';
import { useMessageStore } from '@entities/message';
import { useUserStore } from '@entities/user';
import { MessageSquare, User } from 'lucide-react';
import { useState } from 'react';
import { ChatWindow } from '@features/chat';

export const ChatPage = () => {
  const { conversations, setActiveConversation } = useMessageStore();
  const { currentUser, getUser } = useUserStore();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const getOtherParticipant = (conversation: any) => {
    const otherId =
      conversation.participant1Id === currentUser?.id
        ? conversation.participant2Id
        : conversation.participant1Id;
    return getUser(otherId);
  };

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setSelectedConversation(conversationId);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Messages</h1>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-card p-4">
              <h2 className="font-heading text-xl font-bold mb-4">Conversations</h2>
              {conversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => {
                    const other = getOtherParticipant(conv);
                    return (
                      <button
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv.id)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedConversation === conv.id
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {other?.avatar ? (
                            <img
                              src={other.avatar}
                              alt={other.name}
                              className="w-12 h-12 rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{other?.name || 'Unknown'}</p>
                            {conv.lastMessage && (
                              <p className="text-sm text-muted-foreground truncate">
                                {conv.lastMessage.content}
                              </p>
                            )}
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedConversation ? (
              <div className="bg-card rounded-2xl shadow-card h-[500px] sm:h-[600px] overflow-hidden">
                {(() => {
                  const conv = conversations.find((c) => c.id === selectedConversation);
                  const other = conv ? getOtherParticipant(conv) : null;
                  return (
                    <ChatWindow
                      conversationId={selectedConversation}
                      receiverId={other?.id || ''}
                      receiverName={other?.name || 'User'}
                      receiverAvatar={other?.avatar}
                      embedded={true}
                    />
                  );
                })()}
              </div>
            ) : (
              <div className="bg-card rounded-2xl shadow-card h-[600px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

