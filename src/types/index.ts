export type UserRole = 'admin' | 'landlord' | 'tenant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface House {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  landlordId: string;
  landlordName: string;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  type: 'apartment' | 'house' | 'villa' | 'studio';
}

export interface Reservation {
  id: string;
  houseId: string;
  houseName: string;
  houseCity: string;
  houseImage: string;
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  landlordId: string;
  landlordName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nightCount: number;
  pricePerNight: number;
  totalPrice: number;
  serviceFee: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: string;
  createdAt: string;
  tenantName: string;
  houseName: string;
  landlordName: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole | 'admin';
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'support' | 'landlord-tenant';
  avatar?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'title_deed' | 'insurance' | 'identity' | 'tax' | 'other';
  uri: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  fileSize?: string;
}

// Navigation param types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AdminTabParamList = {
  AdminDashboard: undefined;
  RentedHouses: undefined;
  Payments: undefined;
  AdminChat: undefined;
  AdminProfile: undefined;
};

export type LandlordTabParamList = {
  LandlordDashboard: undefined;
  MyListings: undefined;
  LandlordDocuments: undefined;
  RentalHistory: undefined;
  LandlordChat: undefined;
  LandlordProfile: undefined;
};

export type TenantHomeStackParamList = {
  Home: undefined;
  HouseDetail: { houseId: string };
  Booking: { houseId: string };
};

export type TenantTabParamList = {
  TenantHome: undefined;
  MyReservations: undefined;
  TenantChat: undefined;
  TenantProfile: undefined;
};

export type LegalStackParamList = {
  CompanyInfo: undefined;
  UserAgreement: undefined;
  LandlordAgreement: undefined;
  PrivacyPolicy: undefined;
  DisclosureText: undefined;
  ReservationTerms: undefined;
  CancellationPolicy: undefined;
};
