import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Sprout } from "lucide-react";

function Footer() {
  return (
    <section>
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sprout size={32} color="var(--color-accent)" />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>FarmDirect</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" style={{ color: 'var(--color-border)' }}>About</a>
            <a href="#" style={{ color: 'var(--color-border)' }}>Contact</a>
            <a href="#" style={{ color: 'var(--color-border)' }}>Privacy</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-primary-light)', paddingTop: '2rem', textAlign: 'center', color: 'var(--color-border)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} FarmDirect. All rights reserved.
        </div>
      </div>
    </footer>
    </section>
    
  )
}

export default Footer