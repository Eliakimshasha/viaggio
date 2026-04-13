import { Sidebar } from "../../../components/dashboard/sidebar";
import logo from "../../../public/assets/images/logo3.png";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen p-6 pt-0 max-w-full  relative overflow-hidden">
      {/* Main Content */}
      <div className="flex lg:gap-4 flex-col lg:flex-row">
        {/* Sidebar - Mobile: Top cards, Desktop: Left sidebar */}
        <div className="lg:w-64 lg:min-h-screen bg-gray-200 rounded-lg">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div
          className="flex-1 lg:border-1 lg:rounded-lg overflow-x-scroll
          border-gray-200"
        >
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
