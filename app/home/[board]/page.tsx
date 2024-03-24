"use client";

import ColumnContainer from "@/app/ui/ColumnContainer";
import Task from "@/app/ui/Task";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { getBoardColumns, setBoardColumns } from "@/lib/data";

interface Board {
  id: number;
  name: string;
  columns: any;
}

const board: Board = {
  id: 1,
  name: "Platform Launch",
  columns: [
    {
      id: 1,
      board_id: 1,
      name: "Todo",
      // rows: [
      //   {
      //     id: 1,
      //     title: "Task 1",
      //     column_id: 1,
      //     description: "0 of 3 subtasks",
      //   },
      // ],
    },
    {
      id: 2,
      board_id: 1,
      name: "Doing",
      // rows: [
      //   {
      //     id: 1,
      //     title: "Task 2",
      //     column_id: 2,
      //     description: "1 of 3 subtasks",
      //   },
      // ],
    },
    {
      id: 3,
      board_id: 1,
      name: "Done",
      // rows: [
      //   {
      //     id: 1,
      //     title: "Task 3",
      //     column_id: 3,
      //     description: "3 of 3 subtasks",
      //   },
      // ],
    },
  ],
};

const defaultTasks = [
  {
    task_id: 111,
    title: "Task 1",
    column_id: 2,
    description: "0 of 3 subtasks",
  },
  {
    task_id: 22,
    title: "Task 2",
    column_id: 1,
    description: "2 of 3 subtasks",
  },
  {
    task_id: 33,
    title: "Task 2:1",
    column_id: 2,
    description: "0 of 3 subtasks",
  },
  {
    task_id: 44,
    title: "Task 3:1",
    column_id: 3,
    description: "0 of 3 subtasks",
  },
];

// const emptyBoard = [];

export default function Page() {
  const [columns, setColumns] = useState<any>([]);
  const [tasks, setTasks] = useState<any>(defaultTasks);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const columns = getBoardColumns(decodeURI(pathname));
    setColumns(columns);
  }, []);

  const columnIds = useMemo(
    () => columns.map((column: any) => column.name),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<any>(null);
  const [activeTask, setActiveTask] = useState(null);

  const pathname = usePathname();

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      board_id: 1,
      name: `Column ${columns.length + 1}`,
    };
    columns.push(columnToAdd);
    setColumns([...columns]);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns: any) => {
      const activeColumnIndex = columns.findIndex(
        (col: any) => col.name === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col: any) => col.name === overColumnId
      );

      const updatedColumns = arrayMove(
        columns,
        activeColumnIndex,
        overColumnIndex
      );
      setBoardColumns(decodeURI(pathname), updatedColumns);
      return updatedColumns;
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId: any = over.id;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    console.log(active);

    const activeTaskStatus = active.data.current?.task?.status;
    const overTaskStatus = over?.data?.current?.task?.status;

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setColumns((columns: any) => {
        console.log(columns);
        const column1 = columns.find(
          (column: any) => column.name === activeTaskStatus
        );
        const activeTaskIndex = column1.tasks.findIndex(
          (t: any) => t.task_id === activeId
        );
        const column2 = columns.find(
          (column: any) => column.name === overTaskStatus
        );
        const overTaskIndex = column2.tasks.findIndex(
          (t: any) => t.task_id === overId
        );

        if (
          column1.tasks[activeTaskIndex].status !==
          column2.tasks[overTaskIndex].status
        ) {
          column1.tasks[activeTaskIndex].status =
            column2.tasks[overTaskIndex].status;
        }

        let updatedArray = arrayMove(
          column1.tasks,
          activeTaskIndex,
          overTaskIndex
        );
        return updatedArray;
      });
      // setTasks((tasks: any) => {
      //   const activeIndex = tasks.findIndex((t) => t.task_id === activeId);
      //   const overIndex = tasks.findIndex((t) => t.task_id === overId);
      //   console.log(activeIndex);
      //   if (tasks[activeIndex].status !== tasks[overIndex].status) {
      //     tasks[activeIndex].statsu = tasks[overIndex].status;
      //   }

      //   return arrayMove(tasks, activeIndex, overIndex);
      // });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.task_id === activeId);
        tasks[activeIndex].status = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const createTask = (column: any) => {
    const newTask = {
      task_id: generateId(),
      title: `Finish the project ${tasks.length + 1}`,
      status: column,
      description: "No Subtasks",
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex my-10 mx-8 gap-3">
        <SortableContext items={columnIds}>
          {columns?.map((column: any) => (
            <ColumnContainer
              column={column}
              key={column.name}
              createTask={createTask}
              // rows={tasks.filter((task) => task.column_id === column.id)}
              rows={column.tasks}
            />
          ))}
        </SortableContext>
        <Button
          asChild
          onClick={() => {
            createNewColumn();
          }}
        >
          <div
            className="w-[300px] h-[500px]
        max-h-[500px] p-3 rounded-md  flex
        flex-col opacity-40 border-2 cursor-pointer"
          >
            + Add Column
          </div>
        </Button>
      </div>
      {isMounted
        ? createPortal(
            <DragOverlay>
              {activeColumn !== null && (
                <ColumnContainer
                  column={activeColumn}
                  createTask={createTask}
                  key={activeColumn.name}
                  rows={activeColumn.tasks}
                />
              )}
              {activeTask && <Task task={activeTask} />}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  );
}
