import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-background border-b p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">CodeX</Link>
        <div className="flex space-x-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/problems">Problems</Link>
          <Link to="/subscription">Subscription</Link>
          <Link to="/submissions">Submissions</Link>
          <Link to="/certifications">Certifications</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
