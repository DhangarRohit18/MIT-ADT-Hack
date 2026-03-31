export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Health Worker' | 'Admin';
}

export interface ChildData {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  weight: number;
  height: number;
  imageUrl?: string;
  region: string;
  analyzedAt: string;
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  predictions: { month: string; weight: number; height: number }[];
  summary: string;
  recommendations: Recommendation[];
}

export interface Recommendation {
  title: string;
  description: string;
  source?: string;
  category: 'Diet' | 'Medical' | 'Scheme';
  actionItems: string[];
}

export interface DashboardStats {
  totalChildren: number;
  highRiskCount: number;
  riskDistribution: { name: string; value: number }[];
  growthTrends: { date: string; avgRisk: number }[];
  recentAnalyses: (ChildData & { riskLevel: RiskLevel })[];
}

export interface RegionData {
  id: string;
  name: string;
  riskPercentage: number;
  childCount: number;
  coordinates: [number, number];
}
