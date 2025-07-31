# 🚀 SaaS Admin Panel with Dynamic Design System

A modern, professional SaaS admin panel built with Next.js, React, and Tailwind CSS, featuring a comprehensive dynamic design system that allows real-time customization of colors, typography, spacing, and more.

## ✨ Features

### 🎨 Dynamic Design System
- **Real-time Color Customization** - Change brand colors, typography colors, and background layers instantly
- **Advanced Color Picker** - Professional color picker with eye dropper functionality and extensive color palettes
- **Comprehensive Color Palette** - Material Design, Flat UI, Professional Grays, Brand Colors, Pastel Colors, and Web Safe Colors
- **Typography Control** - Customize font sizes, weights, and line heights
- **Spacing & Layout** - Adjust spacing, border radius, and shadows
- **Live Preview** - See changes applied immediately across the entire application

### 🏗️ Architecture
- **Monorepo Structure** - Organized with Turborepo for scalable development
- **TypeScript Throughout** - Full type safety across frontend and backend
- **Component Library** - Reusable UI components with design system integration
- **Database Persistence** - SQLite database for design system configurations

### 🎯 Admin Dashboard
- **Professional Dashboard** - Revenue reports, customer analytics, order tracking
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Brand-Consistent CTAs** - All buttons use brand colors from design system

### 🔧 Technical Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Express.js, SQLite
- **Build Tool**: Turborepo
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd saas-admin-panel
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development servers**
```bash
# Start both frontend and backend
npm run dev:all

# Or start individually
npm run dev:admin  # Frontend (port 3000)
npm run dev:api    # Backend (port 3001)
```

4. **Open your browser**
```
Frontend: http://localhost:3000
Backend API: http://localhost:3001
```

## 📁 Project Structure

```
saas-admin-panel/
├── apps/
│   ├── admin/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/          # App Router pages
│   │   │   ├── components/   # Admin-specific components
│   │   │   └── services/     # API services
│   │   └── ...
│   └── api/                  # Express.js backend API
│       ├── src/
│       │   ├── database.ts   # SQLite database service
│       │   └── index.ts      # Express server
│       └── ...
├── packages/
│   ├── design-system/        # Design system tokens and utilities
│   │   ├── src/
│   │   │   ├── tokens/       # Color, typography, spacing tokens
│   │   │   └── utils/        # Utility functions
│   │   └── ...
│   └── ui/                   # Reusable UI components
│       ├── src/
│       │   ├── components/   # Button, Card, Input, etc.
│       │   └── ...
│       └── ...
└── ...
```

## 🎨 Design System Features

### Color Management
- **Brand Colors**: Primary, Secondary, Tertiary
- **Neutral Colors**: White, Light, Medium, Dark, Darkest, Muted
- **System Colors**: Success, Warning, Error, Info with backgrounds
- **Typography Colors**: Heading, Body, Placeholder, Disabled
- **Background Layers**: Main, Secondary, Tertiary, Overlay
- **Utility Colors**: Accent colors for special use cases

### Component Integration
- **Dynamic CSS Variables** - All colors applied as CSS custom properties
- **Real-time Updates** - Changes reflect immediately across all components
- **Brand Consistency** - CTAs and sidebar use actual brand colors
- **Professional Quality** - Industry-standard design system approach

### Advanced Color Picker
- **Eye Dropper** - Pick colors from anywhere on screen
- **Multiple Formats** - Hex, RGB, HSL input and conversion
- **Color Palettes** - 125+ preset colors across 6 professional palettes
- **Live Preview** - See color changes instantly

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev:all      # Start both frontend and backend
npm run dev:admin    # Start frontend only
npm run dev:api      # Start backend only

# Build
npm run build        # Build all packages
npm run build:admin  # Build frontend
npm run build:api    # Build backend

# Lint
npm run lint         # Lint all packages
npm run lint:admin   # Lint frontend
npm run lint:api     # Lint backend

# Type Check
npm run type-check   # TypeScript check all packages
```

### Database

The design system configurations are stored in SQLite:
- **Location**: `apps/api/design-system.db`
- **Default Config**: Automatically created on first run
- **API Endpoints**: Full CRUD operations for design system management

### API Endpoints

```
GET    /api/design-system/configs          # List all configs
GET    /api/design-system/configs/:id      # Get specific config
POST   /api/design-system/configs          # Create new config
PUT    /api/design-system/configs/:id      # Update config
DELETE /api/design-system/configs/:id      # Delete config
GET    /api/design-system/active/default   # Get active config
```

## 🎯 Key Components

### Design System Management
- **Color Palette Editor** - Edit brand colors, typography colors, backgrounds
- **Typography Controls** - Font sizes, weights, line heights
- **Spacing & Layout** - Margins, padding, border radius, shadows
- **Live Preview** - See changes applied immediately

### Admin Dashboard
- **Revenue Reports** - Interactive charts and analytics
- **Customer Management** - User profiles and activity tracking
- **Order Tracking** - Recent orders and status updates
- **Analytics Overview** - Key metrics and performance indicators

### UI Components
- **Button System** - Primary, Secondary, Tertiary, Outline, Ghost, Danger variants
- **Card Components** - Header, Body, Footer with consistent styling
- **Input System** - Text inputs, color pickers, form controls
- **Layout Components** - Sidebar, Header, AdminLayout with responsive design

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build:admin
# Deploy to Vercel with Next.js
```

### Backend (Railway/Render)
```bash
npm run build:api
# Deploy to Railway, Render, or similar
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (.env)
PORT=3001
DATABASE_URL=./design-system.db
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Monorepo managed with [Turborepo](https://turbo.build/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Made with ❤️ for modern SaaS applications** 