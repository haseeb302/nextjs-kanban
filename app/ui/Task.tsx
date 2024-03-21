import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task }: any) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.task_id,
    data: {
      type: "Task",
      task,
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
        className="p-3 border rounded-md bg-zinc-200 opacity-30 h-[100px] min-h-[100px]"
      ></div>
    );
  }

  return (
    <div
      className="p-3 border rounded-md bg-zinc-200 bg-opacity-50"
      key={task.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p className="font-bold">{task.title}</p>
      <span className="text-xs text-[#828FA3]">{task.description}</span>
    </div>
  );
}
