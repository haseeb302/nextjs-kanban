import Link from "next/link";
import Sidebar from "./ui/Sidebar";

export default function Page() {
  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Link href={"/home"}>
        <button>Home</button>
      </Link>
    </main>
  );
}
