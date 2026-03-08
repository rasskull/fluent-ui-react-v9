# Fluent UI React v9 with Vite

A modern React development environment using Microsoft's Fluent UI React v9 components with Vite for fast, optimized builds.

## Features

- ⚡ **Vite** - Next generation frontend tooling with lightning-fast HMR
- 🎨 **Fluent UI React v9** - Microsoft's modern component library with built-in theming
- 📘 **TypeScript** - Full type safety and IDE support
- 🎭 **Fluent UI Icons** - Comprehensive icon library
- 🚀 **Production Ready** - Optimized build configuration

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite 7** - Build tool and dev server
- **Fluent UI React v9** - Component library
- **ESLint** - Code quality

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server with hot module reloading:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
.
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Global styles
│   └── assets/           # Static assets
├── public/               # Public static files
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Using Fluent UI Components

Fluent UI React v9 provides a comprehensive set of components. Here's a quick example:

```tsx
import { Button, Card, FluentProvider, teamsLightTheme, Text, Title1 } from '@fluentui/react-components'
import { ArrowRight24Regular } from '@fluentui/react-icons'

function MyComponent() {
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Card>
        <Title1>Welcome</Title1>
        <Text>This is a Fluent UI component</Text>
        <Button icon={<ArrowRight24Regular />}>Click me</Button>
      </Card>
    </FluentProvider>
  )
}
```

## Available Themes

- `teamsLightTheme` - Light theme (default)
- `teamsDarkTheme` - Dark theme
- `webLightTheme` - Web light theme
- `webDarkTheme` - Web dark theme
- `highContrastTheme` - High contrast theme

## Resources

- [Fluent UI React Documentation](https://react.fluentui.dev/)
- [Fluent UI React Components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)
- [Fluent UI Icons](https://react.fluentui.dev/?path=/docs/icons-usage--page)
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)

## Next Steps

1. Explore the Fluent UI component library
2. Customize themes and colors
3. Build your application components
4. Deploy to your preferred hosting platform

## License

This project is open source and available under the MIT License.
