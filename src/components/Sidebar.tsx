import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import FontToggleWidget from "./HomePage/fontToggle";

const getAllCustomLayouts = (): number[] => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("dashboard-"))
    .map((key) => parseInt(key.replace("dashboard-", ""), 10))
    .filter((id) => !isNaN(id))
    .sort((a, b) => a - b);
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);
  const [customLayouts, setCustomLayouts] = useState<number[]>([]);
  const navigate = useNavigate();

  // Sync localStorage on mount and when it changes
  useEffect(() => {
    const syncLayouts = () => {
      setCustomLayouts(getAllCustomLayouts());
    };

    syncLayouts();
    window.addEventListener("storage", syncLayouts); // Cross-tab updates
    return () => window.removeEventListener("storage", syncLayouts);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDashboards = () => setDashboardsOpen(!dashboardsOpen);

  const getNextAvailableId = (ids: number[]) => {
    let id = 1;
    while (ids.includes(id)) id++;
    return id;
  };

  const handleCreateNewLayout = () => {
    const nextId = getNextAvailableId(customLayouts);
    localStorage.setItem(`dashboard-${nextId}`, JSON.stringify([]));
    setCustomLayouts((prev) => [...prev, nextId]); // Update sidebar immediately
    navigate(`/dashboard/${nextId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-banner text-white transition-all duration-300 p-4 flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="mb-4 text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Navigation */}
        {isOpen && (
          <nav className="space-y-2">
            <NavLink to="/" className="block hover:underline">
              Home
            </NavLink>
            <NavLink to="/charts" className="block hover:underline">
              Charts
            </NavLink>

            {/* Dashboards Section */}
            <button
              onClick={toggleDashboards}
              className="flex items-center gap-2 w-full text-left hover:underline"
            >
              {dashboardsOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
              Dashboards
            </button>

            {dashboardsOpen && (
              <div className="ml-4 space-y-1">
                <NavLink
                  to="/dashboard/default"
                  className="block hover:underline"
                >
                  Default Dashboard
                </NavLink>

                {customLayouts.map((id) => (
                  <div
                    key={id}
                    className="flex items-center justify-between group"
                  >
                    <NavLink
                      to={`/dashboard/${id}`}
                      className="block hover:underline flex-grow"
                    >
                      Custom Dashboard {id}
                    </NavLink>
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Are you sure you want to delete Custom Dashboard ${id}?`
                        );
                        if (!confirmDelete) return;

                        // Remove from localStorage and update state
                        localStorage.removeItem(`dashboard-${id}`);
                        setCustomLayouts((prev) =>
                          prev.filter((layoutId) => layoutId !== id)
                        );
                      }}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete layout"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleCreateNewLayout}
                  className="flex items-center text-sm text-primary hover:underline mt-1"
                >
                  <Plus size={16} className="mr-1" />
                  Create New Layout
                </button>
              </div>
            )}
          </nav>
        )}
        
      </div>

      {/* Main Content */}
      <FontToggleWidget />
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
