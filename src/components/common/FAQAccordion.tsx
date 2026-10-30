"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
  initialOpenIndex?: number;
  showCategoryFilters?: boolean;
}

export default function FAQAccordion({
  faqs,
  initialOpenIndex = 0,
  showCategoryFilters = false,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-6">
      {showCategoryFilters && categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-sky-200 bg-sky-50/30 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-2xl"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-sky-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-sans">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-sky-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed pl-14 animate-in fade-in slide-in-from-top-1 duration-150">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
