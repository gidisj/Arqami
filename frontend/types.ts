export enum Operator {
  OMANTEL = 'Omantel',
  OOREDOO = 'Ooredoo',
  VODAFONE = 'Vodafone',
  REDBULL = 'Red Bull Mobile'
}

export enum SimStatus {
  ACTIVE = 'Active',
  SUSPENDED = 'Suspended',
  PENDING = 'Pending'
}

export enum SimType {
  PREPAID = 'Prepaid',
  POSTPAID = 'Postpaid',
  ESIM = 'eSIM',
  IOT = 'IoT'
}

export interface SimData {
  id: string;
  operator: Operator;
  number: string;
  type: SimType;
  registrationDate: string;
  imei: string;
  status: SimStatus;
  lastActive?: string;
}

export interface UserProfile {
  civilId: string;
  fullNameEn: string;
  fullNameAr: string;
  nationality: string;
  trustLevel: string;
}

export interface DisputeRecord {
  id: string;
  simId: string;
  timestamp: string;
  status: 'Resolved' | 'Pending Investigation';
  certificateUrl?: string;
}

export interface HistoryEvent {
  id: string;
  date: string;
  action: string;
  details: string;
  status: 'Success' | 'Warning' | 'Danger';
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }
  var process: {
    env: NodeJS.ProcessEnv;
  };
}
