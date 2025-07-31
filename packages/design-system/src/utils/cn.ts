import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine class names with proper Tailwind CSS merging
 * This ensures that conflicting classes are properly resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 