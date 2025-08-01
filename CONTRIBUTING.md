# Contributing to Match the Vibe 🎵

Thank you for your interest in contributing to Match the Vibe! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Here are the main ways you can contribute:

- 🐛 **Bug Reports** - Report issues you find
- 💡 **Feature Requests** - Suggest new features
- 🔧 **Code Contributions** - Submit pull requests
- 📚 **Documentation** - Improve docs and examples
- 🎨 **Design** - Help with UI/UX improvements
- 🧪 **Testing** - Write tests or report bugs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/match-the-vibe.git
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

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS classes, avoid custom CSS when possible
- **Naming**: Use descriptive names, follow camelCase for variables/functions
- **Comments**: Add comments for complex logic

### File Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── [feature]/      # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

### Component Guidelines

- Use TypeScript interfaces for props
- Implement proper error boundaries
- Add loading states where appropriate
- Make components accessible (ARIA labels, keyboard navigation)
- Test components thoroughly

### Example Component Structure

```tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <div className={cn("base-styles", className)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases

### Example Test

```tsx
import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

describe("Component", () => {
  it("renders with title", () => {
    render(<Component title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
```

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(auth): add social login with Google
fix(audio): resolve microphone permission issue
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(hooks): extract audio logic into custom hook
test(components): add unit tests for VoiceToolButton
chore(deps): update dependencies
```

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure your code works**

   - Run the development server
   - Test your changes thoroughly
   - Check for TypeScript errors: `npx tsc --noEmit`

2. **Follow the style guide**

   - Run linter: `npm run lint`
   - Fix any linting errors
   - Ensure consistent formatting

3. **Update documentation**
   - Update README if needed
   - Add JSDoc comments for new functions
   - Update component documentation

### Creating a Pull Request

1. **Push your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**

   - Use the PR template
   - Provide clear description
   - Link related issues
   - Add screenshots for UI changes

3. **PR Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Other (please describe)

   ## Testing

   - [ ] Tests pass
   - [ ] Manual testing completed
   - [ ] No console errors

   ## Screenshots (if applicable)

   Add screenshots for UI changes

   ## Checklist

   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Try to reproduce the bug
3. Check browser console for errors
4. Test in different browsers

### Bug Report Template

```markdown
## Bug Description

Clear description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

## Additional Context

Screenshots, console logs, etc.
```

## 💡 Feature Requests

### Before Requesting

1. Check if feature already exists
2. Consider if it fits the project scope
3. Think about implementation complexity

### Feature Request Template

```markdown
## Feature Description

Clear description of the feature

## Use Case

Why this feature is needed

## Proposed Solution

How you think it should work

## Alternatives Considered

Other approaches you've thought about

## Additional Context

Screenshots, mockups, etc.
```

## 🎨 Design Contributions

### UI/UX Guidelines

- Follow the existing design system
- Use Tailwind CSS classes
- Maintain accessibility standards
- Ensure responsive design
- Test on different screen sizes

### Design Resources

- Color palette: Defined in `src/index.css`
- Component library: shadcn/ui
- Icons: Lucide React
- Typography: System fonts with fallbacks

## 🔧 Audio Development

### Audio Guidelines

- Use Web Audio API for processing
- Implement proper error handling
- Consider browser compatibility
- Test with different audio inputs
- Handle permissions gracefully

### Audio Testing

- Test with different microphones
- Test with various audio formats
- Test real-time processing
- Test error scenarios

## 📚 Documentation

### Documentation Standards

- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Keep documentation up to date
- Use proper markdown formatting

### Documentation Areas

- README.md - Project overview
- CONTRIBUTING.md - This file
- Component documentation
- API documentation
- Setup guides

## 🏷️ Labels and Milestones

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - Urgent issues
- `priority: low` - Nice to have

## 🎯 Getting Help

### Questions and Support

- Check existing issues and discussions
- Search documentation
- Ask in GitHub Discussions
- Join our community chat

### Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🙏 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Project README
- Release notes
- Community acknowledgments

## 📄 License

By contributing to Match the Vibe, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Match the Vibe! 🎵

Your contributions help make this project better for everyone in the music and audio community.
