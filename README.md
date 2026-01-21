# 🗂️ ControlPlane — Full Stack Next.js Application

A Trello-inspired task management web application built with Next.js App Router, focused on understanding modern full-stack application architecture, authentication workflows, reusable UI systems, and deployment best practices.

This project demonstrates how a real-world productivity application can be structured using server components, client components, and third-party authentication — following industry patterns used in production-grade SaaS applications.

---

## 📌 Project Overview

This application allows users to:
- Authenticate securely and manage sessions
- Create and manage boards, lists, and cards
- Organize tasks visually using a Trello-style layout
- Navigate seamlessly with client-side routing
- Experience a responsive, modern UI optimized for performance

The project leverages Next.js App Router, Server Components, and Client Components to deliver a scalable and maintainable architecture.

---

## 🛡 Tech Stack

![My Skills](https://go-skill-icons.vercel.app/api/icons?i=nextjs,react,typescript,tailwindcss,shadcn,clerk,vercel&theme=dark)

---

## ✨ Core Features
### 🔐 Authentication
- Secure sign-in and sign-up using Clerk
- Protected routes for authenticated users
- User session handling via middleware

### 📋 Boards & Task Management
- Trello-style board layout
- Lists and cards for task organization
- Component-driven UI for scalability

### ⚡ Performance & UX
- Fast navigation using client-side routing
- Optimized rendering with Server Components
- Responsive layout for desktop and mobile

### 🧩 Reusable Component Architecture
- Modular UI components
- Centralized styling system
- Clean separation of concerns

---

## 🚀 Running Locally

    git clone https://github.com/hafsa-aarifeen/controlplane.git
    cd controlplane
    npm install
    npm run dev

### Environment Variables
Create a .env.local file

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=

### Production Build
    npm run build
    npm start

---

## 🔮 Future Enhancements
- Role-based access control
- Activity logs and audit history
