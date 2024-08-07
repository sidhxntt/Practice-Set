import { NavLink, Outlet } from "react-router-dom";

const AccountPage = () => {
  return (
    <>
      <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap py-14 justify-center gap-5">
        
      <NavLink 
          to="home" 
          className={({ isActive }) =>
            `inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none ${
              isActive ? 'border-blue-500 t' : 'border-transparent hover:border-gray-400'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="profile" 
          className={({ isActive }) =>
            `inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none ${
              isActive ? 'border-blue-500 text-blue-600' : 'border-transparent hover:border-gray-400'
            }`
          }
        >
          Profile
        </NavLink>

        <NavLink 
          to="upload-blog" 
          className={({ isActive }) =>
            `inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none ${
              isActive ? 'border-blue-500 text-blue-600' : 'border-transparent hover:border-gray-400'
            }`
          }
        >
          Upload Blog
        </NavLink>

        <NavLink 
          to="your-blogs" 
          className={({ isActive }) =>
            `inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none ${
              isActive ? 'border-blue-500 t' : 'border-transparent hover:border-gray-400'
            }`
          }
        >
          Your Blogs
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default AccountPage;
