import { describe, expect, it } from 'vitest';
import { paginate } from './paginate';

describe('paginate', () => {
  it('should return single page for empty items', () => {
    const result = paginate({ itemsCount: 0, pageSize: 10 });
    expect(result.pages).toEqual([{ number: 1, isCurrent: true }]);
    expect(result.lastPage).toBe(1);
  });

  it('should return single page when items fit in one page', () => {
    const result = paginate({ itemsCount: 5, pageSize: 10 });
    expect(result.pages).toEqual([{ number: 1, isCurrent: true }]);
    expect(result.lastPage).toBe(1);
  });

  it('should calculate correct number of pages', () => {
    const result = paginate({ itemsCount: 25, pageSize: 10 });
    expect(result.lastPage).toBe(3);
  });

  it('should mark current page', () => {
    const result = paginate({ itemsCount: 50, pageSize: 10, currentPage: 3 });
    const currentPages = result.pages.filter((p) => 'isCurrent' in p && p.isCurrent);
    expect(currentPages).toHaveLength(1);
    expect(currentPages[0]).toMatchObject({ number: 3, isCurrent: true });
  });

  it('should calculate previous and next page', () => {
    const result = paginate({ itemsCount: 50, pageSize: 10, currentPage: 3 });
    expect(result.previousPage).toBe(2);
    expect(result.nextPage).toBe(4);
  });

  it('should clamp previous page to 1', () => {
    const result = paginate({ itemsCount: 50, pageSize: 10, currentPage: 1 });
    expect(result.previousPage).toBe(1);
  });

  it('should clamp next page to last page', () => {
    const result = paginate({ itemsCount: 50, pageSize: 10, currentPage: 5 });
    expect(result.nextPage).toBe(5);
  });

  it('should add spacers for large page counts', () => {
    const result = paginate({ itemsCount: 200, pageSize: 10, currentPage: 10, boundaryCount: 1 });
    const spacers = result.pages.filter((p) => 'spacer' in p);
    expect(spacers.length).toBeGreaterThan(0);
  });

  it('should not add spacers when all pages fit', () => {
    const result = paginate({ itemsCount: 30, pageSize: 10 });
    const spacers = result.pages.filter((p) => 'spacer' in p);
    expect(spacers).toHaveLength(0);
  });

  it('should handle negative items count', () => {
    const result = paginate({ itemsCount: -1, pageSize: 10 });
    expect(result.lastPage).toBe(1);
  });
});
