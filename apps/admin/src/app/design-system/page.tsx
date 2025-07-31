'use client';

import { useState, useEffect } from 'react';
import { AdminLayout, SidebarItem } from '@saas-admin/ui';
import { Button, Card, CardBody, CardHeader, Input, Badge } from '@saas-admin/ui';
import { designSystemService, type DesignSystemConfig } from '@/services/designSystemService';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import { AdvancedColorPicker } from '@/components/AdvancedColorPicker';

// Shared sidebar items with proper routing
const sidebarItems: SidebarItem[] = [
  {
    id: '/',
    label: 'Dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: '/design-system',
    label: 'Design System',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: '/users',
    label: 'Users',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    badge: '1.2k',
  },
  {
    id: '/analytics',
    label: 'Analytics',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: '/settings',
    label: 'Settings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// Color management interface
interface ColorToken {
  name: string;
  value: string;
  description: string;
}

interface ColorPalette {
  name: string;
  colors: ColorToken[];
}

export default function DesignSystemPage() {
  const [activeItem, setActiveItem] = useState('/design-system');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState('brand');
  const [config, setConfig] = useState<DesignSystemConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [currentOverride, setCurrentOverride] = useState<string>('');
  const router = useRouter();

  // Subscribe to design system changes
  useEffect(() => {
    const loadConfig = async () => {
      const activeConfig = await designSystemService.loadActiveConfig();
      setConfig(activeConfig);
      setOverrides(designSystemService.getOverrides());
      setLoading(false);
    };

    const unsubscribe = designSystemService.subscribe((newConfig) => {
      setConfig(newConfig);
    });

    loadConfig();
    return unsubscribe;
  }, []);

  const handleSidebarItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    router.push(item.id);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const handleColorChange = (colorName: string, newValue: string) => {
    if (!config) return;
    
    setConfig({
      ...config,
      colors: {
        ...config.colors,
        [colorName]: newValue,
      } as any,
    });
  };

  const handleOverrideToggle = (semanticToken: string) => {
    setCurrentOverride(semanticToken);
    setShowOverrideModal(true);
  };

  const handleOverrideSave = (token: string, value: string) => {
    designSystemService.setOverride(token, value);
    setOverrides(designSystemService.getOverrides());
    setShowOverrideModal(false);
    setCurrentOverride('');
  };

  const handleOverrideRemove = (token: string) => {
    designSystemService.removeOverride(token);
    setOverrides(designSystemService.getOverrides());
  };

  const handleTypographyChange = (category: string, token: string, value: string) => {
    designSystemService.updateTypography(category as any, token, value);
  };

  const handleSpacingChange = (token: string, value: string) => {
    designSystemService.updateSpacing(token, value);
  };

  const handleBorderRadiusChange = (token: string, value: string) => {
    designSystemService.updateBorderRadius(token, value);
  };

  const handleExportConfig = () => {
    const configString = designSystemService.exportConfig();
    const blob = new Blob([configString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-system-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleSaveChanges = async () => {
    if (!config) return;
    
    setIsSaving(true);
    
    try {
      const result = await designSystemService.updateConfig(config.id, {
        name: config.name,
        colors: config.colors,
        typography: config.typography,
        spacing: config.spacing,
        borderRadius: config.borderRadius,
        shadows: config.shadows,
      });
      
      if (result) {
        showToast('Design system configuration saved successfully!', 'success');
      } else {
        showToast('Failed to save design system configuration. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An error occurred while saving the configuration.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-body">Loading design system configuration...</div>
      </div>
    );
  }

  const colorPalettes = [
    {
      name: 'brand',
      colors: [
        { name: 'primary', value: config.colors.primary, description: 'Main brand color' },
        { name: 'secondary', value: config.colors.secondary, description: 'Secondary brand color' },
        { name: 'tertiary', value: config.colors.tertiary, description: 'Tertiary brand color' },
      ],
    },
    {
      name: 'neutral',
      colors: [
        { name: 'white', value: config.colors.white, description: 'Pure white' },
        { name: 'light', value: config.colors.light, description: 'Light background' },
        { name: 'medium', value: config.colors.medium, description: 'Medium neutral' },
        { name: 'dark', value: config.colors.dark, description: 'Dark text' },
        { name: 'darkest', value: config.colors.darkest, description: 'Darkest text' },
        { name: 'muted', value: config.colors.muted, description: 'Muted text' },
      ],
    },
    {
      name: 'system',
      colors: [
        { name: 'success', value: config.colors.success, description: 'Success color' },
        { name: 'success-bg', value: config.colors['success-bg'], description: 'Success background' },
        { name: 'warning', value: config.colors.warning, description: 'Warning color' },
        { name: 'warning-bg', value: config.colors['warning-bg'], description: 'Warning background' },
        { name: 'error', value: config.colors.error, description: 'Error color' },
        { name: 'error-bg', value: config.colors['error-bg'], description: 'Error background' },
        { name: 'info', value: config.colors.info, description: 'Info color' },
        { name: 'info-bg', value: config.colors['info-bg'], description: 'Info background' },
      ],
    },
  ];

  const currentPalette = colorPalettes.find(p => p.name === selectedPalette);

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <AdminLayout
        sidebarItems={sidebarItems}
        activeItem={activeItem}
        onSidebarItemClick={handleSidebarItemClick}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
        header={{
          title: 'Design System',
          subtitle: 'Manage colors, typography, and design tokens',
          actions: (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportConfig}>
                Export Config
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="relative"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-btn-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          ),
        }}
      >
      <div className="space-y-6">
        {/* Color Palette Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-heading">Color Palettes</h3>
              <div className="flex space-x-2">
                {colorPalettes.map((palette) => (
                  <Button
                    key={palette.name}
                    variant={selectedPalette === palette.name ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedPalette(palette.name)}
                  >
                    {palette.name.charAt(0).toUpperCase() + palette.name.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {currentPalette && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPalette.colors.map((color) => (
                  <div key={color.name} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-heading">
                            {currentPalette.name.charAt(0).toUpperCase() + currentPalette.name.slice(1)} - {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                          </span>
                          <Badge variant="default" size="sm">
                            {color.value}
                          </Badge>
                        </div>
                        <p className="text-xs text-placeholder">{color.description}</p>
                      </div>
                    </div>
                    <AdvancedColorPicker
                      value={color.value}
                      onChange={(newValue) => handleColorChange(color.name, newValue)}
                      label={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Semantic Color Tokens */}
        <Card>
          <CardHeader>
                          <h3 className="text-lg font-semibold text-heading">Semantic Colors</h3>
              <p className="text-sm text-body">Control how colors are used throughout the interface</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Typography Colors */}
              <div className="space-y-4">
                <h4 className="font-medium text-heading">Typography Colors</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Heading</span>
                      <span className="text-xs text-placeholder">H1-H4, titles</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors.heading}
                      onChange={(newValue) => handleColorChange('heading', newValue)}
                      label="Heading"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Body</span>
                      <span className="text-xs text-placeholder">Default paragraph text</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors.body}
                      onChange={(newValue) => handleColorChange('body', newValue)}
                      label="Body"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Placeholder</span>
                      <span className="text-xs text-placeholder">Form placeholders, muted text</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors.placeholder}
                      onChange={(newValue) => handleColorChange('placeholder', newValue)}
                      label="Placeholder"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Disabled</span>
                      <span className="text-xs text-placeholder">Grayed out content</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors.disabled}
                      onChange={(newValue) => handleColorChange('disabled', newValue)}
                      label="Disabled"
                    />
                  </div>
                </div>
              </div>

              {/* Background Layers */}
              <div className="space-y-4">
                <h4 className="font-medium text-heading">Background Layers</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Main Background</span>
                      <span className="text-xs text-placeholder">Base page background</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors['bg-main']}
                      onChange={(newValue) => handleColorChange('bg-main', newValue)}
                      label="Main Background"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Secondary Background</span>
                      <span className="text-xs text-placeholder">Cards, inputs</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors['bg-secondary']}
                      onChange={(newValue) => handleColorChange('bg-secondary', newValue)}
                      label="Secondary Background"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Tertiary Background</span>
                      <span className="text-xs text-placeholder">Tables, subtle backgrounds</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors['bg-tertiary']}
                      onChange={(newValue) => handleColorChange('bg-tertiary', newValue)}
                      label="Tertiary Background"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-body flex-1">Overlay</span>
                      <span className="text-xs text-placeholder">Modal backdrop</span>
                    </div>
                    <AdvancedColorPicker
                      value={config.colors.overlay}
                      onChange={(newValue) => handleColorChange('overlay', newValue)}
                      label="Overlay"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Colors */}
              <div className="space-y-4">
                <h4 className="font-medium text-heading">Interactive Colors</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                                          <div className="w-4 h-4 rounded border border-medium" style={{ backgroundColor: 'var(--interactive-primary)' }}></div>
                      <span className="text-sm text-body flex-1">Primary Interactive</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-placeholder">Auto: primary-600</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOverrideToggle('interactive-primary')}
                        className="text-xs px-2 py-1"
                      >
                        Override
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                                          <div className="w-4 h-4 rounded border border-medium" style={{ backgroundColor: 'var(--interactive-secondary)' }}></div>
                      <span className="text-sm text-body flex-1">Secondary Interactive</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-placeholder">Auto: secondary-600</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOverrideToggle('interactive-secondary')}
                        className="text-xs px-2 py-1"
                      >
                        Override
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                                          <div className="w-4 h-4 rounded border border-medium" style={{ backgroundColor: 'var(--interactive-hover)' }}></div>
                      <span className="text-sm text-body flex-1">Hover State</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-placeholder">Auto: primary-700</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOverrideToggle('interactive-hover')}
                        className="text-xs px-2 py-1"
                      >
                        Override
                      </Button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </CardBody>
        </Card>

        {/* Typography Management */}
        <Card>
          <CardHeader>
                          <h3 className="text-lg font-semibold text-heading">Typography</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-heading">Font Sizes</h4>
                <div className="space-y-2">
                                     {Object.entries((config.typography.fontSize as Record<string, string>) || {}).map(([size, value]) => (
                     <div key={size} className="flex items-center justify-between">
                                               <span className="text-sm text-body">{size}</span>
                       <Input
                         size="sm"
                         value={value}
                         onChange={(e) => handleTypographyChange('fontSize', size, e.target.value)}
                         className="w-24"
                       />
                     </div>
                   ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-heading">Font Weights</h4>
                <div className="space-y-2">
                                     {Object.entries((config.typography.fontWeight as Record<string, string>) || {}).map(([weight, value]) => (
                     <div key={weight} className="flex items-center justify-between">
                                               <span className="text-sm text-body">{weight}</span>
                       <Input
                         size="sm"
                         value={value}
                         onChange={(e) => handleTypographyChange('fontWeight', weight, e.target.value)}
                         className="w-24"
                       />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Spacing Management */}
        <Card>
          <CardHeader>
                          <h3 className="text-lg font-semibold text-heading">Spacing</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(config.spacing).map(([spacing, value]) => (
                <div key={spacing} className="space-y-2">
                  <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-heading">{spacing}</span>
                    <Input
                      size="sm"
                      value={value}
                      onChange={(e) => handleSpacingChange(spacing, e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <div
                    className="h-4 bg-bg-tertiary rounded"
                    style={{ width: value }}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Border Radius Management */}
        <Card>
          <CardHeader>
                          <h3 className="text-lg font-semibold text-heading">Border Radius</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(config.borderRadius).map(([radius, value]) => (
                <div key={radius} className="space-y-2">
                  <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-heading">{radius}</span>
                    <Input
                      size="sm"
                      value={value}
                      onChange={(e) => handleBorderRadiusChange(radius, e.target.value)}
                      className="w-24"
                    />
                  </div>
                  <div
                    className="h-8 bg-primary-500"
                    style={{ borderRadius: value }}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
                          <h3 className="text-lg font-semibold text-heading">Live Preview</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tertiary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
              <div className="flex space-x-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Sample Input" placeholder="Enter text here" />
                <Input label="Error Input" placeholder="Error state" variant="error" error="This field is required" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
              </AdminLayout>

        {/* Override Modal */}
        {showOverrideModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-bg-main rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Override Semantic Color</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    {currentOverride}
                  </label>
                  <Input
                    type="color"
                    onChange={(e) => handleOverrideSave(currentOverride, e.target.value)}
                    className="w-full h-12"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowOverrideModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } 