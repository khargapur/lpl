"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: readonly FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white rounded-xl border border-gray-100 shadow-card px-5 data-[state=open]:border-brand-blue/30 transition-colors"
        >
          <AccordionTrigger className="text-left text-brand-blue font-semibold hover:text-brand-blue py-4 hover:no-underline text-sm">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 pb-4 leading-relaxed text-sm">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
