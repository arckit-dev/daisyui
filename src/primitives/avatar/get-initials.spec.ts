import { describe, expect, it } from 'vitest';
import { getInitials } from './get-initials';

describe('getInitials', () => {
  it('should extract initials from two words', () => {
    expect(getInitials('Jean Dupont')).toBe('JD');
  });

  it('should extract single initial from one word', () => {
    expect(getInitials('Jean')).toBe('J');
  });

  it('should take at most two initials', () => {
    expect(getInitials('Jean Pierre Dupont')).toBe('JP');
  });

  it('should uppercase initials', () => {
    expect(getInitials('jean dupont')).toBe('JD');
  });

  it('should handle extra whitespace', () => {
    expect(getInitials('Jean   Dupont')).toBe('JD');
  });

  it('should return empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
