import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ParticlesBackground } from '@/components/particles-background';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Marcos Menezes | Desenvolvedor Full Stack",
    template: "%s | Marcos Menezes"
  },
  description: "Portfólio profissional de Marcos Menezes, Desenvolvedor Full Stack especializado em React, Next.js e Node.js",
  keywords: [
    "desenvolvedor",
    "full stack",
    "portfólio",
    "tecnologia",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "desenvolvimento web"
  ],
  authors: [{ name: "Marcos Menezes" }],
  creator: "Marcos Menezes",
  publisher: "Marcos Menezes",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://marcosmenezes.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt-BR',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://marcosmenezes.dev',
    siteName: 'Marcos Menezes',
    title: 'Marcos Menezes | Desenvolvedor Full Stack',
    description: 'Transformando ideias em experiências digitais incríveis com código limpo e soluções inteligentes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marcos Menezes - Desenvolvedor Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcos Menezes | Desenvolvedor Full Stack',
    description: 'Transformando ideias em experiências digitais incríveis com código limpo e soluções inteligentes.',
    images: ['/og-image.jpg'],
    creator: '@devmarcos24',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Marcos Menezes',
  },
  other: {
    'msapplication-TileColor': '#3b82f6',
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // Log para depuração
  if (typeof window !== 'undefined') {
    console.log('RootLayout renderizado', {
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    });
  }

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('Script de depuração executado');
              window.addEventListener('load', () => {
                console.log('Página carregada:', window.location.pathname);
              });
            `,
          }}
        />
      </head>
      <body className={cn(
        'min-h-screen bg-white font-sans antialiased dark:bg-slate-950',
        inter.variable,
        jetbrainsMono.variable
      )}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ParticlesBackground />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
