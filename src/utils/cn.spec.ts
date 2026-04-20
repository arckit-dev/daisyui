import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('should deduplicate tailwind classes', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('should return empty string for no inputs', () => {
    expect(cn()).toBe('');
  });
});
