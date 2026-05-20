export type Tenant = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Service = {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  created_at: string;
};

export type StaffRole = 'admin' | 'barber';

export type Staff = {
  id: string;
  user_id: string | null;
  name: string;
  role: StaffRole;
  created_at: string;
};

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type Appointment = {
  id: string;
  staff_id: string;
  service_id: string;
  customer_name: string;
  customer_phone: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
  status: AppointmentStatus;
  created_at: string;
};
