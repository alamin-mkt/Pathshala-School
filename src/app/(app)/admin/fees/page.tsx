"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Wallet,
  Receipt,
  Download,
  Plus,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  CreditCard,
  Building,
  Printer,
  Sparkles,
} from "lucide-react";
import jsPDF from "jspdf";

interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentName: string;
  rollNo: string;
  class: string;
  feeTitle: string;
  total: number;
  paid: number;
  due: number;
  status: "Paid" | "Partial" | "Unpaid";
  dueDate: string;
}

const INITIAL_INVOICES: FeeInvoice[] = [
  { id: "inv-1", invoiceNo: "INV-2026-101", studentName: "Alex Turner", rollNo: "101", class: "Grade 10 - A", feeTitle: "Tuition & Lab Fee (Term 1)", total: 1250, paid: 1250, due: 0, status: "Paid", dueDate: "2026-10-15" },
  { id: "inv-2", invoiceNo: "INV-2026-102", studentName: "Maya Rostova", rollNo: "102", class: "Grade 10 - A", feeTitle: "Tuition & Lab Fee (Term 1)", total: 1250, paid: 800, due: 450, status: "Partial", dueDate: "2026-10-15" },
  { id: "inv-3", invoiceNo: "INV-2026-103", studentName: "Liam Chen", rollNo: "103", class: "Grade 11 - STEM", feeTitle: "Tuition & STEM Robotics Fee", total: 1450, paid: 0, due: 1450, status: "Unpaid", dueDate: "2026-10-15" },
  { id: "inv-4", invoiceNo: "INV-2026-104", studentName: "Sophia Martinez", rollNo: "104", class: "Grade 8 - B", feeTitle: "Tuition Fee (Term 1)", total: 950, paid: 950, due: 0, status: "Paid", dueDate: "2026-10-15" },
  { id: "inv-5", invoiceNo: "INV-2026-105", studentName: "Tariq Al-Mansoor", rollNo: "105", class: "Grade 5 - A", feeTitle: "Tuition & Transport Fee", total: 1100, paid: 0, due: 1100, status: "Unpaid", dueDate: "2026-10-15" },
];

export default function FeesAccountingPage() {
  const { school } = useAuth();
  const [invoices, setInvoices] = useState<FeeInvoice[]>(INITIAL_INVOICES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Collect Fee Modal
  const [collectModalOpen, setCollectModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [collectAmount, setCollectAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"Cash" | "Bank Transfer" | "bKash" | "SSLCommerz" | "Stripe">("Cash");
  const [txRef, setTxRef] = useState("");

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.rollNo.includes(search);
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paid, 0);
  const totalDues = invoices.reduce((acc, curr) => acc + curr.due, 0);

  // Generate Official Fee Receipt PDF
  const downloadReceiptPdf = (inv: FeeInvoice, paidNow?: number, method?: string) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [148, 210], // A5 format
    });

    // Header Background
    doc.setFillColor(11, 37, 88); // #0B2558
    doc.rect(0, 0, 148, 28, "F");

    // Gold stripe
    doc.setFillColor(240, 179, 58);
    doc.rect(0, 28, 148, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(school?.name || "PATHSHALA SCHOOL SYSTEM", 74, 12, { align: "center" });

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL FEE PAYMENT RECEIPT / MONEY VOUCHER", 74, 18, { align: "center" });
    doc.text(`Receipt Date: ${new Date().toLocaleDateString("en-US")}`, 74, 23, { align: "center" });

    // Details Grid
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(12, 36, 124, 26, 2, 2, "F");

    doc.setTextColor(11, 37, 88);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice No: ${inv.invoiceNo}`, 16, 44);
    doc.text(`Student: ${inv.studentName}`, 16, 50);
    doc.text(`Class: ${inv.class} (Roll #${inv.rollNo})`, 16, 56);

    doc.text(`Payment Mode: ${method || "Cash / Counter"}`, 80, 44);
    doc.text(`Status: ${inv.due === 0 ? "PAID IN FULL" : "PARTIAL PAYMENT"}`, 80, 50);

    // Items Table
    let y = 68;
    doc.setFillColor(11, 37, 88);
    doc.rect(12, y, 124, 7, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Description", 16, y + 4.5);
    doc.text("Total", 88, y + 4.5, { align: "right" });
    doc.text("Paid Amount", 130, y + 4.5, { align: "right" });

    y += 7;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(12, y, 124, 8, "D");

    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    doc.text(inv.feeTitle, 16, y + 5);
    doc.text(`$${inv.total.toFixed(2)}`, 88, y + 5, { align: "right" });
    doc.text(`$${(paidNow || inv.paid).toFixed(2)}`, 130, y + 5, { align: "right" });

    // Summary Box
    y += 14;
    doc.setFillColor(232, 245, 236);
    doc.roundedRect(65, y, 71, 24, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 138, 62);
    doc.text(`Total Billed: $${inv.total.toFixed(2)}`, 70, y + 6);
    doc.text(`Amount Settled: $${inv.paid.toFixed(2)}`, 70, y + 12);
    doc.setTextColor(inv.due > 0 ? 185 : 31, inv.due > 0 ? 28 : 138, inv.due > 0 ? 28 : 62);
    doc.text(`Remaining Balance: $${inv.due.toFixed(2)}`, 70, y + 18);

    // Signature Block
    y += 38;
    doc.setDrawColor(148, 163, 184);
    doc.line(16, y, 60, y);
    doc.line(88, y, 132, y);

    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text("STUDENT / GUARDIAN SIGN", 38, y + 4, { align: "center" });
    doc.text("AUTHORIZED CASHIER / ACCOUNTS", 110, y + 4, { align: "center" });

    doc.save(`Receipt_${inv.invoiceNo}.pdf`);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    const newPaid = selectedInvoice.paid + Number(collectAmount);
    const newDue = Math.max(0, selectedInvoice.total - newPaid);
    const newStatus = newDue === 0 ? "Paid" : "Partial";

    const updated = invoices.map((inv) =>
      inv.id === selectedInvoice.id
        ? { ...inv, paid: newPaid, due: newDue, status: newStatus as any }
        : inv
    );

    setInvoices(updated);
    setCollectModalOpen(false);

    // Automatically trigger receipt print
    downloadReceiptPdf(
      { ...selectedInvoice, paid: newPaid, due: newDue, status: newStatus as any },
      collectAmount,
      paymentMode
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Fees Management & POS Counter
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Fee structure invoicing, counter cashier payments, and instant vector PDF receipts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const target = invoices.find((i) => i.due > 0);
                if (target) {
                  setSelectedInvoice(target);
                  setCollectAmount(target.due);
                  setCollectModalOpen(true);
                }
              }}
              className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Collect Fee (POS)</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Collected</span>
              <p className="text-2xl font-black font-heading text-green-700 mt-1">
                ${totalCollected.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Outstanding Dues</span>
              <p className="text-2xl font-black font-heading text-red-600 mt-1">
                ${totalDues.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-card border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Supported Gateways</span>
              <p className="text-sm font-bold font-heading text-navy-900 mt-1">
                bKash, SSLCommerz, Stripe & Cash
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Invoices Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoice number, student name, or roll..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-semibold"
              >
                <option value="all">All Invoices</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <span className="text-xs text-slate-500 font-semibold">{filtered.length} Invoices</span>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Invoice #</th>
                  <th className="py-3.5 px-6">Student Name</th>
                  <th className="py-3.5 px-6">Fee Description</th>
                  <th className="py-3.5 px-6">Total Amount</th>
                  <th className="py-3.5 px-6">Paid</th>
                  <th className="py-3.5 px-6">Due</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Receipt / Counter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-500 text-[11px]">
                      {inv.invoiceNo}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-navy-900">{inv.studentName}</p>
                      <p className="text-[10px] text-slate-400">
                        {inv.class} &bull; Roll #{inv.rollNo}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{inv.feeTitle}</td>
                    <td className="py-4 px-6 font-bold">${inv.total}</td>
                    <td className="py-4 px-6 text-green-700 font-bold">${inv.paid}</td>
                    <td className="py-4 px-6 text-red-600 font-bold">${inv.due}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          inv.status === "Paid"
                            ? "bg-green-50 text-green-700"
                            : inv.status === "Partial"
                            ? "bg-gold-50 text-gold-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5">
                      {inv.due > 0 && (
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setCollectAmount(inv.due);
                            setCollectModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-colors text-xs font-bold"
                        >
                          Collect
                        </button>
                      )}
                      <button
                        onClick={() => downloadReceiptPdf(inv)}
                        title="Download Receipt (PDF)"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Collect Fee POS */}
        {collectModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-dropdown p-6 border border-slate-100">
              <h3 className="text-lg font-bold font-heading text-navy-900 mb-1">
                Collect Student Fee & Print Receipt
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {selectedInvoice.studentName} &bull; Invoice #{selectedInvoice.invoiceNo}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Invoiced:</span>
                  <span className="font-bold">${selectedInvoice.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Already Paid:</span>
                  <span className="font-bold text-green-700">${selectedInvoice.paid}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1 font-bold text-red-600">
                  <span>Current Outstanding Due:</span>
                  <span>${selectedInvoice.due}</span>
                </div>
              </div>

              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Amount to Collect Now ($)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={selectedInvoice.due}
                    value={collectAmount}
                    onChange={(e) => setCollectAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold text-navy-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Payment Channel
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e: any) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Cash">Cash / Counter Receipt</option>
                    <option value="Bank Transfer">Bank Wire / Cheque</option>
                    <option value="bKash">bKash Mobile Banking</option>
                    <option value="SSLCommerz">SSLCommerz Gateway</option>
                    <option value="Stripe">Stripe Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Transaction Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={txRef}
                    onChange={(e) => setTxRef(e.target.value)}
                    placeholder="e.g. TR-8821940 or Bank Deposit Slip #"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCollectModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cta py-2 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Receive & Print Receipt</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
