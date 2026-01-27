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
    <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF', paddingTop: '4rem' }}>
      <AppHeader />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ maxWidth: '1280px' }}>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-6 sm:mb-8" style={{ color: '#333A2F' }}>Messages</h1>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <h2 className="font-heading text-xl font-bold mb-4" style={{ color: '#333A2F' }}>Conversations</h2>
              {conversations.length === 0 ? (
                <div className="text-center py-8" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
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
                            ? 'border-2'
                            : ''
                        }`}
                        style={selectedConversation === conv.id 
                          ? { backgroundColor: '#EBEDDF', borderColor: '#333A2F' }
                          : { backgroundColor: '#EBEDDF' }
                        }
                      >
                        <div className="flex items-center gap-3">
                          {other?.avatar ? (
                            <img
                              src={other.avatar}
                              alt={other.name}
                              className="w-12 h-12 rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#333A2F' }}>
                              <User className="w-6 h-6" style={{ color: 'white' }} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate" style={{ color: '#333A2F' }}>{other?.name || 'Unknown'}</p>
                            {conv.lastMessage && (
                              <p className="text-sm truncate" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
                                {conv.lastMessage.content}
                              </p>
                            )}
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#333A2F', color: 'white' }}>
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
              <div className="bg-white rounded-2xl shadow-lg h-[500px] sm:h-[600px] overflow-hidden" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
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
              <div className="bg-white rounded-2xl shadow-lg h-[600px] flex items-center justify-center" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-center" style={{ color: 'rgba(51, 58, 47, 0.7)' }}>
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

