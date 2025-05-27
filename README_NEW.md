# Omni-Channel Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13.4.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?logo=typescript)](https://www.typescriptlang.org/)

A modern, responsive frontend for the Omni-Channel communication platform, built with Next.js 13, React 18, and TypeScript. This application provides a unified interface for managing multi-channel communications including SMS, WhatsApp, Email, and Web Chat.

## ✨ Features

- **Multi-Channel Inbox**: Unified view for all customer conversations across different channels
- **Knowledge Base**: Document management and article editor for AI-powered responses
- **AI Playground**: Interactive interface to test and refine AI responses
- **Persona Management**: Create and manage different AI personas for consistent communication
- **Real-time Messaging**: Seamless communication across all connected channels
- **Responsive Design**: Fully responsive interface that works on desktop and mobile
- **Dark/Light Mode**: Built-in theme support for better user experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager
- Backend API server (see [Backend Repository](https://github.com/Haseeb-Arshad/omni-channel))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Haseeb-Arshad/omni-channel-frontend.git
   cd omni-channel-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000  # Your backend API URL
   NEXT_PUBLIC_APP_URL=http://localhost:3001   # Frontend URL
   ```

4. Run the development server:
   ```bash
   npm run dev -- -p 3001
   # or
   yarn dev -p 3001
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser to see the application.

## 🏗 Project Structure

```
app/
├── auth/                  # Authentication pages
├── dashboard/             # Main application dashboard
│   ├── channels/          # Channel management
│   ├── conversations/     # Conversation views
│   ├── kb/                # Knowledge base management
│   ├── knowledge/         # Knowledge base views
│   ├── persona/           # AI persona management
│   └── settings/          # Application settings
├── api/                   # API route handlers
└── components/            # Reusable UI components
```

## 🔧 Technologies Used

- **Frontend Framework**: Next.js 13 with App Router
- **UI Components**: Radix UI Primitives with custom styling
- **Styling**: Tailwind CSS with CSS Modules
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Animation**: Framer Motion

## 🌐 Connecting to Backend

This frontend is designed to work with the [Omni-Channel Backend](https://github.com/Haseeb-Arshad/omni-channel). Make sure to:

1. Clone and set up the backend repository
2. Update the `NEXT_PUBLIC_API_URL` in your `.env.local` to point to your backend server
3. Ensure CORS is properly configured on the backend to accept requests from your frontend URL

## 🧪 Testing

To run the test suite:

```bash
npm test
# or
yarn test
```

## 🛠 Build for Production

```bash
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or feedback, please open an issue on the repository.
