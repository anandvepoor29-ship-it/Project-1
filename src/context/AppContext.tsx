import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Vehicle, Campaign, PayoutRecord, Complaint, UserRole, CampaignStatus } from '../types';
import { INITIAL_USERS, INITIAL_VEHICLES, INITIAL_CAMPAIGNS, INITIAL_PAYOUTS, INITIAL_COMPLAINTS } from '../data/mockData';

interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  vehicles: Vehicle[];
  campaigns: Campaign[];
  payouts: PayoutRecord[];
  complaints: Complaint[];
  activePage: string;
  selectedVehicleForBooking: Vehicle | null;
  notification: NotificationState | null;
  setActivePage: (page: string) => void;
  setSelectedVehicleForBooking: (vehicle: Vehicle | null) => void;
  loginAs: (role: UserRole) => void;
  loginWithCredentials: (email: string, role: UserRole, name?: string) => boolean;
  registerUser: (data: { name: string; email: string; role: UserRole; phone: string; company?: string; city: string }) => User;
  logout: () => void;
  addVehicle: (vehicleData: Partial<Vehicle>) => Vehicle;
  verifyVehicle: (vehicleId: string, status: 'verified' | 'rejected') => void;
  createBooking: (campaignData: Partial<Campaign>) => Campaign;
  ownerActionCampaign: (campaignId: string, action: 'approve' | 'reject', reason?: string) => void;
  adminActionCampaign: (campaignId: string, action: 'approve' | 'reject' | 'activate' | 'complete', reason?: string) => void;
  requestPayout: (amount: number, method: string, accountOrUpi: string) => void;
  addComplaint: (subject: string, message: string, campaignId?: string) => void;
  resolveComplaint: (complaintId: string, notes: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  resetToDefaultData: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  isRoleModalOpen: boolean;
  openRoleModal: () => void;
  closeRoleModal: () => void;
  selectVisitingRole: (role: UserRole, targetDashboard?: boolean, remember?: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initialize with mock data
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('aow_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aow_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to Advertiser Rohit Sharma
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('aow_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('aow_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [payouts, setPayouts] = useState<PayoutRecord[]>(() => {
    const saved = localStorage.getItem('aow_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('aow_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<Vehicle | null>(null);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  // Theme state: defaults to dark for premium automotive dark navy theme
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('aow_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('aow_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
  };

  // Role prompt modal state: opens on first visit or whenever user clicks "Select Role"
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(() => {
    const roleChosen = localStorage.getItem('cb_aow_role_selected');
    return !roleChosen;
  });

  const openRoleModal = () => setIsRoleModalOpen(true);
  const closeRoleModal = () => setIsRoleModalOpen(false);

  const selectVisitingRole = (role: UserRole, targetDashboard: boolean = false, remember: boolean = true) => {
    const user = users.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      if (remember) {
        localStorage.setItem('cb_aow_role_selected', role);
      }
      const roleLabel = role === 'advertiser' ? 'Brand Advertiser' : role === 'owner' ? 'Vehicle Owner' : 'Super Admin';
      showNotification(`Visiting ChhotaBheem - AdOnWheel as ${roleLabel}!`, 'info');
      if (targetDashboard) {
        if (role === 'advertiser') setActivePage('advertiser-dashboard');
        else if (role === 'owner') setActivePage('owner-dashboard');
        else if (role === 'admin') setActivePage('admin-dashboard');
      }
    }
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('aow_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aow_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aow_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aow_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('aow_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('aow_payouts', JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem('aow_complaints', JSON.stringify(complaints));
  }, [complaints]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification(prev => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const loginAs = (role: UserRole) => {
    const user = users.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      showNotification(`Logged in as ${user.name} (${role.toUpperCase()})`, 'success');
      if (role === 'advertiser') setActivePage('advertiser-dashboard');
      else if (role === 'owner') setActivePage('owner-dashboard');
      else if (role === 'admin') setActivePage('admin-dashboard');
    }
  };

  const loginWithCredentials = (email: string, role: UserRole, name?: string): boolean => {
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        role,
        phone: '+91 98000 00000',
        city: 'Bangalore',
        isVerified: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [user!, ...prev]);
    }
    setCurrentUser(user);
    showNotification(`Welcome back, ${user.name}!`, 'success');
    if (user.role === 'advertiser') setActivePage('advertiser-dashboard');
    else if (user.role === 'owner') setActivePage('owner-dashboard');
    else setActivePage('admin-dashboard');
    return true;
  };

  const registerUser = (data: { name: string; email: string; role: UserRole; phone: string; company?: string; city: string }): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      company: data.company,
      city: data.city || 'Bangalore',
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    showNotification(`Account created successfully as ${data.role.toUpperCase()}!`, 'success');
    if (data.role === 'advertiser') setActivePage('advertiser-dashboard');
    else if (data.role === 'owner') setActivePage('owner-dashboard');
    else setActivePage('admin-dashboard');
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setActivePage('home');
    showNotification('Logged out successfully', 'info');
  };

  const addVehicle = (vehicleData: Partial<Vehicle>): Vehicle => {
    const newVehicle: Vehicle = {
      id: `veh-${Date.now().toString().slice(-4)}`,
      ownerId: currentUser?.id || 'user-own-1',
      ownerName: currentUser?.name || 'Suresh Kumar',
      ownerPhone: currentUser?.phone || '+91 98220 11223',
      ownerEmail: currentUser?.email || 'owner@adonwheel.com',
      title: vehicleData.title || `${vehicleData.makeModel} - Commuter Fleet`,
      vehicleType: vehicleData.vehicleType || 'Car',
      makeModel: vehicleData.makeModel || 'Model Specification',
      year: vehicleData.year || 2024,
      regNumber: vehicleData.regNumber || 'KA-01-XX-0000',
      city: vehicleData.city || 'Bangalore',
      state: vehicleData.state || 'Karnataka',
      dailyAverageKm: vehicleData.dailyAverageKm || 70,
      monthlyImpressions: vehicleData.monthlyImpressions || 250000,
      primaryRoutes: vehicleData.primaryRoutes && vehicleData.primaryRoutes.length > 0
        ? vehicleData.primaryRoutes
        : ['City Center', 'Tech Parks', 'Ring Road'],
      allowedAdSpaces: vehicleData.allowedAdSpaces && vehicleData.allowedAdSpaces.length > 0
        ? vehicleData.allowedAdSpaces
        : ['Side-panel advertising', 'Rear-window advertising'],
      dailyRate: vehicleData.dailyRate || 350,
      image: vehicleData.image || '/src/assets/images/vehicle_car_wrap_1793896530738.jpg',
      verificationStatus: 'verified', // Instant approval for live demonstration
      isAvailable: true,
      rating: 5.0,
      completedCampaignsCount: 0,
      documents: vehicleData.documents || [
        {
          id: `doc-${Date.now()}`,
          name: `${vehicleData.regNumber || 'Vehicle'}_RC.pdf`,
          type: 'RC Book',
          fileUrl: '#',
          status: 'verified',
          uploadedAt: new Date().toISOString().split('T')[0]
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setVehicles(prev => [newVehicle, ...prev]);
    showNotification(`Vehicle "${newVehicle.title}" listed successfully!`, 'success');
    return newVehicle;
  };

  const verifyVehicle = (vehicleId: string, status: 'verified' | 'rejected') => {
    setVehicles(prev => prev.map(v => (v.id === vehicleId ? { ...v, verificationStatus: status } : v)));
    showNotification(`Vehicle status updated to: ${status.toUpperCase()}`, status === 'verified' ? 'success' : 'info');
  };

  const createBooking = (campaignData: Partial<Campaign>): Campaign => {
    const duration = campaignData.durationDays || 30;
    const dailyRate = campaignData.dailyRate || 400;
    const totalCost = dailyRate * duration;
    const platformFee = Math.round(totalCost * 0.1);
    const ownerEarnings = totalCost - platformFee;

    const newCampaign: Campaign = {
      id: `camp-${Date.now().toString().slice(-4)}`,
      advertiserId: currentUser?.id || 'user-adv-1',
      advertiserName: currentUser?.name || 'Rohit Sharma',
      advertiserCompany: currentUser?.company || 'Brand Partner',
      advertiserEmail: currentUser?.email || 'advertiser@adonwheel.com',
      title: campaignData.title || `${campaignData.brandName || 'Brand'} Ad Campaign`,
      brandName: campaignData.brandName || 'Acme Brand',
      vehicleId: campaignData.vehicleId || 'veh-001',
      vehicleTitle: campaignData.vehicleTitle || 'Selected Vehicle',
      vehicleType: campaignData.vehicleType || 'Car',
      ownerId: campaignData.ownerId || 'user-own-1',
      ownerName: campaignData.ownerName || 'Vehicle Partner',
      ownerPhone: campaignData.ownerPhone || '+91 98220 11223',
      adSpace: campaignData.adSpace || 'Side-panel advertising',
      adCreativeUrl: campaignData.adCreativeUrl || '/src/assets/images/vehicle_car_wrap_1793896530738.jpg',
      adCreativeName: campaignData.adCreativeName || 'ad_banner_final.png',
      startDate: campaignData.startDate || new Date().toISOString().split('T')[0],
      endDate: campaignData.endDate || new Date(Date.now() + duration * 86400000).toISOString().split('T')[0],
      durationDays: duration,
      dailyRate: dailyRate,
      totalCost: totalCost,
      platformFee: platformFee,
      ownerEarnings: ownerEarnings,
      status: 'Pending',
      ownerApprovalStatus: 'Pending',
      adminApprovalStatus: 'Pending',
      paymentStatus: 'Paid', // Held in platform escrow
      targetCity: campaignData.targetCity || 'Bangalore',
      targetAudience: campaignData.targetAudience || 'Metro Commuters & Urban Shoppers',
      tracking: {
        verifiedKm: 0,
        targetKm: duration * 60,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        inspectionsCount: 0,
        gpsActive: false
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    showNotification(`Booking submitted! Awaiting Vehicle Owner and Admin approvals.`, 'success');
    return newCampaign;
  };

  const ownerActionCampaign = (campaignId: string, action: 'approve' | 'reject', reason?: string) => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id === campaignId) {
          const newOwnerStatus = action === 'approve' ? 'Approved' : 'Rejected';
          const newStatus: CampaignStatus = action === 'approve' ? 'Approved' : 'Rejected';
          return {
            ...c,
            ownerApprovalStatus: newOwnerStatus,
            status: newStatus,
            rejectionReason: action === 'reject' ? reason || 'Owner declined scheduling' : undefined
          };
        }
        return c;
      })
    );

    showNotification(
      `Campaign ${action === 'approve' ? 'ACCEPTED by Vehicle Owner! Now pending Admin inspection.' : 'REJECTED by Vehicle Owner.'}`,
      action === 'approve' ? 'success' : 'info'
    );
  };

  const adminActionCampaign = (
    campaignId: string,
    action: 'approve' | 'reject' | 'activate' | 'complete',
    reason?: string
  ) => {
    let affectedCampaign: Campaign | undefined;

    setCampaigns(prev =>
      prev.map(c => {
        if (c.id === campaignId) {
          affectedCampaign = c;
          let newAdminStatus = c.adminApprovalStatus;
          let newStatus = c.status;
          let newPaymentStatus = c.paymentStatus;
          let tracking = { ...c.tracking };

          if (action === 'approve') {
            newAdminStatus = 'Approved';
            newStatus = 'Approved';
          } else if (action === 'reject') {
            newAdminStatus = 'Rejected';
            newStatus = 'Rejected';
            newPaymentStatus = 'Refunded';
          } else if (action === 'activate') {
            newAdminStatus = 'Approved';
            newStatus = 'Active';
            tracking.gpsActive = true;
            newPaymentStatus = 'In Escrow';
          } else if (action === 'complete') {
            newStatus = 'Completed';
            newPaymentStatus = 'Disbursed';
            tracking.gpsActive = false;
            tracking.verifiedKm = tracking.targetKm;
          }

          return {
            ...c,
            adminApprovalStatus: newAdminStatus,
            status: newStatus,
            paymentStatus: newPaymentStatus,
            tracking,
            rejectionReason: action === 'reject' ? reason || 'Admin declined design or vehicle criteria' : undefined
          };
        }
        return c;
      })
    );

    // If completed, credit earnings to payouts automatically
    if (action === 'complete' && affectedCampaign) {
      const newPayout: PayoutRecord = {
        id: `pay-${Date.now().toString().slice(-4)}`,
        ownerId: affectedCampaign.ownerId,
        ownerName: affectedCampaign.ownerName,
        campaignId: affectedCampaign.id,
        campaignTitle: affectedCampaign.title,
        amount: affectedCampaign.ownerEarnings,
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
        paymentMethod: 'UPI Direct',
        accountOrUpi: 'Verified Linked Account',
        transactionRef: `UPI/AOW/${Math.floor(100000000 + Math.random() * 900000000)}`
      };
      setPayouts(prev => [newPayout, ...prev]);
    }

    const actionText =
      action === 'approve'
        ? 'Verified and Approved by Admin!'
        : action === 'activate'
        ? 'Campaign is now ACTIVE with GPS tracking live!'
        : action === 'complete'
        ? 'Campaign marked COMPLETED! Earnings credited to Vehicle Owner.'
        : 'Campaign REJECTED by Admin.';

    showNotification(actionText, action === 'reject' ? 'info' : 'success');
  };

  const requestPayout = (amount: number, method: string, accountOrUpi: string) => {
    const newRecord: PayoutRecord = {
      id: `pay-${Date.now().toString().slice(-4)}`,
      ownerId: currentUser?.id || 'user-own-1',
      ownerName: currentUser?.name || 'Suresh Kumar',
      campaignId: 'Manual-Withdrawal',
      campaignTitle: 'Owner Earnings Withdrawal',
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      paymentMethod: method,
      accountOrUpi,
      transactionRef: `PAYOUT-REQ-${Date.now().toString().slice(-6)}`
    };
    setPayouts(prev => [newRecord, ...prev]);
    showNotification(`Payout request of ₹${amount.toLocaleString()} submitted for processing!`, 'success');
  };

  const addComplaint = (subject: string, message: string, campaignId?: string) => {
    const newComplaint: Complaint = {
      id: `comp-${Date.now().toString().slice(-4)}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Visitor',
      userRole: currentUser?.role || 'advertiser',
      subject,
      message,
      relatedCampaignId: campaignId,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setComplaints(prev => [newComplaint, ...prev]);
    showNotification('Inquiry / support ticket submitted successfully!', 'success');
  };

  const resolveComplaint = (complaintId: string, notes: string) => {
    setComplaints(prev =>
      prev.map(c => (c.id === complaintId ? { ...c, status: 'Resolved', resolutionNotes: notes } : c))
    );
    showNotification('Ticket status updated to RESOLVED.', 'success');
  };

  const resetToDefaultData = () => {
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setVehicles(INITIAL_VEHICLES);
    setCampaigns(INITIAL_CAMPAIGNS);
    setPayouts(INITIAL_PAYOUTS);
    setComplaints(INITIAL_COMPLAINTS);
    localStorage.clear();
    showNotification('Platform demo data reset to default successfully!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        vehicles,
        campaigns,
        payouts,
        complaints,
        activePage,
        selectedVehicleForBooking,
        notification,
        setActivePage,
        setSelectedVehicleForBooking,
        loginAs,
        loginWithCredentials,
        registerUser,
        logout,
        addVehicle,
        verifyVehicle,
        createBooking,
        ownerActionCampaign,
        adminActionCampaign,
        requestPayout,
        addComplaint,
        resolveComplaint,
        theme,
        toggleTheme,
        setTheme,
        resetToDefaultData,
        showNotification,
        isRoleModalOpen,
        openRoleModal,
        closeRoleModal,
        selectVisitingRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
