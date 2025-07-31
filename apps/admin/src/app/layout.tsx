import type { Metadata } from 'next';
import './globals.css';
import { DynamicCSS } from '@/components/DynamicCSS';
import { designSystemService } from '@/services/designSystemService';

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
        {children}
      </body>
    </html>
  );
} 