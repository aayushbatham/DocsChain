import React, { useState, useEffect } from 'react';
import Logo from "../assets/Logo.png";
import axios from "axios";
import Cookies from "js-cookie";
import UploadDocument from "../pages/DocumentUploadPage";
import VerifyDocument from "../pages/DocumentVerificationPage";
import StoragePage from "../pages/StoragePage";
import UpdateDocument from "../pages/DocumentUpdatePage";
import UserSettings from "../pages/UserSettings";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('storage');
  const [userName, setUserName] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Logout = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        Cookies.remove("jwtToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setUserName(response.data.name); // Use the correct key from response
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserName();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadDocument />;
      case 'verify':
        return <VerifyDocument />;
      case 'storage':
        return <StoragePage />;
      case 'update':
        return <UpdateDocument />;
      case 'settings':
        return <UserSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-4 py-4 lg:px-5 lg:pl-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/dashboard" className="flex items-center">
              <img src={Logo} className="h-10 me-3" alt="Docs Chain Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                Docs Chain
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <h1 className="text-gray-800 px-5 font-semibold">Welcome, {userName}</h1>
            <button
              onClick={toggleDropdown}
              type="button"
              className="flex text-sm bg-gray-300 rounded-full focus:ring-4 focus:ring-gray-300"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                alt="User Avatar"
              />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-[12rem] w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                id="dropdown-user"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    onClick={(e) => {
                      setCurrentPage('settings');
                      toggleDropdown();
                      e.preventDefault();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    User Settings
                  </a>
                  <a
                    href="https://github.com/aayushhehe/DocsChain"
                    target="_blank"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Help
                  </a>
                  <a
                    href="#"
                    onClick={Logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-row flex-grow pt-16">
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 lg:translate-x-0 transform -translate-x-full transition-transform"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage('storage')}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                    currentPage === 'storage' ? 'bg-gray-200' : ''
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    viewBox="0 0 32 32"
                    id="folder"
                  >
                    <g>
                      <path d="M28.54 28.75H3.46a2.21 2.21 0 0 1-2.21-2.21V7.25h27.29a2.21 2.21 0 0 1 2.21 2.21v17.08a2.21 2.21 0 0 1-2.21 2.21Zm-25.79-20v17.79a.71.71 0 0 0 .71.71h25.08a.71.71 0 0 0 .71-.71V9.46a.71.71 0 0 0-.71-.71Z"></path>
                      <path d="M17.21 8.75h-16V5.46a2.21 2.21 0 0 1 2.25-2.21h9.64a2.19 2.19 0 0 1 2 1.22ZM2.75 7.25h12l-1.02-2.11a.7.7 0 0 0-.63-.39H3.46a.71.71 0 0 0-.71.71Z"></path>
                      <rect
                        width="4"
                        height="1.5"
                        x="23.25"
                        y="11.08"
                        rx=".75"
                        ry=".75"
                      ></rect>
                    </g>
                  </svg>
                  <span className="ms-3">Storage</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage('upload')}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                    currentPage === 'upload' ? 'bg-gray-200' : ''
                  }`}
                >
                  <svg
                    className="w-5 h-6 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="22"
                    id="upload"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M1 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M14 5l-4-4-4 4M10 1v14"></path>
                    </g>
                  </svg>
                  <span className="ms-3">Upload Document</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage('verify')}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                    currentPage === 'verify' ? 'bg-gray-200' : ''
                  }`}
                >
                  <svg
                    className="w-7 h-7 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    clipRule="evenodd"
                    id="verify"
                  >
                    <path
                      d="M600.64,331.889C599.387,331.572 597.947,331.911 596.929,332.929C595.911,333.947 595.572,335.387 595.889,336.641C594.779,337.302 594,338.561 594,340C594,341.439 594.779,342.698 595.889,343.36C595.572,344.613 595.911,346.053 596.929,347.071C597.947,348.089 599.387,348.428 600.641,348.111C601.302,349.221 602.561,350 604,350C605.439,350 606.698,349.221 607.36,348.111C608.613,348.428 610.053,348.089 611.071,347.071C612.089,346.053 612.428,344.613 612.111,343.359C613.221,342.698 614,341.439 614,340C614,338.561 613.221,337.302 612.111,336.64C612.428,335.387 612.089,333.947 611.071,332.929C610.053,331.911 608.613,331.572 607.359,331.889C606.698,330.779 605.439,330 604,330C602.561,330 601.302,330.779 600.64,331.889ZM600.627,334.039C600.905,334.227 601.26,334.263 601.571,334.135C601.881,334.006 602.106,333.73 602.17,333.4C602.323,332.603 603.101,332 604,332C604.899,332 605.677,332.603 605.83,333.4C605.894,333.73 606.119,334.006 606.429,334.135C606.74,334.263 607.095,334.227 607.373,334.039C608.044,333.584 609.021,333.708 609.657,334.343C610.292,334.979 610.416,335.956 609.961,336.627C609.773,336.905 609.737,337.26 609.865,337.571C609.994,337.881 610.27,338.106 610.6,338.17C611.397,338.323 612,339.101 612,340C612,340.899 611.397,341.677 610.6,341.83C610.27,341.894 609.994,342.119 609.865,342.429C609.737,342.74 609.773,343.095 609.961,343.373C610.416,344.044 610.292,345.021 609.657,345.657C609.021,346.292 608.044,346.416 607.373,345.961C607.095,345.773 606.74,345.737 606.429,345.865C606.119,345.994 605.894,346.27 605.83,346.6C605.677,347.397 604.899,348 604,348C603.101,348 602.323,347.397 602.17,346.6C602.106,346.27 601.881,345.994 601.571,345.865C601.26,345.737 600.905,345.773 600.627,345.961C599.956,346.416 598.979,346.292 598.343,345.657C597.708,345.021 597.584,344.044 598.039,343.373C598.227,343.095 598.263,342.74 598.135,342.429C598.006,342.119 597.73,341.894 597.4,341.83C596.603,341.677 596,340.899 596,340C596,339.101 596.603,338.323 597.4,338.17C597.73,338.106 598.006,337.881 598.135,337.571C598.263,337.26 598.227,336.905 598.039,336.627C597.584,335.956 597.708,334.979 598.343,334.343C598.979,333.708 599.956,333.584 600.627,334.039ZM600.293,340.705L602.315,342.727C602.705,343.117 603.338,343.117 603.729,342.727L607.707,338.749C608.097,338.358 608.097,337.725 607.707,337.334C607.317,336.944 606.683,336.944 606.293,337.334L603.022,340.606C603.022,340.606 601.707,339.291 601.707,339.291C601.317,338.901 600.683,338.901 600.293,339.291C599.903,339.681 599.903,340.315 600.293,340.705Z"
                      transform="translate(-592 -328)"
                    ></path>
                  </svg>
                  <span className="ms-3">Verify Document</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage('update')}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                    currentPage === 'update' ? 'bg-gray-200' : ''
                  }`}
                >
                  <svg
                    className="w-7 h-7 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 32 32"
                    viewBox="0 0 32 32"
                    id="update"
                  >
                    <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path>
                  </svg>
                  <span className="ms-3">Update Document</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="flex-grow lg:ml-64">{renderPage()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
