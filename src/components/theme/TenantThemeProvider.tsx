"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const TenantThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { school } = useAuth();

  useEffect(() => {
    if (school?.branding) {
      const root = document.documentElement;
      if (school.branding.primaryColor) {
        root.style.setProperty("--school-primary", school.branding.primaryColor);
      }
      if (school.branding.secondaryColor) {
        root.style.setProperty("--school-secondary", school.branding.secondaryColor);
      }
      if (school.branding.accentColor) {
        root.style.setProperty("--school-accent", school.branding.accentColor);
      }
      if (school.branding.ctaColor) {
        root.style.setProperty("--school-cta", school.branding.ctaColor);
      }
    }
  }, [school]);

  return <>{children}</>;
};
