# Connect Tutor

A modern and intuitive tutor connection platform built with cutting-edge technologies.

## About

**Connect Tutor** is a comprehensive web-based platform designed to bridge the gap between tutors and parents. Our mission is to make quality education more accessible and convenient by providing a seamless experience for finding, connecting, and managing tutoring relationships.

## System Requirements

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**: Package manager
- **Git**: To clone the repository

## Clone Repository

```bash
# Clone the repository
git clone https://github.com/m4l0n6/tutos.git

# Navigate to the project folder
cd tutos
```

## Installation

```bash
# Install all dependencies
npm install

# or with yarn
yarn install

# or with pnpm
pnpm install
```

## Running the Project

### Development Mode

```bash
npm run dev
```

The application will run at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Technologies Used

### Frontend Framework
- **[Next.js 16.1.7](https://nextjs.org/)** - React framework with SSR/SSG
- **[React 19.2.4](https://react.dev/)** - UI library

### Styling & UI
- **[Tailwind CSS 4.2.1](https://tailwindcss.com/)** - CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library based on Radix UI
- **[Radix UI 1.4.3](https://www.radix-ui.com/)** - Headless UI components
- **[Framer Motion 12.38.0](https://www.framer.com/motion/)** - Animation library

### State Management & Data Fetching
- **[TanStack React Query 5.96.2](https://tanstack.com/query/)** - Server state management
- **[Nuqs 2.8.9](https://nuqs.47ng.com/)** - URL state management
- **[Axios 1.14.0](https://axios-http.com/)** - HTTP client

### Form & Validation
- **[React Hook Form 7.74.0](https://react-hook-form.com/)** - Form state management
- **[Zod 4.4.1](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers 5.2.2](https://github.com/react-hook-form/resolvers)** - Resolver for Hook Form

### Data Table
- **[TanStack React Table 8.21.3](https://tanstack.com/table/)** - Headless table library

## Folder Structure

```
tutor-management/
├── app/                         # App router (Next.js 13+)
│   ├── (auth)/                  # Auth group layout
│   │   ├── login/               # Login page
│   │   ├── signup/              # Sign up page
│   │   └── auth-success/        # Auth success page
│   ├── dashboard/               # Dashboard pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # UI components (shadcn/ui)
│   ├── common/                  # Common components
│   ├── homepage/                # Homepage components
│   └── wrapper/                 # Layout wrappers
├── hooks/                        # Custom React hooks
│   └── queries/                 # React Query hooks
├── lib/                          # Utility functions
│   └── validations/             # Zod schemas
├── context/                      # React context
├── types/                        # TypeScript types
├── config/                       # Configuration files
├── public/                       # Static assets
├── package.json                 # Dependencies
└── tsconfig.json               # TypeScript config
```
