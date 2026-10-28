export type UserRole =
  | "superAdmin"
  | "schoolAdmin"
  | "principal"
  | "teacher"
  | "accountant"
  | "librarian"
  | "receptionist"
  | "student"
  | "parent";

export interface CustomClaims {
  role: UserRole;
  schoolId: string;
  status?: "active" | "suspended" | "pending";
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  schoolId: string;
  photoURL?: string;
  phoneNumber?: string;
  fcmTokens?: string[];
  status: "active" | "inactive" | "invited";
  createdAt: string;
  updatedAt: string;
}

export interface SchoolBranding {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  ctaColor?: string;
  motto?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface SchoolSettings {
  currency: string;
  timezone: string;
  dateFormat: string;
  gradingSystem: "letter" | "gpa" | "percentage";
  attendanceMode: "daily" | "period";
  enableOnlineAdmissions: boolean;
  enableFeeGateways: boolean;
}

export interface School {
  schoolId: string;
  name: string;
  slug: string;
  domain?: string;
  planId: "starter" | "growth" | "enterprise";
  status: "active" | "suspended" | "trial";
  branding: SchoolBranding;
  settings: SchoolSettings;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicYear {
  id: string;
  name: string; // e.g. "2026-2027"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ClassGrade {
  id: string;
  name: string; // e.g. "Class 10", "Grade 5"
  numericLevel: number; // 1 to 12
  academicYearId: string;
}

export interface Section {
  id: string;
  classId: string;
  name: string; // "A", "B", "Science", "Commerce"
  capacity: number;
  roomNumber?: string;
  classTeacherId?: string;
}

export interface Subject {
  id: string;
  classId: string;
  name: string;
  code: string;
  type: "theory" | "practical" | "elective";
  passMarks: number;
  totalMarks: number;
  teacherId?: string;
}

export interface Student {
  id: string;
  schoolId: string;
  admissionNo: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  bloodGroup?: string;
  currentClassId: string;
  currentSectionId: string;
  guardianIds: string[];
  avatarUrl?: string;
  status: "active" | "alumni" | "transferred" | "suspended";
  address?: string;
  emergencyContact?: string;
  admissionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Guardian {
  id: string;
  schoolId: string;
  userId?: string; // mapped to auth uid if registered
  fullName: string;
  relationship: "father" | "mother" | "guardian";
  phone: string;
  email: string;
  occupation?: string;
  address?: string;
  studentIds: string[];
}

export interface Staff {
  id: string;
  schoolId: string;
  userId?: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  phone: string;
  designation: string;
  qualification: string;
  subjectSpecialization?: string[];
  avatarUrl?: string;
  joiningDate: string;
  salary?: number;
  status: "active" | "resigned" | "leave";
}

export interface AttendanceRecord {
  id: string; // formatted as "date_sectionId"
  schoolId: string;
  date: string; // YYYY-MM-DD
  classId: string;
  sectionId: string;
  periodNumber?: number; // optional for period-wise
  attendanceMap: Record<string, "present" | "absent" | "late" | "excused">;
  takenByStaffId: string;
  notes?: string;
  updatedAt: string;
}

export interface TimetableSlot {
  id: string;
  schoolId: string;
  classId: string;
  sectionId: string;
  dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  periodNumber: number;
  startTime: string; // "09:00"
  endTime: string; // "09:45"
  subjectId: string;
  teacherId: string;
  roomNumber: string;
}

export interface Exam {
  id: string;
  schoolId: string;
  academicYearId: string;
  title: string; // e.g. "Mid-Term Examination 2026"
  classId: string;
  startDate: string;
  endDate: string;
  status: "scheduled" | "in_progress" | "grading" | "published";
}

export interface ExamResult {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  classId: string;
  sectionId: string;
  marks: Record<
    string,
    {
      subjectId: string;
      obtainedMarks: number;
      totalMarks: number;
      grade: string;
      gpa: number;
      remarks?: string;
    }
  >;
  totalObtained: number;
  totalMax: number;
  overallGpa: number;
  overallGrade: string;
  classRank?: number;
  teacherRemarks?: string;
  published: boolean;
}

export interface FeeStructure {
  id: string;
  schoolId: string;
  title: string; // e.g. "Annual Tuition Fee - Class 10"
  classId: string;
  academicYearId: string;
  totalAmount: number;
  frequency: "one-time" | "monthly" | "term" | "quarterly";
  items: {
    name: string;
    amount: number;
  }[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  schoolId: string;
  studentId: string;
  feeStructureId?: string;
  title: string;
  dueDate: string;
  totalAmount: number;
  discountAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: "unpaid" | "partial" | "paid" | "overdue";
  items: {
    description: string;
    amount: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  receiptNumber: string;
  schoolId: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  paymentMethod: "cash" | "bank" | "bkash" | "sslcommerz" | "stripe";
  transactionReference?: string;
  paidAt: string;
  receivedByStaffId: string;
}

export interface Notice {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  targetAudience: "all" | "teachers" | "parents" | "students";
  category: "academic" | "event" | "exam" | "urgent" | "general";
  isPublished: boolean;
  publishedAt: string;
  authorId: string;
}

export interface OnlineApplication {
  id: string;
  schoolId: string;
  applicationNo: string;
  appliedClassId: string;
  studentName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  previousSchool?: string;
  status: "applied" | "reviewed" | "accepted" | "rejected" | "enrolled";
  submittedAt: string;
}

export interface CmsContent {
  schoolId: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    bannerImage: string;
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  principalMessage: {
    badgeText: string;
    title: string;
    quote: string;
    principalName: string;
    principalTitle: string;
    photoUrl: string;
  };
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    stars: number;
    avatarUrl?: string;
  }[];
}
