import { styled } from "@mui/material/styles";
import { makeUserDict } from "helpers/helpers";
import { useUsers } from "hooks/users";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ColumnDict, Task, TaskDict } from "types/board";
import { Project } from "types/project";

import { SprintColumn } from "./SprintColumn";
import { TaskModal } from "./SprintTask/TaskModal";

interface BoardActions {
  onDragEnd: (result: DropResult) => void;
  onAddTask: (task: string) => void;
}

interface Props extends BoardActions {
  taskDict: TaskDict;
  columnDict: ColumnDict;
  project: Project;
}

export const BoardContent = ({
  taskDict,
  project,
  columnDict,
  onDragEnd,
  onAddTask,
}: Props) => {
  const [selectedTask, setSelectedTask] = useState<{
    columnId: string;
    task: Task;
  }>();

  const [isOpen, setOpen] = useState(false);
  const { data } = useUsers();
  const users = makeUserDict(data);

  const setupTaskModal = (columnId: string, task: Task) => {
    if (!selectedTask) {
      setOpen(true);
      setSelectedTask({ columnId, task });
    }
  };

  const destroyTaskModal = () => {
    setOpen(false);
    setSelectedTask(undefined);
  };

  return Object.keys(columnDict).length === 0 ? null : (
    <>
      {selectedTask && (
        <TaskModal
          open={isOpen}
          data={selectedTask}
          onClose={destroyTaskModal}
        />
      )}
      <StyledBoard>
        <DragDropContext onDragEnd={onDragEnd}>
          {project.columnOrder.map((columnKey: string) => {
            const column = columnDict[columnKey];
            return (
              <SprintColumn
                key={column.id}
                users={users}
                columnKey={columnKey}
                column={column}
                taskDict={taskDict}
                onAddTask={onAddTask}
                onTaskClick={setupTaskModal}
              />
            );
          })}
        </DragDropContext>
      </StyledBoard>
    </>
  );
};

const StyledBoard = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  max-width: 100%;

  @media (min-width: 1400px) {
    overflow-x: scroll;
  }
`;
