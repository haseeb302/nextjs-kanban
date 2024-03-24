import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import TaskDialog from "./TaskDialog";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center bg-white h-24 p-6">
        <h3 className="text-2xl font-bold">Platform Launch</h3>
        <div className="">
          <TaskDialog />
          <Button variant="link" size="icon">
            <EllipsisVertical className="h-6 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
