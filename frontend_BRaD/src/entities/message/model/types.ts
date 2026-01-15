export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant1Id: string;
  participant2Id: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

