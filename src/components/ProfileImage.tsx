import React from 'react';

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 aspect-square">
      <img
        src="/profile.webp"
        alt="Profile"
        draggable="false"
        className="rounded-full w-full h-full object-cover aspect-square border-4 border-purple-500/30 shadow-lg shadow-purple-500/20 select-none"
        onMouseDown={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default ProfileImage;
