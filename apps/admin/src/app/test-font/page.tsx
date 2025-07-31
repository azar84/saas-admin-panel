'use client';

import { useEffect, useState } from 'react';
import { designSystemService } from '@/services/designSystemService';

export default function TestFontPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const activeConfig = await designSystemService.loadActiveConfig();
        setConfig(activeConfig);
        setLoading(false);
      } catch (error) {
        console.error('Error loading config:', error);
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Font Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Font Configuration</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(config?.typography?.fontFamily, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Font Preview</h2>
          <div className="space-y-2">
            <p className="text-4xl">This is a large heading with the selected font</p>
            <p className="text-2xl">This is a medium heading with the selected font</p>
            <p className="text-lg">This is body text with the selected font</p>
            <p className="text-sm">This is small text with the selected font</p>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              This is monospace text with the selected font
            </code>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">CSS Variables</h2>
          <div className="space-y-2">
            <p>Sans font: <code className="bg-gray-100 px-2 py-1 rounded">{getComputedStyle(document.documentElement).getPropertyValue('--font-family-sans')}</code></p>
            <p>Mono font: <code className="bg-gray-100 px-2 py-1 rounded">{getComputedStyle(document.documentElement).getPropertyValue('--font-family-mono')}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
} 