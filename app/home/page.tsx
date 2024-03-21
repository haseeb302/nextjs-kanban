import { Button } from "@/components/ui/button";
import Sidebar from "../ui/Sidebar";

export default function Page() {
  return (
    <div className="">
      <div className="w-fit mx-auto align-middle mt-36">
        <div className="flex flex-col items-center">
          <p>Add a new board, or select from existing.</p>
          <Button className="rounded-full bg-[#635FC7]">+ Add Board</Button>
        </div>
      </div>
    </div>
  );
}
