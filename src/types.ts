export interface ChapterSection {
  id: string;
  title: string;
  problemStatement: string;
  whyPreviousFailed: string;
  historicalBackground?: string;
  coreIdea: string;
  internalImplementation: string;
  asciiDiagram?: string;
  mermaidDiagram?: string;
  sequenceDiagram?: string;
  memoryLayout?: string;
  databaseSchema?: string;
  complexityAnalysis: {
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
  };
  tradeoffs: string[];
  performanceImplications: string;
  scalingConsiderations: string;
  failureModes: string[];
  productionReality: {
    googleHow: string;
    uberHow: string;
    netflixHow: string;
    stripeHow: string;
    amazonHow: string;
    aiStartupsHow: string;
    smallStartupHow: string;
    soloDevHow: string;
    tradeoffsComparison: string;
  };
  productionCode: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
  commonMistakes: string[];
  antiPatterns: string[];
  bestPractices: string[];
  interviewExpectations: {
    typicalQuestion: string;
    expectedAnswerKeyPoints: string[];
    followUpQuestions: string[];
  };
  exercises: {
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Staff';
    starterCode?: string;
    solutionHint?: string;
  }[];
  furtherReading?: {
    type: 'Doc' | 'Blog' | 'Paper' | 'Book' | 'Talk' | 'Repo';
    title: string;
    link?: string;
    description: string;
  }[];
}

export interface VolumeChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  learningObjectives: string[];
  sections: ChapterSection[];
}

export interface Volume {
  id: string;
  volumeNumber: number;
  title: string;
  description: string;
  iconName: string;
  chapters: VolumeChapter[];
}

export interface ProductionProject {
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
  targetScale: string;
  techStack: string[];
  requirements: {
    functional: string[];
    nonFunctional: string[];
  };
  architectureDiagramAscii: string;
  architectureDiagramMermaid: string;
  databaseSchema: string;
  apiDesign: {
    endpoint: string;
    method: string;
    description: string;
    requestBody?: string;
    responseBody?: string;
  }[];
  coreCodeImplementation: {
    filename: string;
    language: string;
    code: string;
  };
  scalingStrategy: string;
  failureModesAndRecovery: string[];
  monitoringAndAlerting: string[];
  testingStrategy: string;
}

export interface CompanyInterviewQuestion {
  id: string;
  company: 'Google' | 'Microsoft' | 'Amazon' | 'Stripe' | 'Uber' | 'Databricks' | 'Atlassian' | 'Netflix' | 'Rubrik' | 'OpenAI';
  title: string;
  category: string;
  difficulty: 'Medium' | 'Hard' | 'Staff';
  problemStatement: string;
  firstPrinciplesAnswer: string;
  internalArchitectureExplanation: string;
  codeSnippet?: string;
  followUpQuestions: string[];
  interviewerRatingCriteria: {
    juniorPass: string;
    seniorPass: string;
    staffPass: string;
  };
}

export interface RoadmapWeek {
  weekNumber: number;
  volumeReference: string;
  title: string;
  theme: string;
  dailyGoals: {
    day: number;
    title: string;
    task: string;
  }[];
  milestoneProject: string;
  recommendedResources: {
    title: string;
    type: 'Paper' | 'Book' | 'Blog' | 'RFC' | 'Video' | 'Doc';
    authorOrSource: string;
  }[];
}

export interface ProductionMatrixItem {
  topic: string;
  category: string;
  problem: string;
  googleApproach: string;
  uberApproach: string;
  netflixApproach: string;
  stripeApproach: string;
  startupApproach: string;
  keyTradeoff: string;
}

export interface AIQueryRequest {
  prompt: string;
  mode: 'explain' | 'high_thinking' | 'system_design' | 'code_review' | 'mock_interview';
  context?: string;
}

export interface AIQueryResponse {
  answer: string;
  thinkingProcess?: string;
  groundingSources?: { title: string; uri: string }[];
}
