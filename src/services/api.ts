import { ChildData, AnalysisResult, DashboardStats, RegionData } from '../types';

// Mock Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeChild = async (data: Partial<ChildData>): Promise<AnalysisResult> => {
  await delay(2000); // Simulate analysis time

  // Logic based on inputs for a bit of realism
  const weight = data.weight || 10;
  const height = data.height || 80;
  const bmi = weight / ((height / 100) * (height / 100));

  let riskScore = 50;
  if (bmi < 14) riskScore = 85;
  else if (bmi < 16) riskScore = 65;
  else if (bmi < 18) riskScore = 40;
  else if (bmi < 22) riskScore = 20;
  else riskScore = 75; // high for overweight too

  const riskLevel = riskScore > 75 ? 'High' : riskScore > 40 ? 'Medium' : 'Low';

  return {
    riskScore,
    riskLevel,
    predictions: [
      { month: 'Month 1', weight: weight + 0.2, height: height + 0.5 },
      { month: 'Month 2', weight: weight + 0.4, height: height + 1.1 },
      { month: 'Month 3', weight: weight + 0.7, height: height + 1.8 },
      { month: 'Month 4', weight: weight + 1.1, height: height + 2.5 },
      { month: 'Month 5', weight: weight + 1.6, height: height + 3.2 },
      { month: 'Month 6', weight: weight + 2.2, height: height + 4.0 },
    ],
    summary: `Based on the provided anthropometric data, the child indicates a ${riskLevel.toLowerCase()} nutritional risk. ${
      riskLevel === 'High' 
        ? "Action is needed immediately. Focus on macro-nutrient density and local therapeutic feeds." 
        : "Regular monitoring and balanced local diet are recommended."
    }`,
    recommendations: [
      {
        title: "Nutritional Supplementation",
        description: "Focus on Vitamin A and Iron-rich local foods like Spinach and Lentils.",
        category: 'Diet',
        actionItems: ['Morning leafy greens', 'Sprouted legumes twice weekly']
      },
      {
        title: "PMMVY Scheme (Gov)",
        description: "Enrol in the Pradhan Mantri Matru Vandana Yojana for health supporting incentives.",
        category: 'Scheme',
        source: 'Ministry of WCD',
        actionItems: ['Contact local ASHA worker', 'Gather bank passbook copy']
      }
    ]
  };
};

export const getDashboardData = async (): Promise<DashboardStats> => {
  await delay(1000);
  return {
    totalChildren: 1250,
    highRiskCount: 142,
    riskDistribution: [
      { name: 'Low Risk', value: 750 },
      { name: 'Medium Risk', value: 358 },
      { name: 'High Risk', value: 142 },
    ],
    growthTrends: [
      { date: '2024-01-01', avgRisk: 42 },
      { date: '2024-02-01', avgRisk: 40 },
      { date: '2024-03-01', avgRisk: 38 },
      { date: '2024-04-01', avgRisk: 44 },
      { date: '2024-05-01', avgRisk: 39 },
      { date: '2024-06-01', avgRisk: 35 },
    ],
    recentAnalyses: [
      { id: '1', name: 'Ayush Sharma', age: 3, gender: 'Male', weight: 12.5, height: 92, region: 'Nandurbar', analyzedAt: new Date().toISOString(), riskLevel: 'Low' },
      { id: '2', name: 'Riya Patil', age: 2, gender: 'Female', weight: 8.4, height: 81, region: 'Dharavi', analyzedAt: new Date().toISOString(), riskLevel: 'High' },
      { id: '3', name: 'Zaid Khan', age: 4, gender: 'Male', weight: 14.2, height: 101, region: 'Gadchiroli', analyzedAt: new Date().toISOString(), riskLevel: 'Medium' },
    ]
  };
};

export const getRegionStats = async (): Promise<RegionData[]> => {
  await delay(800);
  return [
    { id: 'reg1', name: 'Maharashtra (Nandurbar)', riskPercentage: 42, childCount: 450, coordinates: [21.3667, 74.2333] },
    { id: 'reg2', name: 'Odisha (Kalahandi)', riskPercentage: 58, childCount: 320, coordinates: [19.7820, 83.1818] },
    { id: 'reg3', name: 'Madhya Pradesh (Alirajpur)', riskPercentage: 61, childCount: 280, coordinates: [22.3044, 74.3541] },
    { id: 'reg4', name: 'Tamil Nadu (Dharmapuri)', riskPercentage: 18, childCount: 520, coordinates: [12.1273, 78.1565] },
  ];
};
