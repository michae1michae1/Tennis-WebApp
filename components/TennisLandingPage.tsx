"use client"

import { motion } from "framer-motion"
import { Activity, Trophy, Calendar, Bell, Users } from "lucide-react"
import { TennisBallDecoration } from "@/components/ui/tennis-ball"
import Link from "next/link"
import { Hero } from "@/components/ui/animated-hero"

function TennisLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Features Designed for Tennis Enthusiasts
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Custom Tournaments */}
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Custom Tournaments</h3>
              <p className="text-gray-600">
                Create tournaments with custom rules, formats, and structures.
              </p>
            </motion.div>
            
            {/* Ladder System */}
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ladder System</h3>
              <p className="text-gray-600">
                Implement ladder tournaments with configurable challenge rules.
              </p>
            </motion.div>
            
            {/* Real-time Updates */}
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Real-time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications and updates on match results and standings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Transform Your Tennis Community?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of players and organizers who are already using our platform.
            </motion.p>
            
            <Link href="/signup">
              <motion.button
                className="bg-primary text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", damping: 30, stiffness: 400 },
                }}
              >
                Get Started Today
              </motion.button>
            </Link>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[200%] h-64 bg-gray-50 rounded-[100%]"></div>
      </section>
    </div>
  )
}

export { TennisLandingPage } 