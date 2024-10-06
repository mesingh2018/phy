"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Premium Monthly",
    price: "$9.99",
    period: "month",
    features: [
      "Ad-free experience",
      "Access to all premium quizzes and simulations",
      "Exclusive content and animations",
    ],
    buttonText: "Subscribe",
  },
  {
    title: "Premium Yearly",
    price: "$99.99",
    period: "year",
    features: [
      "Ad-free experience",
      "Access to all premium quizzes and simulations",
      "Exclusive content and animations",
      "10% discount on all future courses",
    ],
    buttonText: "Subscribe",
    popular: true,
  },
  {
    title: "Lifetime Membership",
    price: "$499.99",
    period: "one-time",
    features: [
      "Ad-free experience",
      "Access to all premium quizzes and simulations",
      "Exclusive content and animations",
      "20% discount on all future courses",
      "Priority support and feedback",
    ],
    buttonText: "Purchase",
  },
];

export default function PricingPlans() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className={`flex flex-col h-full ${plan.popular ? 'border-primary' : ''} relative`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-bl">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-center">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-4xl font-bold text-center mb-4">
                    {plan.price}
                    <span className="text-sm font-normal">/{plan.period}</span>
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}