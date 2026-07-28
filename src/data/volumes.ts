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

export type HandbookSearchResult =
  | {
      type: 'chapter';
      label: string;
      title: string;
      description: string;
      matchType: string;
      volume: Volume;
      chapter: Volume['chapters'][number];
      section: Volume['chapters'][number]['sections'][number];
    }
  | {
      type: 'project' | 'interview' | 'roadmap' | 'matrix';
      label: string;
      title: string;
      description: string;
      matchType: string;
      tab: 'projects' | 'interviews' | 'roadmap' | 'matrix';
    };

function matchesQuery(query: string, values: Array<string | undefined>) {
  return values.some((value) => value?.toLowerCase().includes(query));
}

export function searchHandbook(query: string) {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase();
  const results: HandbookSearchResult[] = [];

  for (const vol of ALL_VOLUMES) {
    for (const ch of vol.chapters) {
      for (const sec of ch.sections) {
        if (matchesQuery(q, [sec.title, sec.problemStatement, sec.coreIdea, sec.internalImplementation])) {
          results.push({
            type: 'chapter',
            label: `Volume ${vol.volumeNumber} • Chapter ${ch.chapterNumber}`,
            title: sec.title,
            description: sec.problemStatement,
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

export async function searchFullHandbook(query: string) {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase();
  const results = searchHandbook(query);
  const [
    { volume7Projects },
    { volume8Interviews },
    { volume9Roadmap },
    { productionMatrixData }
  ] = await Promise.all([
    import('./volume7_projects'),
    import('./volume8_interviews'),
    import('./volume9_roadmap'),
    import('./production_matrix')
  ]);

  for (const project of volume7Projects) {
    if (
      matchesQuery(q, [
        project.title,
        project.category,
        project.description,
        project.targetScale,
        project.scalingStrategy,
        project.testingStrategy,
        ...project.techStack,
        ...project.requirements.functional,
        ...project.requirements.nonFunctional,
        ...project.failureModesAndRecovery,
        ...project.monitoringAndAlerting
      ])
    ) {
      results.push({
        type: 'project',
        label: `Volume 7 • Project ${project.number}`,
        title: project.title,
        description: project.description,
        matchType: project.title.toLowerCase().includes(q) ? 'Title Match' : 'Project Match',
        tab: 'projects'
      });
    }
  }

  for (const question of volume8Interviews) {
    if (
      matchesQuery(q, [
        question.company,
        question.title,
        question.category,
        question.problemStatement,
        question.firstPrinciplesAnswer,
        question.internalArchitectureExplanation,
        ...question.followUpQuestions
      ])
    ) {
      results.push({
        type: 'interview',
        label: `Volume 8 • ${question.company}`,
        title: question.title,
        description: question.problemStatement,
        matchType: question.title.toLowerCase().includes(q) ? 'Title Match' : 'Interview Match',
        tab: 'interviews'
      });
    }
  }

  for (const week of volume9Roadmap) {
    if (
      matchesQuery(q, [
        week.title,
        week.theme,
        week.volumeReference,
        week.milestoneProject,
        ...week.dailyGoals.flatMap((goal) => [goal.title, goal.task]),
        ...week.recommendedResources.flatMap((resource) => [
          resource.title,
          resource.type,
          resource.authorOrSource
        ])
      ])
    ) {
      results.push({
        type: 'roadmap',
        label: `Volume 9 • Week ${week.weekNumber}`,
        title: week.title,
        description: week.theme,
        matchType: week.title.toLowerCase().includes(q) ? 'Title Match' : 'Roadmap Match',
        tab: 'roadmap'
      });
    }
  }

  for (const item of productionMatrixData) {
    if (
      matchesQuery(q, [
        item.topic,
        item.category,
        item.problem,
        item.googleApproach,
        item.uberApproach,
        item.netflixApproach,
        item.stripeApproach,
        item.startupApproach,
        item.keyTradeoff
      ])
    ) {
      results.push({
        type: 'matrix',
        label: `Production Matrix • ${item.category}`,
        title: item.topic,
        description: item.problem,
        matchType: item.topic.toLowerCase().includes(q) ? 'Title Match' : 'Matrix Match',
        tab: 'matrix'
      });
    }
  }

  return results;
}
