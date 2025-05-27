import { Conversation } from "@/types/conversation";

export const mockConversations: Conversation[] = [
  {
    id: "1",
    contact: {
      id: "user-1",
      name: "Jane Cooper",
      avatar: "/avatars/jane-cooper.png",
      email: "jane.cooper@example.com",
      phone: "+1 (555) 123-4567",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: "online"
    },
    channel: "email",
    lastMessage: "I've been having issues with my recent order...",
    timestamp: "10:42 AM",
    unread: true,
    tags: ["Support", "Order Issue"],
    assignedTo: "John Doe",
    status: "open",
    priority: "high",
    history: [
      { 
        id: "m1", 
        content: "Hello, I ordered product XYZ last week and it still hasn't arrived. Order #12345", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        sender: "customer",
        senderId: "user-1",
        channel: "email",
        status: "delivered"
      },
      { 
        id: "m2", 
        content: "Hi Jane, I'm sorry to hear about the delay. Let me check the status of your order right away.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        sender: "agent",
        senderId: "agent-1",
        channel: "email",
        status: "read"
      }
    ]
  },
  {
    id: "2",
    contact: {
      id: "user-2",
      name: "Alex Morgan",
      avatar: "/avatars/alex-morgan.png",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678",
      lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      status: "online"
    },
    channel: "web",
    lastMessage: "When will the new product be available?",
    timestamp: "Yesterday",
    unread: false,
    tags: ["Sales", "Product Inquiry"],
    assignedTo: null,
    status: "open",
    priority: "medium",
    history: [
      { 
        id: "m1", 
        content: "Hi there! I'm interested in your upcoming product launch. When will it be available?", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        sender: "customer",
        senderId: "user-2",
        channel: "web",
        status: "delivered"
      },
      { 
        id: "m2", 
        content: "Hello Alex! Our new product line will be launching on June 15th. Would you like to be notified when it's available?", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        sender: "agent",
        senderId: "agent-1",
        channel: "web",
        status: "read"
      },
      { 
        id: "m3", 
        content: "Yes, please! Will there be any early access or pre-order options?", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        sender: "customer",
        senderId: "user-2",
        channel: "web",
        status: "read"
      }
    ]
  },
  {
    id: "3",
    contact: {
      id: "user-3",
      name: "Robert Johnson",
      avatar: "/avatars/robert-johnson.png",
      email: "robert.j@example.com",
      phone: "+1 (555) 345-6789",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: "away"
    },
    channel: "whatsapp",
    lastMessage: "Thanks for the information!",
    timestamp: "Yesterday",
    unread: false,
    tags: ["Support"],
    assignedTo: "Sarah Williams",
    status: "pending",
    priority: "low",
    history: [
      { 
        id: "m1", 
        content: "Hello, I need help resetting my account password", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        sender: "customer",
        senderId: "user-3",
        channel: "whatsapp",
        status: "delivered"
      },
      { 
        id: "m2", 
        content: "Hi Robert, I'd be happy to help you reset your password. Please verify your account by providing the email address associated with your account.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
        sender: "agent",
        senderId: "agent-2",
        channel: "whatsapp",
        status: "read"
      },
      { 
        id: "m3", 
        content: "My email is robert.j@example.com", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString(),
        sender: "customer",
        senderId: "user-3",
        channel: "whatsapp",
        status: "read"
      },
      { 
        id: "m4", 
        content: "Thank you. I've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
        sender: "agent",
        senderId: "agent-2",
        channel: "whatsapp",
        status: "read"
      },
      { 
        id: "m5", 
        content: "Thanks for the information!", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 44).toISOString(),
        sender: "customer",
        senderId: "user-3",
        channel: "whatsapp",
        status: "read"
      }
    ]
  },
  {
    id: "4",
    contact: {
      id: "user-4",
      name: "Emily Davis",
      avatar: "/avatars/emily-davis.png",
      email: "emily.davis@example.com",
      phone: "+1 (555) 456-7890",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
      status: "offline"
    },
    channel: "facebook",
    lastMessage: "I'll check out the new features. Thanks!",
    timestamp: "2 days ago",
    unread: false,
    tags: ["Feedback", "Feature Request"],
    assignedTo: "Michael Brown",
    status: "closed",
    priority: "low",
    history: [
      { 
        id: "m1", 
        content: "Hello, I have some suggestions for your app.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        sender: "customer",
        senderId: "user-4",
        channel: "facebook",
        status: "read"
      },
      { 
        id: "m2", 
        content: "Hi Emily! We always appreciate feedback. Please share your suggestions, and I'll make sure they're passed along to our product team.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 71).toISOString(),
        sender: "agent",
        senderId: "agent-3",
        channel: "facebook",
        status: "read"
      },
      { 
        id: "m3", 
        content: "I think it would be great if you could add a dark mode and improve the search functionality.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
        sender: "customer",
        senderId: "user-4",
        channel: "facebook",
        status: "read"
      },
      { 
        id: "m4", 
        content: "Those are excellent suggestions! I've noted them and will share them with our development team. Actually, we're already working on a dark mode feature that should be released in our next update.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 69).toISOString(),
        sender: "agent",
        senderId: "agent-3",
        channel: "facebook",
        status: "read"
      },
      { 
        id: "m5", 
        content: "I'll check out the new features. Thanks!", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 68).toISOString(),
        sender: "customer",
        senderId: "user-4",
        channel: "facebook",
        status: "read"
      }
    ]
  },
  {
    id: "5",
    contact: {
      id: "user-5",
      name: "David Wilson",
      avatar: "/avatars/david-wilson.png",
      email: "david.wilson@example.com",
      phone: "+1 (555) 567-8901",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      status: "online"
    },
    channel: "sms",
    lastMessage: "Can you send me a link to reset my password?",
    timestamp: "3 days ago",
    unread: true,
    tags: ["Support", "Account Issue"],
    assignedTo: null,
    status: "open",
    priority: "high",
    history: [
      { 
        id: "m1", 
        content: "Hi, I can't log in to my account", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        sender: "customer",
        senderId: "user-5",
        channel: "sms",
        status: "delivered"
      },
      { 
        id: "m2", 
        content: "Hello David, I'm sorry to hear you're having trouble logging in. Have you tried resetting your password?", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 71).toISOString(),
        sender: "agent",
        senderId: "agent-1",
        channel: "sms",
        status: "read"
      },
      { 
        id: "m3", 
        content: "Yes, but I didn't receive any reset email", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
        sender: "customer",
        senderId: "user-5",
        channel: "sms",
        status: "read"
      },
      { 
        id: "m4", 
        content: "Let me help you with that. Please confirm the email address associated with your account so I can check if there are any issues.", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 69).toISOString(),
        sender: "agent",
        senderId: "agent-1",
        channel: "sms",
        status: "read"
      },
      { 
        id: "m5", 
        content: "david.wilson@example.com", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 68).toISOString(),
        sender: "customer",
        senderId: "user-5",
        channel: "sms",
        status: "read"
      },
      { 
        id: "m6", 
        content: "Can you send me a link to reset my password?", 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 67).toISOString(),
        sender: "customer",
        senderId: "user-5",
        channel: "sms",
        status: "delivered"
      }
    ]
  }
];
