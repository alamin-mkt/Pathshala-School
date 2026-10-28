"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bus, MapPin, Users, Plus, Phone, CheckCircle2 } from "lucide-react";

interface Route {
  id: string;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  assignedStudents: number;
  stops: string[];
}

const INITIAL_ROUTES: Route[] = [
  {
    id: "r1",
    routeName: "North Route - Downtown & Riverside",
    vehicleNo: "BUS-PATH-01",
    driverName: "Marcus Brody",
    driverPhone: "+1 (555) 901-4455",
    capacity: 36,
    assignedStudents: 32,
    stops: ["742 Evergreen", "Riverside Ave", "Lexington & 5th", "Main Gate"],
  },
  {
    id: "r2",
    routeName: "South Route - Oakridge & Academic Park",
    vehicleNo: "BUS-PATH-02",
    driverName: "Joseph Miller",
    driverPhone: "+1 (555) 901-7788",
    capacity: 40,
    assignedStudents: 38,
    stops: ["Central Park South", "West End Ave", "Science Center", "Main Gate"],
  },
];

export default function TransportPage() {
  const [routes, setRoutes] = useState<Route[]>(INITIAL_ROUTES);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Transport Fleet & Student Routes
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Vehicle fleet allocation, verified drivers, route stops, and student passenger rosters.
            </p>
          </div>

          <button
            onClick={() => alert("Create new bus route")}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Route</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full font-mono">
                    {r.vehicleNo}
                  </span>
                  <h3 className="text-base font-bold font-heading text-navy-900 mt-2">
                    {r.routeName}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center">
                  <Bus className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Designated Driver:</span>
                  <span className="font-bold text-navy-900">{r.driverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Driver Contact:</span>
                  <span className="font-mono text-green-700">{r.driverPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Capacity & Seating:</span>
                  <span className="font-bold text-navy-900">
                    {r.assignedStudents} / {r.capacity} seats occupied
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Route Stops:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {r.stops.map((stop, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {stop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
