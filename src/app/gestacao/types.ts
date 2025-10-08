export interface WeekDay {
  date: Date;
  day: number;
  weekDay: string;
  isToday: boolean;
}

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  location: string;
  notes?: string;
}

export interface BabySize {
  week: number;
  size: string;
  description: string;
}

export interface PregnancyTip {
  week: number;
  tip: string;
  important: boolean;
}

export interface Milestone {
  week: number;
  title: string;
  description: string;
  icon: string;
}

export interface PregnancyState {
  currentWeek: number;
  dueDate: Date | null;
  pregnancyStartDate: Date;
  showDatePicker: boolean;
  tempStartDate: string;
  showMobileMenu: boolean;
  activeTab: 'home' | 'calendar' | 'appointments' | 'notes';
  appointments: Appointment[];
  showAddAppointment: boolean;
  newAppointment: Omit<Appointment, 'id'>;
  notes: Record<number, string>;
  kickCount: number;
  lastKickTime: Date | null;
  isLoading: boolean;
  error: string | null;
}
