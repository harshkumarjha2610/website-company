export interface Metric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  projectName: string;
  challenge: string;
  solution: string;
  technologies: string[];
  keyOutcomes: string[];
  metrics: {
    revenueGrowth?: Metric;
    costReduction?: Metric;
    efficiencyImprovement?: Metric;
    userGrowth?: Metric;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    industry: 'EdTech & AI',
    projectName: 'Gurushala AI-Powered Question Generator',
    challenge: 'Educators faced heavy workloads tagging, categorizing, and generating questions from voluminous digital documents manually.',
    solution: 'Designed an automated AI workflow processing documents and videos using NLP and OCR, automatically generating taxonomy-aligned questions via advanced LLMs.',
    technologies: ['Next.js', 'Python', 'Tesseract OCR', 'LangChain', 'OpenAI GPT-4'],
    keyOutcomes: [
      'Reduced question creation cycle times by 10x',
      'Consistent alignment with complex educational taxonomies',
      'Lowered manual reviews and workloads for teaching squads'
    ],
    metrics: {
      efficiencyImprovement: { label: 'Creation Cycles', value: '10', suffix: 'x' },
      costReduction: { label: 'Manual Workload', value: '85', suffix: '%' },
      userGrowth: { label: 'Active Educators', value: '25', suffix: 'k+' },
    }
  },
  {
    id: 'cs-2',
    industry: 'Logistics & FoodTech',
    projectName: 'Americana Restaurant Logistics Intelligence Platform',
    challenge: 'Fragmented delivery operations across 2,100+ restaurants in 12 countries, causing driver dispatch delays and reporting lag.',
    solution: 'Unified operations into a real-time intelligence data system with automated order assignment, smart routing, and geofencing.',
    technologies: ['React', 'Go', 'AWS Cloud', 'Docker', 'Redis', 'Apache Kafka'],
    keyOutcomes: [
      'Auto-order assignment increased from 42% to 82%',
      'Geofencing compliance improved from 20% to 80%',
      'Report load times reduced by 90% (hours to seconds)'
    ],
    metrics: {
      efficiencyImprovement: { label: 'Auto Assignment', value: '82', suffix: '%' },
      userGrowth: { label: 'Orders Processed', value: '60.4', suffix: 'M' },
      costReduction: { label: 'Report Latency', value: '90', suffix: '%' },
    }
  },
  {
    id: 'cs-3',
    industry: 'TravelTech & Agents',
    projectName: 'Tootle Intelligent Travel Assistant',
    challenge: 'High friction searching, comparing, and booking travel recommendations across fragmented search directories.',
    solution: 'Developed a voice and text AI agent pulling live data from multiple global flight and hotel APIs, summarizing results instantly.',
    technologies: ['React', 'Python', 'LlamaIndex', 'Pinecone Vector DB', 'WebSockets'],
    keyOutcomes: [
      'Seamless multi-channel voice and text conversational booking',
      '10x faster access to personalized travel insights',
      'Integrated with legacy airline booking engines'
    ],
    metrics: {
      userGrowth: { label: 'User Engagement', value: '35', suffix: '%' },
      efficiencyImprovement: { label: 'Insight Access', value: '10', suffix: 'x' },
      revenueGrowth: { label: 'Booking Conversion', value: '28', suffix: '%' },
    }
  }
];
