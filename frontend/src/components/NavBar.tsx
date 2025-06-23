import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const baseNavigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Feedback", href: "/feedback" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar: React.FC = () => {
  // Read user from localStorage (null if not logged in)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  // Build navigation links array dynamically
  // Add Admin Login if NOT logged in
  // Add Admin Dashboard if user is admin
  const navigation = [...baseNavigation];
  if (!isLoggedIn) {
    navigation.push({ name: "Admin Login", href: "/admin" });
  }
  if (isAdmin) {
    navigation.push({ name: "Admin Dashboard", href: "/admin" });
  }

  return (
    <Disclosure as="nav" className="bg-rose-100 shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-rose-700">
                  TreatBox
                </Link>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-rose-700 hover:text-rose-900 font-medium transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right side - Notification & Profile */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="text-rose-700 hover:text-rose-900 p-1"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" />
                </button>

                {/* Profile Dropdown */}
                {isLoggedIn && (
                  <Menu as="div" className="relative">
                    <MenuButton className="flex rounded-full focus:outline-none">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          user.image ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        }
                        alt="User"
                      />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                )}

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <DisclosureButton className="text-rose-700 hover:text-rose-900 focus:outline-none">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Nav Panel */}
          <DisclosurePanel className="md:hidden px-4 pb-4 pt-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-rose-700 hover:text-rose-900 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
