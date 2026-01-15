import { create } from 'zustand';
import { Message, Conversation } from './types';
import { useUserStore } from '@entities/user';

const mockMessages: Message[] = [
  {
    id: 'msg1',
    conversationId: 'conv1',
    senderId: 'user1',
    receiverId: 'emp1',
    content: 'Hello! I am interested in the Senior Frontend Developer position.',
    timestamp: '2024-01-15T10:00:00Z',
    read: true,
  },
  {
    id: 'msg2',
    conversationId: 'conv1',
    senderId: 'emp1',
    receiverId: 'user1',
    content: 'Thank you for your interest! Could you tell me more about your experience with React?',
    timestamp: '2024-01-15T11:00:00Z',
    read: true,
  },
  {
    id: 'msg3',
    conversationId: 'conv1',
    senderId: 'user1',
    receiverId: 'emp1',
    content: 'I have been working with React for over 5 years, building scalable applications...',
    timestamp: '2024-01-15T12:00:00Z',
    read: false,
  },
];

const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participant1Id: 'user1',
    participant2Id: 'emp1',
    lastMessage: mockMessages[mockMessages.length - 1],
    unreadCount: 1,
    updatedAt: '2024-01-15T12:00:00Z',
  },
];

interface MessageStore {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;

  setActiveConversation: (conversationId: string | null) => void;
  getMessages: (conversationId: string) => Message[];
  sendMessage: (conversationId: string, content: string, receiverId: string) => void;
  getOrCreateConversation: (participant1Id: string, participant2Id: string) => string;
  markAsRead: (conversationId: string) => void;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  conversations: mockConversations,
  messages: {
    'conv1': mockMessages,
  },
  activeConversationId: null,

  setActiveConversation: (conversationId) => {
    set({ activeConversationId: conversationId });
    if (conversationId) {
      get().markAsRead(conversationId);
    }
  },

  getMessages: (conversationId: string) => {
    return get().messages[conversationId] || [];
  },

  sendMessage: (conversationId: string, content: string, receiverId: string) => {
    const currentUser = useUserStore.getState().currentUser;
    if (!currentUser) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const messages = { ...get().messages };
    if (!messages[conversationId]) {
      messages[conversationId] = [];
    }
    messages[conversationId] = [...messages[conversationId], newMessage];

    const conversations = get().conversations.map((conv) =>
      conv.id === conversationId
        ? {
            ...conv,
            lastMessage: newMessage,
            updatedAt: newMessage.timestamp,
          }
        : conv
    );

    set({ messages, conversations });
  },

  getOrCreateConversation: (participant1Id: string, participant2Id: string) => {
    const existing = get().conversations.find(
      (conv) =>
        (conv.participant1Id === participant1Id && conv.participant2Id === participant2Id) ||
        (conv.participant1Id === participant2Id && conv.participant2Id === participant1Id)
    );

    if (existing) {
      return existing.id;
    }

    const newConv: Conversation = {
      id: `conv-${participant1Id}-${participant2Id}`,
      participant1Id,
      participant2Id,
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
    };

    const conversations = [...get().conversations, newConv];
    const messages = { ...get().messages };
    messages[newConv.id] = [];

    set({ conversations, messages });
    return newConv.id;
  },

  markAsRead: (conversationId: string) => {
    const messages = { ...get().messages };
    if (messages[conversationId]) {
      messages[conversationId] = messages[conversationId].map((msg) => ({
        ...msg,
        read: true,
      }));
    }

    const conversations = get().conversations.map((conv) =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    );

    set({ messages, conversations });
  },
}));

