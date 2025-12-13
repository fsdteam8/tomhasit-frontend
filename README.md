# TomHasIt Frontend Project

A modern web application built with [Next.js](https://nextjs.org/) and [React](https://react.dev/), featuring a responsive design with [Tailwind CSS](https://tailwindcss.com/) and smooth animations using [Framer Motion](https://www.framer.com/motion/).

## 🚀 Features

### Public Website
- **Landing Page**: Main entry point illustrating the brand/service.
- **Gallery**: Visual showcase of projects or media (`/gallery`).
- **Got Dial Tone**: Service inquiry or specific feature section (`/got-dial-tone`).

### Authentication (`/app/(auth)`)
- **Login**: Secure user authentication.
- **Password Management**: Forgot password and change password functionality.
- **Email Verification**: User account verification flows.

### Dashboard (`/app/dashboard`)
- **User/Admin Dashboard**: Protected area for managing application data.
- **Gallery Management**: Manage gallery items.
- **Dial Tone Management**: Manage specific service requests or data.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (based on [Radix UI](https://www.radix-ui.com/))
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management / Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: Integration with standard form libraries (implied by UI components).
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router directories
│   ├── (auth)/           # Authentication route group (Login, Register, etc.)
│   ├── (website)/        # Public website route group
│   ├── dashboard/        # Protected dashboard route group
│   └── api/              # API route handlers
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn/ui base components
│   └── ...               # Feature-specific components (Header, Hero, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API clients
├── providers/            # React context providers
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## ⚡ Getting Started

### Prerequisites

Make sure you have **Node.js** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd tomhasit-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting

To run the linter:

```bash
npm run lint
```

## 📄 License

[Add License Information Here]
