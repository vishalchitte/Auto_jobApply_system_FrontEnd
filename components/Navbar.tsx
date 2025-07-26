import ProfilePicture from './ProfilePicture';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 px-4 py-2">
      {/* ...existing nav items... */}
      
      <div className="flex items-center gap-2">
        <ProfilePicture size={40} />
        <span className="text-white">
          {localStorage.getItem('userEmail')}
        </span>
      </div>
      
      {/* ...existing nav items... */}
    </nav>
  );
}