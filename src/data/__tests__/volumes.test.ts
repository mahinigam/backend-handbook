import { describe, expect, it } from 'vitest';
import { searchHandbook } from '../volumes';

describe('searchHandbook', () => {
  it('finds known sections when the query has surrounding whitespace', () => {
    const plain = searchHandbook('Descriptors');
    const padded = searchHandbook('  Descriptors  ');

    expect(plain.length).toBeGreaterThan(0);
    expect(padded).toEqual(plain);
  });

  it('returns no results for an empty or whitespace-only query', () => {
    expect(searchHandbook('')).toEqual([]);
    expect(searchHandbook('   ')).toEqual([]);
  });
});
