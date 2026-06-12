# TechFlow - IT Company Website

A modern, high-performance IT company website built with Next.js, featuring custom software projects, SaaS products, and interactive 3D elements.

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient accents and smooth animations
- **3D Elements**: Interactive 3D cube and sphere animations using Canvas
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized with Next.js 15 and Tailwind CSS
- **Components**:
  - Hero Section with 3D Cube
  - Services Showcase
  - Custom Projects Portfolio
  - SaaS Products with Pricing
  - Testimonials
  - Call-to-Action
  - Contact Information

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Canvas API
- **Icons**: Lucide React
- **Language**: TypeScript

## 📋 Requirements

- Node.js 16+
- npm or yarn

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── Services.tsx        # Services section
│   ├── Projects.tsx        # Projects portfolio
│   ├── SaaS.tsx            # SaaS products
│   ├── Testimonials.tsx    # Client testimonials
│   ├── CTA.tsx             # Call-to-action
│   ├── Footer.tsx          # Footer
│   └── 3d/
│       ├── FloatingCube.tsx    # 3D cube animation
│       └── SphereAnimation.tsx # 3D sphere animation
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```js
colors: {
  primary: '#0f172a',
  secondary: '#1e293b',
  accent: '#3b82f6',
}
```

### Content
Update the following files to customize content:
- `components/Services.tsx` - Service offerings
- `components/Projects.tsx` - Project showcase
- `components/SaaS.tsx` - SaaS products and pricing

### 3D Elements
The 3D animations are canvas-based for optimal performance:
- `components/3d/FloatingCube.tsx` - Rotating cube
- `components/3d/SphereAnimation.tsx` - Particle sphere

## 🌐 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the .next folder to Netlify
```

## 📄 License

MIT

## 👨‍💼 Support

For questions or support, contact: hello@techflow.com

---

**Made with ❤️ by TechFlow**
