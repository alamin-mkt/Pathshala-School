import { describe, it, expect } from "vitest";

// Grade calculation utility
function calculateLetterGrade(marks: number): { grade: string; gpa: number } {
  if (marks >= 90) return { grade: "A+", gpa: 4.0 };
  if (marks >= 85) return { grade: "A", gpa: 3.7 };
  if (marks >= 80) return { grade: "A-", gpa: 3.3 };
  if (marks >= 75) return { grade: "B+", gpa: 3.0 };
  if (marks >= 70) return { grade: "B", gpa: 2.7 };
  if (marks >= 60) return { grade: "C", gpa: 2.0 };
  if (marks >= 50) return { grade: "D", gpa: 1.0 };
  return { grade: "F", gpa: 0.0 };
}

// Timetable conflict detection
interface Slot {
  day: string;
  period: number;
  teacher: string;
  room: string;
}

function hasClash(slots: Slot[], newSlot: Slot): boolean {
  return slots.some(
    (s) =>
      s.day === newSlot.day &&
      s.period === newSlot.period &&
      (s.teacher === newSlot.teacher || s.room === newSlot.room)
  );
}

// Tenant access rule evaluation
function canAccessTenantData(userToken: { schoolId: string; role: string }, resourceSchoolId: string): boolean {
  if (userToken.role === "superAdmin") return true;
  return userToken.schoolId === resourceSchoolId;
}

describe("Pathshala Academics & Security Engine", () => {
  it("accurately calculates grade and GPA", () => {
    expect(calculateLetterGrade(95)).toEqual({ grade: "A+", gpa: 4.0 });
    expect(calculateLetterGrade(88)).toEqual({ grade: "A", gpa: 3.7 });
    expect(calculateLetterGrade(72)).toEqual({ grade: "B", gpa: 2.7 });
    expect(calculateLetterGrade(45)).toEqual({ grade: "F", gpa: 0.0 });
  });

  it("detects timetable clashes when teacher or room is double booked", () => {
    const existingSlots: Slot[] = [
      { day: "Monday", period: 1, teacher: "Ms. Clara", room: "Room 101" },
      { day: "Monday", period: 2, teacher: "Mr. Lucas", room: "Lab 3" },
    ];

    // Conflict: Same teacher in same period
    expect(hasClash(existingSlots, { day: "Monday", period: 1, teacher: "Ms. Clara", room: "Room 105" })).toBe(true);

    // Conflict: Same room in same period
    expect(hasClash(existingSlots, { day: "Monday", period: 1, teacher: "Dr. Marcus", room: "Room 101" })).toBe(true);

    // No conflict: Different period or different day
    expect(hasClash(existingSlots, { day: "Monday", period: 3, teacher: "Ms. Clara", room: "Room 101" })).toBe(false);
    expect(hasClash(existingSlots, { day: "Tuesday", period: 1, teacher: "Ms. Clara", room: "Room 101" })).toBe(false);
  });

  it("strictly enforces multi-tenant boundary isolation", () => {
    const schoolAUser = { schoolId: "school_a", role: "teacher" };
    const schoolBUser = { schoolId: "school_b", role: "teacher" };
    const superAdmin = { schoolId: "platform", role: "superAdmin" };

    // Same tenant: Allowed
    expect(canAccessTenantData(schoolAUser, "school_a")).toBe(true);

    // Cross tenant: Strictly Disallowed
    expect(canAccessTenantData(schoolAUser, "school_b")).toBe(false);
    expect(canAccessTenantData(schoolBUser, "school_a")).toBe(false);

    // Super Admin: Allowed across all tenants
    expect(canAccessTenantData(superAdmin, "school_a")).toBe(true);
    expect(canAccessTenantData(superAdmin, "school_b")).toBe(true);
  });
});
