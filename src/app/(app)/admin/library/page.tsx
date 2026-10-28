"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  BookOpen,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookmarkCheck,
  X,
} from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

const INITIAL_BOOKS: Book[] = [
  { id: "b1", title: "Principles of Mathematical Analysis", author: "Walter Rudin", isbn: "978-0070542358", category: "Mathematics", totalCopies: 12, availableCopies: 8 },
  { id: "b2", title: "Concepts of Modern Physics", author: "Arthur Beiser", isbn: "978-0072448481", category: "Science", totalCopies: 15, availableCopies: 5 },
  { id: "b3", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0446310789", category: "Literature", totalCopies: 25, availableCopies: 19 },
  { id: "b4", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", isbn: "978-0136042594", category: "Computer Science", totalCopies: 8, availableCopies: 3 },
  { id: "b5", title: "A Brief History of Time", author: "Stephen Hawking", isbn: "978-0553380163", category: "Science", totalCopies: 10, availableCopies: 7 },
];

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("Science");
  const [copies, setCopies] = useState(10);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search)
  );

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: `bk-${Date.now()}`,
      title,
      author,
      isbn,
      category,
      totalCopies: Number(copies),
      availableCopies: Number(copies),
    };
    setBooks([newBook, ...books]);
    setModalOpen(false);
    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">
              Library Catalog & Circulation
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Book inventory tracking, lending records, and automated overdue returns.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-cta text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-card border border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by book title, author, or ISBN..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold">{filtered.length} Titles in Catalog</span>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Book Title</th>
                  <th className="py-3.5 px-6">Author</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">ISBN</th>
                  <th className="py-3.5 px-6">Available / Total</th>
                  <th className="py-3.5 px-6 text-right">Circulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-navy-900">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold">{b.title}</td>
                    <td className="py-4 px-6 text-slate-600">{b.author}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[11px] text-slate-500">{b.isbn}</td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-green-700">{b.availableCopies}</span> / {b.totalCopies}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => alert(`Issue "${b.title}" to student`)}
                        className="btn-outline py-1.5 px-3 text-xs font-semibold"
                      >
                        Issue Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add Book */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-dropdown p-6 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-lg font-bold font-heading text-navy-900">Add Book to Library</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-navy-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBook} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Book Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Clean Architecture"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Author *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Robert C. Martin"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">ISBN</label>
                    <input
                      type="text"
                      required
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      placeholder="978-0134494166"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Literature">Literature</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="History">History</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Copies Available</label>
                  <input
                    type="number"
                    min={1}
                    value={copies}
                    onChange={(e) => setCopies(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cta py-2 px-6 text-xs font-bold uppercase tracking-wider"
                  >
                    Save to Catalog
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
