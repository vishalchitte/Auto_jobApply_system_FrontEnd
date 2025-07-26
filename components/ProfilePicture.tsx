import { useState } from 'react';
import Image from 'next/image';

interface ProfilePictureProps {
  userId?: string;
  fallbackImage?: string;
  size?: number;
}

export default function ProfilePicture({ userId, fallbackImage = '/default-avatar.png', size = 40 }: ProfilePictureProps) {
  const [error, setError] = useState(false);
  const storedPhotoUrl = typeof window !== 'undefined' ? localStorage.getItem('userProfilePhoto') : null;

  // Try to load profile picture in this order:
  // 1. API endpoint if userId provided
  // 2. Stored photo URL from localStorage
  // 3. Fallback default image
  const imageUrl = !error && userId 
    ? `http://localhost:8080/api/user/profile-pic/${userId}`
    : storedPhotoUrl || fallbackImage;

  return (
    <div className={`relative rounded-full overflow-hidden`} style={{ width: size, height: size }}>
      <Image
        src={imageUrl}
        alt="Profile"
        width={size}
        height={size}
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}