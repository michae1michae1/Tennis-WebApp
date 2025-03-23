"use client"

import { motion } from "framer-motion"
import { Activity, Trophy, Calendar, Bell, Users } from "lucide-react"
import { TennisBallDecoration } from "@/components/ui/tennis-ball"
import Link from "next/link"

function TennisLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center relative pt-16">
        {/* Tennis-themed gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        
        {/* Tennis ball decorations */}
        <div className="absolute inset-0 -z-5 overflow-hidden">
          <TennisBallDecoration count={5} />
        </div>

        <div className="flex flex-col justify-center items-center w-full max-w-4xl z-10 px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Elevate Your <span className="text-primary">Tennis</span> Experience
          </motion.h1>
          
          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            Create, manage, and participate in custom tennis tournaments and ladder systems. 
            Use popular formats and structures, or create your own!
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
            <Link href="/tournaments/create">
            <motion.button
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              Create Tournament
            </motion.button>
            </Link>

            <Link href="/tournaments">
              <motion.button
                className="bg-secondary text-text px-6 py-3 rounded-full font-medium text-lg shadow-lg"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", damping: 30, stiffness: 400 },
                }}
              >
                View Tournaments
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

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