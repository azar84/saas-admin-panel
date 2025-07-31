# SaaS Admin Panel

A comprehensive, reusable admin panel for SaaS platforms built with Next.js, React, and Tailwind CSS. This project features a robust design system, reusable components, and a monorepo structure for scalability.

## 🚀 Features

- **Design System**: Comprehensive token-based design system with colors, typography, spacing, and more
- **Reusable Components**: Modular UI components with consistent styling and behavior
- **Responsive Layout**: Sidebar navigation with collapsible functionality and mobile support
- **Monorepo Structure**: Organized workspace with shared packages
- **TypeScript**: Full TypeScript support for type safety
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

## 📁 Project Structure

```
saas-admin-panel/
├── apps/
│   └── admin/                 # Next.js admin application
│       ├── src/
│       │   └── app/          # Next.js app directory
│       ├── package.json
│       ├── next.config.js
│       └── tailwind.config.js
├── packages/
│   ├── design-system/        # Design tokens and utilities
│   │   ├── src/
│   │   │   ├── tokens/       # Color, spacing, typography tokens
│   │   │   └── utils/        # Utility functions
│   │   └── package.json
│   └── ui/                   # Reusable UI components
│       ├── src/
│       │   └── components/   # Button, Input, Card, Layout, etc.
│       └── package.json
├── package.json              # Root package.json (workspace)
└── turbo.json               # Turbo configuration
```

## 🎨 Design System

The design system is built around a token-based approach with the following categories:

### Colors
- **Primary**: Blue-based color palette for main actions
- **Secondary**: Purple-based color palette for secondary actions
- **Neutral**: Gray-based color palette for text and backgrounds
- **Success**: Green-based color palette for positive states
- **Warning**: Yellow-based color palette for caution states
- **Error**: Red-based color palette for error states

### Typography
- **Font Family**: Inter for UI, JetBrains Mono for code
- **Font Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- **Font Weights**: thin, extralight, light, normal, medium, semibold, bold, extrabold, black
- **Line Heights**: none, tight, snug, normal, relaxed, loose

### Spacing
- **Base Units**: 0.25rem (4px) increments
- **Range**: 0 to 96 (0px to 24rem)

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🧩 Components

### Core Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger) and sizes
- **Input**: Form inputs with validation states and helper text
- **Card**: Container component with header, body, and footer sections
- **Badge**: Status indicators with various color variants

### Layout Components
- **AdminLayout**: Main layout wrapper with sidebar and content area
- **Sidebar**: Navigation component with collapsible functionality
- **Header**: Page header with title, subtitle, and actions

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build packages**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📦 Available Scripts

### Root Level
- `npm run dev` - Start all development servers
- `npm run build` - Build all packages and applications
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages
- `npm run clean` - Clean all build artifacts

### Package Level
- `npm run build` - Build the package
- `npm run dev` - Watch mode for development
- `npm run clean` - Clean build artifacts

## 🎯 Usage Examples

### Using the Design System

```tsx
import { colors, spacing, typography } from '@saas-admin/design-system';

// Use design tokens in your components
const styles = {
  backgroundColor: colors.primary[500],
  padding: spacing[4],
  fontSize: typography.fontSize.lg,
};
```

### Using UI Components

```tsx
import { Button, Card, CardBody, Input } from '@saas-admin/ui';

function MyComponent() {
  return (
    <Card>
      <CardBody>
        <Input 
          label="Email" 
          placeholder="Enter your email"
          variant="default"
        />
        <Button variant="primary" size="md">
          Submit
        </Button>
      </CardBody>
    </Card>
  );
}
```

### Using the Admin Layout

```tsx
import { AdminLayout, SidebarItem } from '@saas-admin/ui';

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  // ... more items
];

function AdminPage() {
  return (
    <AdminLayout
      sidebarItems={sidebarItems}
      activeItem="dashboard"
      header={{
        title: 'Dashboard',
        subtitle: 'Welcome to your admin panel',
      }}
    >
      {/* Your page content */}
    </AdminLayout>
  );
}
```

## 🔧 Customization

### Adding New Design Tokens

1. Add tokens to the appropriate file in `packages/design-system/src/tokens/`
2. Export them from the main index file
3. Update the Tailwind configuration if needed

### Creating New Components

1. Create the component in `packages/ui/src/components/`
2. Add proper TypeScript interfaces
3. Use the design system tokens for styling
4. Export from the component's index file
5. Add to the main UI package exports

### Extending the Layout

The `AdminLayout` component is designed to be flexible and can be extended with:
- Custom header components
- Additional sidebar sections
- Footer components
- Custom navigation patterns

## 🧪 Development

### Adding New Features

1. **Design System**: Add tokens to the design system package
2. **Components**: Create reusable components in the UI package
3. **Pages**: Add new pages to the admin application
4. **Testing**: Add tests for new functionality

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Use the design system tokens for styling
- Write comprehensive JSDoc comments

## 📚 Documentation

- **Design System**: See `packages/design-system/README.md`
- **UI Components**: See `packages/ui/README.md`
- **API Documentation**: Generated from TypeScript interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the example implementations

---

Built with ❤️ using Next.js, React, and Tailwind CSS 