'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@saas-admin/design-system';
import { Button } from '@saas-admin/ui';

interface AdvancedColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
  label?: string;
}

export function AdvancedColorPicker({ value, onChange, className, label }: AdvancedColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hexValue, setHexValue] = useState(value);
  const [rgbValue, setRgbValue] = useState({ r: 0, g: 0, b: 0 });
  const [hslValue, setHslValue] = useState({ h: 0, s: 0, l: 0 });
  const [isEyeDropperSupported, setIsEyeDropperSupported] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Check if EyeDropper API is supported
  useEffect(() => {
    setIsEyeDropperSupported('EyeDropper' in window);
  }, []);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Update all values when hex changes
  useEffect(() => {
    if (value !== hexValue) {
      setHexValue(value);
      const rgb = hexToRgb(value);
      setRgbValue(rgb);
      setHslValue(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }
  }, [value]);

  // Handle hex input change
  const handleHexChange = (newHex: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      setHexValue(newHex);
      const rgb = hexToRgb(newHex);
      setRgbValue(rgb);
      setHslValue(rgbToHsl(rgb.r, rgb.g, rgb.b));
      onChange(newHex);
    } else {
      setHexValue(newHex);
    }
  };

  // Handle RGB input change
  const handleRgbChange = (component: 'r' | 'g' | 'b', newValue: number) => {
    const newRgb = { ...rgbValue, [component]: Math.max(0, Math.min(255, newValue)) };
    setRgbValue(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexValue(newHex);
    setHslValue(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    onChange(newHex);
  };

  // Handle HSL input change
  const handleHslChange = (component: 'h' | 's' | 'l', newValue: number) => {
    const newHsl = { ...hslValue, [component]: Math.max(0, Math.min(component === 'h' ? 360 : 100, newValue)) };
    setHslValue(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgbValue(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexValue(newHex);
    onChange(newHex);
  };

  // Handle eye dropper
  const handleEyeDropper = async () => {
    if (!isEyeDropperSupported) return;
    
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      const color = result.sRGBHex;
      handleHexChange(color);
    } catch (error) {
      console.log('Eye dropper cancelled or failed');
    }
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Comprehensive color palettes
  const colorPalettes = {
    // Material Design Colors
    material: [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
      '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000'
    ],
    // Flat UI Colors
    flat: [
      '#E74C3C', '#C0392B', '#E67E22', '#D35400', '#F1C40F',
      '#F39C12', '#2ECC71', '#27AE60', '#1ABC9C', '#16A085',
      '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#34495E',
      '#2C3E50', '#E74C3C', '#C0392B', '#ECF0F1', '#BDC3C7'
    ],
    // Professional Grays
    grays: [
      '#000000', '#1A1A1A', '#333333', '#4D4D4D', '#666666',
      '#808080', '#999999', '#B3B3B3', '#CCCCCC', '#E6E6E6',
      '#F0F0F0', '#F5F5F5', '#FAFAFA', '#FFFFFF'
    ],
    // Brand Colors
    brand: [
      '#FF1744', '#D500F9', '#651FFF', '#3D5AFE', '#2979FF',
      '#00B0FF', '#00E5FF', '#1DE9B6', '#00E676', '#76FF03',
      '#C6FF00', '#EEFF41', '#FFFF00', '#FFD600', '#FF9100',
      '#FF6D00', '#FF3D00', '#DD2C00', '#BF360C', '#3E2723'
    ],
    // Pastel Colors
    pastel: [
      '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
      '#FFB3F7', '#E8BAFF', '#FFE4B3', '#B3FFE4', '#B3E8FF',
      '#F7B3FF', '#FFB3D9', '#D9B3FF', '#B3FFF7', '#F7FFB3'
    ],
    // Web Safe Colors
    webSafe: [
      '#000000', '#000033', '#000066', '#000099', '#0000CC', '#0000FF',
      '#003300', '#003333', '#003366', '#003399', '#0033CC', '#0033FF',
      '#006600', '#006633', '#006666', '#006699', '#0066CC', '#0066FF',
      '#009900', '#009933', '#009966', '#009999', '#0099CC', '#0099FF',
      '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
      '#00FF00', '#00FF33', '#00FF66', '#00FF99', '#00FFCC', '#00FFFF'
    ]
  };

  return (
    <div className={cn('relative', className)} ref={pickerRef}>
      <div className="flex items-center space-x-2">
        <div
          className="w-8 h-8 rounded border border-medium cursor-pointer"
          style={{ backgroundColor: hexValue }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="flex-1">
          {label && <span className="text-sm font-medium text-heading">{label}</span>}
          <input
            type="text"
            value={hexValue}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-secondary text-body"
            placeholder="#000000"
          />
        </div>
        {isEyeDropperSupported && (
          <button
            onClick={handleEyeDropper}
            className="p-2 rounded hover:bg-bg-tertiary transition-colors border border-medium"
            title="Pick color from screen (Eye Dropper)"
          >
            <svg className="w-4 h-4 text-body" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V4.5m0 0L8.25 12l7.5 7.5" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6" />
              <path d="M1 12h6m6 0h6" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-bg-secondary border border-medium rounded-lg shadow-lg z-50 min-w-[320px]">
          <div className="space-y-4">
            {/* Color Preview */}
            <div className="flex items-center space-x-3">
              <div
                className="w-16 h-16 rounded border border-medium"
                style={{ backgroundColor: hexValue }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-heading">Color Preview</div>
                <div className="text-xs text-body">{hexValue}</div>
              </div>
              {isEyeDropperSupported && (
                <button
                  onClick={handleEyeDropper}
                  className="p-2 rounded hover:bg-bg-tertiary transition-colors border border-medium bg-bg-main"
                  title="Pick color from screen (Eye Dropper)"
                >
                  <svg className="w-4 h-4 text-body" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V4.5m0 0L8.25 12l7.5 7.5" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                    <path d="M1 12h6m6 0h6" />
                  </svg>
                </button>
              )}
            </div>

            {/* RGB Inputs */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-heading">RGB</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-body">R</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValue.r}
                    onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                    className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-main text-body"
                  />
                </div>
                <div>
                  <label className="text-xs text-body">G</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValue.g}
                    onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                    className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-main text-body"
                  />
                </div>
                <div>
                  <label className="text-xs text-body">B</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbValue.b}
                    onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                    className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-main text-body"
                  />
                </div>
              </div>
            </div>

            {/* HSL Inputs */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-heading">HSL</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-body">H</label>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    value={hslValue.h}
                    onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
                    className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-main text-body"
                  />
                </div>
                <div>
                  <label className="text-xs text-body">S</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hslValue.s}
                    onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
                    className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-main text-body"
                  />
                </div>
                <div>
                  <label className="text-xs text-body">L</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hslValue.l}
                    onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
                    className="w-full text-sm border border-medium rounded px-2 py-1 bg-bg-main text-body"
                  />
                </div>
              </div>
            </div>

            {/* Eye Dropper Section */}
            {isEyeDropperSupported && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-heading">Eye Dropper</div>
                <Button
                  variant="outline"
                  onClick={handleEyeDropper}
                  className="w-full flex items-center justify-center space-x-2"
                  title="Click to pick color from anywhere on screen"
                >
                  <svg className="w-5 h-5 text-body" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V4.5m0 0L8.25 12l7.5 7.5" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                    <path d="M1 12h6m6 0h6" />
                  </svg>
                  <span className="text-sm text-body">Pick Color from Screen</span>
                </Button>
              </div>
            )}

            {/* Color Palettes */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-heading">Color Palettes</div>
              
              {/* Material Design */}
              <div>
                <div className="text-xs text-body mb-2">Material Design</div>
                <div className="grid grid-cols-10 gap-1">
                  {colorPalettes.material.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded border border-medium cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexChange(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Flat UI */}
              <div>
                <div className="text-xs text-body mb-2">Flat UI</div>
                <div className="grid grid-cols-10 gap-1">
                  {colorPalettes.flat.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded border border-medium cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexChange(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Professional Grays */}
              <div>
                <div className="text-xs text-body mb-2">Professional Grays</div>
                <div className="grid grid-cols-7 gap-1">
                  {colorPalettes.grays.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded border border-medium cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexChange(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Brand Colors */}
              <div>
                <div className="text-xs text-body mb-2">Brand Colors</div>
                <div className="grid grid-cols-10 gap-1">
                  {colorPalettes.brand.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded border border-medium cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexChange(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Pastel Colors */}
              <div>
                <div className="text-xs text-body mb-2">Pastel Colors</div>
                <div className="grid grid-cols-5 gap-1">
                  {colorPalettes.pastel.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded border border-medium cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexChange(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Web Safe Colors */}
              <div>
                <div className="text-xs text-body mb-2">Web Safe Colors</div>
                <div className="grid grid-cols-6 gap-1">
                  {colorPalettes.webSafe.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded border border-medium cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexChange(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 