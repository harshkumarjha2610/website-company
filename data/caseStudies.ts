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
    industry: 'FinTech',
    projectName: 'Global Payment Gateway AI Optimization',
    challenge: 'High transaction failure rates and increasing fraud incidents due to legacy rule-based detection systems.',
    solution: 'Implemented a real-time AI fraud detection system using deep learning and continuous behavioral modeling.',
    technologies: ['Python', 'TensorFlow', 'AWS SageMaker', 'Redis', 'Kafka'],
    keyOutcomes: [
      'Significantly reduced false positives',
      'Automated 95% of manual review workflows',
      'Improved transaction approval latency'
    ],
    metrics: {
      revenueGrowth: { label: 'Revenue Retained', value: '14.2', prefix: '$', suffix: 'M' },
      costReduction: { label: 'Fraud Losses', value: '87', suffix: '%' },
      efficiencyImprovement: { label: 'Processing Speed', value: '300', suffix: '%' },
    }
  },
  {
    id: 'cs-2',
    industry: 'Healthcare',
    projectName: 'Predictive Patient Analytics Platform',
    challenge: 'Inefficient resource allocation in hospitals leading to overcrowded ERs and prolonged patient wait times.',
    solution: 'Developed a predictive analytics engine that forecasts patient inflow and optimizes staff scheduling dynamically.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'GCP', 'Scikit-learn'],
    keyOutcomes: [
      'Optimized emergency room staff allocation',
      'Decreased average patient wait times',
      'Integrated seamlessly with legacy EHRs'
    ],
    metrics: {
      efficiencyImprovement: { label: 'Wait Time Reduction', value: '45', suffix: '%' },
      costReduction: { label: 'Overtime Costs', value: '2.1', prefix: '$', suffix: 'M' },
      userGrowth: { label: 'Hospitals Onboarded', value: '120', suffix: '+' },
    }
  },
  {
    id: 'cs-3',
    industry: 'E-Commerce',
    projectName: 'Conversational AI Shopping Assistant',
    challenge: 'Low conversion rates and high customer service overhead during peak holiday shopping seasons.',
    solution: 'Deployed an LLM-powered virtual assistant with RAG integration for highly personalized product recommendations.',
    technologies: ['React', 'TypeScript', 'LangChain', 'OpenAI', 'Pinecone'],
    keyOutcomes: [
      'Delivered 24/7 intelligent customer support',
      'Increased average order value (AOV) significantly',
      'Deflected routine queries from human agents'
    ],
    metrics: {
      revenueGrowth: { label: 'Sales Increase', value: '28', suffix: '%' },
      efficiencyImprovement: { label: 'Support Deflection', value: '65', suffix: '%' },
      userGrowth: { label: 'Engagement Rate', value: '3.5', suffix: 'x' },
    }
  }
];
