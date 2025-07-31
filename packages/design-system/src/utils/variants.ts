import { cn } from './cn';

export type VariantProps<T extends (...args: any) => any> = Parameters<T>[0];

export function createVariants<T extends Record<string, Record<string, string>>>(
  variants: T
) {
  return function useVariants(props: {
    [K in keyof T]?: keyof T[K];
  } & { className?: string }) {
    const { className, ...variantProps } = props;
    
    const variantClasses = Object.entries(variantProps)
      .map(([key, value]) => {
        if (value && variants[key]) {
          return variants[key][value as string];
        }
        return '';
      })
      .filter(Boolean)
      .join(' ');
    
    return cn(variantClasses, className);
  };
} 