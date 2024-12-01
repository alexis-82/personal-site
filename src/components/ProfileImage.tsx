import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-40 h-40 md:w-96 md:h-96">
      <img
        src="/profile.png"
        alt="Profile"
        className="rounded-full w-full h-full object-cover border-4 border-purple-500/30 shadow-lg shadow-purple-500/20"
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none" />
    </div>
  );
};

export default ProfileImage;
