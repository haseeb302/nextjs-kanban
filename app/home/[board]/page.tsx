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
import { title } from "process";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

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
    task_id: 11,
    title: "Task 1",
    column_id: 1,
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
  const [columns, setColumns] = useState(board.columns);
  const [tasks, setTasks] = useState(defaultTasks);

  const columnIds = useMemo(
    () => columns.map((column: any) => column.id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<any>(null);
  const [activeTask, setActiveTask] = useState(null);

  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }

  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      board_id: 1,
      name: `Column ${board.columns.length + 1}`,
    };
    board.columns.push(columnToAdd);
    console.log(board.columns);
    setColumns([...board.columns]);
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
        (col: any) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col: any) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
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

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.task_id === activeId);
        const overIndex = tasks.findIndex((t) => t.task_id === overId);

        if (tasks[activeIndex].column_id !== tasks[overIndex].column_id) {
          tasks[activeIndex].column_id = tasks[overIndex].column_id;
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.task_id === activeId);
        tasks[activeIndex].column_id = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const createTask = (column_id: any) => {
    const newTask = {
      task_id: generateId(),
      title: `Finish the project ${tasks.length + 1}`,
      column_id,
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
              key={column.id}
              createTask={createTask}
              rows={tasks.filter((task) => task.column_id === column.id)}
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
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              createTask={createTask}
              rows={tasks.filter((task) => task.column_id === activeColumn.id)}
            />
          )}
          {activeTask && <Task task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
