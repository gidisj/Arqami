import { Operator, SimStatus, SimType, SimData, UserProfile, HistoryEvent } from './types.ts';

export const MOCK_USER: UserProfile = {
  civilId: '1092837465',
  fullNameEn: 'Ahmed Al-Busaidi',
  fullNameAr: 'أحمد البوسعيدي',
  nationality: 'Omani',
  trustLevel: 'Level 3 (Biometric Verified)'
};

export const MOCK_SIMS: SimData[] = [
  {
    id: 'sim-001',
    operator: Operator.OMANTEL,
    number: '+968 9123 4567',
    type: SimType.POSTPAID,
    registrationDate: '2021-05-12',
    imei: '358912048571923',
    status: SimStatus.ACTIVE,
    lastActive: '2 mins ago'
  },
  {
    id: 'sim-002',
    operator: Operator.OOREDOO,
    number: '+968 9876 5432',
    type: SimType.PREPAID,
    registrationDate: '2023-11-05',
    imei: '864912048571999',
    status: SimStatus.ACTIVE,
    lastActive: '1 hour ago'
  },
  {
    id: 'sim-003',
    operator: Operator.VODAFONE,
    number: '+968 7111 2222',
    type: SimType.ESIM,
    registrationDate: '2024-01-20',
    imei: '990012048571111',
    status: SimStatus.ACTIVE,
    lastActive: 'Just now'
  },
  {
    id: 'sim-004',
    operator: Operator.OMANTEL,
    number: '+968 9999 8888',
    type: SimType.IOT,
    registrationDate: '2022-08-15',
    imei: '358912048570000',
    status: SimStatus.SUSPENDED,
    lastActive: '3 months ago'
  }
];

export const MOCK_HISTORY: HistoryEvent[] = [
  { 
    id: 'h1', 
    date: '2024-05-12 10:30 AM', 
    action: 'SIM Issuance Authorized', 
    details: 'Omantel - Muscat City Center', 
    status: 'Success' 
  },
  { 
    id: 'h2', 
    date: '2024-04-20 02:15 PM', 
    action: 'Dispute Filed & SIM Suspended', 
    details: 'Omantel - +968 9999 8888', 
    status: 'Danger' 
  },
  { 
    id: 'h3', 
    date: '2024-01-15 09:00 AM', 
    action: 'System Login', 
    details: 'Biometric Authentication (FIDO2)', 
    status: 'Success' 
  }
];
