import type { Metadata } from 'next';
import './globals.css';
import { DynamicCSS } from '@/components/DynamicCSS';
import { DynamicFontLoader } from '@/components/DynamicFontLoader';

export const metadata: Metadata = {
  title: 'SaaS Admin Panel',
  description: 'A comprehensive admin panel for SaaS platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DynamicCSS />
        <DynamicFontLoader />
        {children}
      </body>
    </html>
  );
} 