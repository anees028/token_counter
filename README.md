# 💬 Token Counter Chat Application

A modern, high-performance chat interface built with Next.js 15, TypeScript, and Tailwind CSS. The application features real-time token tracking based on character count, strict usage limits, and a comprehensive statistics dashboard.

## 🚀 Quick Start

To run the application locally, ensure you have Node.js installed and follow these steps:

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

### 3. Open the App

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features

### 🛠️ Chat Interface

- **Real-time Tracking**: As you type, a live counter displays the token usage for the current message.
- **Submission Validation**: The "Send" button is automatically disabled if the message exceeds the per-message limit or the global token cap.
- **Message Persistence**: All chat history is persisted across browser sessions using `localStorage`.
- **Deletion Functionality**: Users can delete individual messages to reclaim global token capacity.

### 📊 Statistics Dashboard

- **Total Usage**: Displays the cumulative number of tokens used across all existing messages.
- **Remaining Tokens**: Calculates available capacity based on a global hard limit.
- **Visual Utilization**: A dynamic progress bar provides immediate feedback on global limit status.

## ⚙️ Token Logic & Rules

The application strictly implements the following business rules:

| Rule | Value | Description |
|------|-------|-------------|
| **Token Calculation** | 1 token = 4 characters | Values are always rounded up to the nearest integer. |
| **Per-Message Limit** | 100 tokens | Messages exceeding this limit cannot be submitted. |
| **Global Limit** | 1,000 tokens | The maximum allowed usage across all active messages. |

## 🏗️ Technical Architecture

This project follows an industry-standard modular structure to ensure scalability and maintainability:

- **App Router (`/src/app`)**: Handles navigation and layout.
- **Context API (`/src/context`)**: Centralizes state management for messages and token calculations, ensuring data consistency between the Chat and Stats pages.
- **Modular Components (`/src/components`)**:
  - `MessageList`: Manages message grouping and date headers.
  - `MessageItem`: Handles individual row logic, avatars, and right-aligned controls.
  - `ChatInput`: Encapsulates live counting logic and validation.
  - `StatsCard`: Reusable component for dashboard metrics.
- **Utility Layer (`/src/utils`)**: Contains pure, testable functions for token calculations.

## 🎨 UI/UX Design

- **Desktop First**: Optimized specifically for a desktop experience as per the project requirements.
- **Feedback Loops**: The UI uses color-coded indicators (Blue/Slate for safe, Red for limits) to guide the user.
- **SaaS Aesthetics**: Built with a clean Slate/Blue color palette, professional typography, and smooth Tailwind transitions for a modern feel.

## 📂 Project Structure

```
token-counter-chat/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── stats/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ChatInput.tsx
│   │   ├── MessageItem.tsx
│   │   ├── MessageList.tsx
│   │   └── StatsCard.tsx
│   ├── context/
│   │   └── ChatContext.tsx
│   └── utils/
│       └── tokenCalculator.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Context API**: State management
- **localStorage**: Client-side data persistence


---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS