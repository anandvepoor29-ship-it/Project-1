export type UserRole = 'advertiser' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  company?: string;
  avatar?: string;
  isVerified: boolean;
  city: string;
  createdAt: string;
}

export type VehicleType = 'Car' | 'Bike' | 'Auto' | 'Bus' | 'Van';

export type AdSpace = 
  | 'Full vehicle wrapping'
  | 'Side-panel advertising'
  | 'Rear-window advertising'
  | 'Rooftop advertising';

export interface VehicleDocument {
  id: string;
  name: string;
  type: 'RC Book' | 'Insurance' | 'Driver License' | 'Fitness Certificate';
  fileUrl: string;
  status: 'verified' | 'pending' | 'rejected';
  uploadedAt: string;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  title: string;
  vehicleType: VehicleType;
  makeModel: string;
  year: number;
  regNumber: string;
  city: string;
  state: string;
  dailyAverageKm: number;
  monthlyImpressions: number;
  primaryRoutes: string[];
  allowedAdSpaces: AdSpace[];
  dailyRate: number; // in INR
  image: string;
  additionalImages?: string[];
  documents: VehicleDocument[];
  verificationStatus: 'verified' | 'pending' | 'rejected';
  isAvailable: boolean;
  rating: number;
  completedCampaignsCount: number;
  activeCampaignId?: string;
  createdAt: string;
}

export type CampaignStatus = 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Completed';

export interface Campaign {
  id: string;
  advertiserId: string;
  advertiserName: string;
  advertiserCompany: string;
  advertiserEmail: string;
  title: string;
  brandName: string;
  vehicleId: string;
  vehicleTitle: string;
  vehicleType: VehicleType;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  adSpace: AdSpace;
  adCreativeUrl: string;
  adCreativeName: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  dailyRate: number;
  totalCost: number;
  platformFee: number;
  ownerEarnings: number;
  status: CampaignStatus;
  ownerApprovalStatus: 'Pending' | 'Approved' | 'Rejected';
  adminApprovalStatus: 'Pending' | 'Approved' | 'Rejected';
  paymentStatus: 'Paid' | 'In Escrow' | 'Disbursed' | 'Refunded';
  notes?: string;
  rejectionReason?: string;
  targetCity: string;
  targetAudience: string;
  tracking: {
    verifiedKm: number;
    targetKm: number;
    lastUpdated: string;
    inspectionsCount: number;
    gpsActive: boolean;
  };
  createdAt: string;
}

export interface PayoutRecord {
  id: string;
  ownerId: string;
  ownerName: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Pending Escrow';
  paymentMethod: string;
  accountOrUpi: string;
  transactionRef: string;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  subject: string;
  message: string;
  relatedCampaignId?: string;
  status: 'Open' | 'Under Investigation' | 'Resolved';
  resolutionNotes?: string;
  createdAt: string;
}

export interface PlatformStat {
  totalUsers: number;
  totalAdvertisers: number;
  totalVehicleOwners: number;
  totalVehicles: number;
  activeCampaigns: number;
  totalRevenue: number;
  totalOwnerPayouts: number;
  totalImpressions: number;
}
