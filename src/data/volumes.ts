import { Volume } from '../types';
import { volume1Python } from './volume1_python';
import { volume2Architecture } from './volume2_architecture';
import { volume3FastAPI } from './volume3_fastapi';
import { volume4Databases } from './volume4_databases';
import { volume5DevOps } from './volume5_devops';
import { volume6Distributed } from './volume6_distributed';

export const ALL_VOLUMES: Volume[] = [
  volume1Python,
  volume2Architecture,
  volume3FastAPI,
  volume4Databases,
  volume5DevOps,
  volume6Distributed
];

export function getVolumeById(id: string): Volume | undefined {
  return ALL_VOLUMES.find(v => v.id === id);
}

export function searchHandbook(query: string) {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase();
  const results: { volume: Volume; chapter: any; section: any; matchType: string }[] = [];

  for (const vol of ALL_VOLUMES) {
    for (const ch of vol.chapters) {
      for (const sec of ch.sections) {
        if (
          sec.title.toLowerCase().includes(q) ||
          sec.problemStatement.toLowerCase().includes(q) ||
          sec.coreIdea.toLowerCase().includes(q) ||
          sec.internalImplementation.toLowerCase().includes(q)
        ) {
          results.push({
            volume: vol,
            chapter: ch,
            section: sec,
            matchType: sec.title.toLowerCase().includes(q) ? 'Title Match' : 'Content Match'
          });
        }
      }
    }
  }

  return results;
}
