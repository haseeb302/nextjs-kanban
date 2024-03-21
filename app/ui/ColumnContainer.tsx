import { Button } from "@/components/ui/button";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusIcon } from "lucide-react";
import Task from "./Task";
import { useMemo } from "react";

function ColumnContainer({
  column,
  createTask,
  rows,
}: {
  column: { id: any; name: any };
  createTask: (column_id: any) => void;
  rows: any;
}) {
  const tasksId = useMemo(() => rows.map((row: any) => row.task_id), [rows]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[300px] h-[500px]
        max-h-[500px] p-3 rounded-md flex
        flex-col border-2 border-dashed border-gray-200 opacity-20 bg-black"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[300px] h-[500px]
      max-h-[500px] p-3 rounded-md bg-white flex
      flex-col"
      key={column.id}
    >
      <div {...attributes} {...listeners}>
        <h2 className="font-bold text-[#49C4E5]">{column.name}</h2>
      </div>
      <div className="flex flex-grow flex-col p-2 gap-4 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksId}>
          {rows && rows?.map((row: any) => <Task task={row} />)}
        </SortableContext>
      </div>
      <Button
        variant="outline"
        className=""
        onClick={() => createTask(column.id)}
      >
        <PlusIcon size={16} />
      </Button>
    </div>
  );
}

export default ColumnContainer;
