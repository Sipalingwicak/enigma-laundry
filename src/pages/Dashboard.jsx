import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import TableCustomer from "./TableCustomer";
import TableProducts from "./TableProducts";
import TableTrx from "./TableTrx";
import { Divider } from "@heroui/react";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  const triggerSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    document.getElementById("logout_modal").showModal();
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      toast.info("Logout Success. Redirecting to login page...");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen  bg-white">
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`h-full flex flex-col border-r transition-all duration-300 ${
              collapsed ? "w-16" : "w-60"
            } border-gray-400 bg-white`}
          >
            <div
              className={`px-4 py-4 flex items-center space-x-3 transition-all duration-300 ${
                collapsed ? "justify-center" : "justify-center"
              }`}
            >
              {/*<span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              W
            </span>*/}
              {!collapsed && (
                <span className="flex justify-center items-center">
                  <img
                    src="../src/assets/laundry-logo.svg"
                    alt="laundry-logo"
                    className="w-8 h-8 mr-4 mt-1"
                  />

                  <span className="font-bold text-md text-left leading-tight text-emerald-800">
                    Enigma <br />
                    Laundry
                  </span>
                </span>
              )}
            </div>
            <button
              onClick={() => triggerSidebar()}
              className="group flex items-center justify-center w-full py-2 bg-blue-50 text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center py-1 border-y border-gray-300 mx-2 my-2">
              <img
                src="../src/assets/profile.jpg" // Gambar profil mock
                alt="profile"
                className="w-12 h-auto rounded-full"
              />
              {!collapsed && (
                <>
                  <h2 className="text-sm font-medium text-gray-700">Admin</h2>
                  <p className="text-xs text-gray-500 text-center break-words">
                    admin@example.com
                  </p>
                </>
              )}
            </div>
            <ul className="flex-grow flex-1 mt-4 space-y-2">
              <li
                className={`flex items-center space-x-2 py-2 px-4 hover:bg-blue-100 cursor-pointer ${
                  activeTab === "products" ? "bg-blue-100" : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                {!collapsed && <span className="text-gray-600">Products</span>}
              </li>
              <li
                className={`flex items-center space-x-2 py-2 px-4 hover:bg-blue-100 cursor-pointer ${
                  activeTab === "customers" ? "bg-blue-100" : ""
                }`}
                onClick={() => setActiveTab("customers")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {!collapsed && <span className="text-gray-600">customers</span>}
              </li>
              <li
                className={`flex items-center space-x-2 py-2 px-4 hover:bg-blue-100 cursor-pointer ${
                  activeTab === "transactions" ? "bg-blue-100" : ""
                }`}
                onClick={() => setActiveTab("transactions")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14h.01M9 17h.01M15 7a3 3 0 11-6 0 3 3 0 016 0zM7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                {!collapsed && (
                  <span className="text-gray-600">Transactions</span>
                )}
              </li>
            </ul>

            <div>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>
                {!collapsed && "Logout"}
              </button>
            </div>
          </div>

          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {activeTab === "products" && <TableProducts />}
            {activeTab === "customers" && <TableCustomer />}
            {activeTab === "transactions" && <TableTrx />}
          </main>
        </div>
      </div>

      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Logging Out</h3>
          <Divider className="my-4" />
          <p className="py-0 text-md text-center font-bold font-serif text-gray-600">
            Are you sure want to log out ?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-sm bg-red-400 hover:bg-red-300 rounded-lg text-white font-light"
              type="button"
              onClick={() => document.getElementById("logout_modal").close()}
              // Menutup modal tanpa menghapus
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 rounded-lg text-white font-light"
              type="button"
              onClick={handleConfirmLogout}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Dashboard;
