# Match the Vibe 🎵

A modern web application for music analysis and voice modulation tools, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Voice Modulation Tools** - Real-time voice processing and effects
- **Pitch Matching** - Advanced audio analysis and pitch detection
- **Modern UI** - Beautiful, responsive design with dark/light theme support
- **Real-time Processing** - Live audio input and output capabilities
- **Authentication** - Secure user authentication with Supabase
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Audio Processing**: Web Audio API, React hooks
- **State Management**: Zustand, React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd match-the-vibe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
match-the-vibe/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── voice/          # Voice-related components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── config/             # Configuration files
│   ├── data/               # Static data and tooltips
│   └── integrations/       # External service integrations
├── public/                 # Static assets
├── supabase/               # Supabase configuration
└── docs/                   # Documentation
```

## 🎨 Design System

The project uses a custom design system with:

- **Color Palette**: HSL-based color system with dark/light themes
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components built with shadcn/ui

## 🔐 Authentication

Authentication is handled through Supabase Auth with:

- Email/password authentication
- Social login options
- Protected routes
- User session management

## 🎵 Audio Features

- **Real-time Audio Processing**: Live voice input and output
- **Voice Modulation**: Various audio effects and filters
- **Pitch Detection**: Advanced audio analysis algorithms
- **File Upload**: Support for audio file uploads

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Contact the development team

---

Made with ❤️ by the Match the Vibe team
