import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full border-r flex-none md:w-64">
        <Sidebar />
      </div>
      <div className="flex-grow bg-[#E4EBFA] md:overflow-y-auto">
        <Navbar />
        <div className="flex w-full overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}
