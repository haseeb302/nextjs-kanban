import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center bg-white h-24 p-6">
        <h3 className="text-2xl font-bold">Platform Launch</h3>
        <div className="">
          <Button className="rounded-full bg-[#635FC7] hover:opacity-30 hover:bg-[#635FC7]">
            <Plus className="h-4 w-4" /> Add New Task
          </Button>
          <Button variant="link" size="icon">
            <EllipsisVertical className="h-6 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
