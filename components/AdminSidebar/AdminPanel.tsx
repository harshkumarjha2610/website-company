'use client';

import './AdminPanel.css';

export default function AdminPanel() {
  const handleClick = () => {
    console.log('Admin profile button clicked');
    // Add your navigation logic here
    // For example: router.push('/admin');
  };

  return (
    <>
      {/* Profile Button - Fixed at bottom-left */}
      <button
        onClick={handleClick}
        className="admin-profile-button"
        aria-label="Admin Profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
    </>
  );
}
