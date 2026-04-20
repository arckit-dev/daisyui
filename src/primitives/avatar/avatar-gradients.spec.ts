import { describe, expect, it } from 'vitest';
import { avatarGradients, getAvatarGradient } from './avatar-gradients';

describe('getAvatarGradient', () => {
  it('should return a gradient from the list', () => {
    const gradient = getAvatarGradient('Jean Dupont');
    expect(avatarGradients).toContain(gradient);
  });

  it('should return the same gradient for the same text', () => {
    expect(getAvatarGradient('Alice')).toBe(getAvatarGradient('Alice'));
  });

  it('should return different gradients for different text', () => {
    expect(getAvatarGradient('Alice')).not.toBe(getAvatarGradient('Bob'));
  });

  it('should handle empty string', () => {
    const gradient = getAvatarGradient('');
    expect(avatarGradients).toContain(gradient);
  });
});
