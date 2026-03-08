# Fluent UI React v9 with Figma Integration

A modern React development environment using Microsoft's Fluent UI React v9 components with integrated Figma API access for design token extraction and prototype management.

## Features

- ⚡ **Vite** - Next generation frontend tooling with lightning-fast HMR
- 🎨 **Fluent UI React v9** - Microsoft's modern component library with built-in theming
- 📘 **TypeScript** - Full type safety and IDE support
- 🎭 **Fluent UI Icons** - Comprehensive icon library
- 🎨 **Figma Integration** - Access Figma files, extract design tokens, and manage prototypes
- 🚀 **Production Ready** - Optimized build configuration

## Figma Integration

This app provides direct integration with Figma's API to:

- **Authenticate** with your Figma account
- **Browse and access** your Figma design files
- **Extract design tokens** (colors, typography, spacing) from Figma files
- **Export tokens** as JSON or CSS variables
- **Create and manage** design prototypes
- **Open files directly** in Figma for editing

### Getting Started with Figma

1. **Get a Figma Access Token:**
   - Go to [Figma Account Settings](https://www.figma.com/settings)
   - Scroll to "Personal access tokens"
   - Click "Create a new personal access token"
   - Copy the token (keep it secure!)

2. **Authenticate in the App:**
   - Start the development server
   - Go to the "Authentication" tab
   - Enter your Figma access token
   - Click "Authenticate"

3. **Explore Your Files:**
   - Switch to the "Files" tab to browse your Figma projects
   - Click on any file to view details and extract tokens
   - Use the "Design Tokens" tab to export colors and styles
   - Create prototypes in the "Prototypes" tab

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite 7** - Build tool and dev server
- **Fluent UI React v9** - Component library
- **Axios** - HTTP client for Figma API
- **ESLint** - Code quality

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Figma account with access token

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
│   ├── components/
│   │   ├── FigmaAuth.tsx         # Figma authentication component
│   │   ├── FigmaFiles.tsx        # File browser component
│   │   ├── FigmaTokens.tsx       # Design token extractor
│   │   └── FigmaPrototypes.tsx   # Prototype management
│   ├── services/
│   │   └── figmaAPI.ts           # Figma API service
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global styles
│   └── assets/                   # Static assets
├── public/                       # Public static files
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies and scripts
```

## Figma API Features

### Authentication
- Secure token storage in localStorage
- Token validation with user profile check
- Easy token management and clearing

### File Access
- Browse team projects and files
- View file thumbnails and metadata
- Direct links to open files in Figma
- File selection for token extraction

### Design Tokens
- Automatic extraction of colors, typography, and styles
- Export as JSON or CSS custom properties
- Copy to clipboard functionality
- Download as JSON file

### Prototypes
- Create prototype entries with descriptions
- Link to Figma files
- Add comments to Figma files when creating prototypes
- Open prototypes in Figma dev mode

## Figma API Permissions

Your Figma access token needs the following scopes:
- `files:read` - Read file contents and metadata
- `comments:write` - Add comments to files
- `teams:read` - Access team projects (if using team features)

## Resources

- [Fluent UI React Documentation](https://react.fluentui.dev/)
- [Fluent UI React Components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)
- [Fluent UI Icons](https://react.fluentui.dev/?path=/docs/icons-usage--page)
- [Figma Developer Documentation](https://www.figma.com/developers/api)
- [Figma Access Tokens](https://www.figma.com/developers/api#access-tokens)
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)

## Next Steps

1. Authenticate with your Figma account
2. Explore your design files and extract tokens
3. Create prototypes for your designs
4. Customize the UI to match your design system
5. Deploy to your preferred hosting platform
6. Integrate with your design workflow

## License

This project is open source and available under the MIT License.
