"use client";

import { AddTodoForm } from "./add-todo-form";

interface AddTodoFormWrapperProps {
  disabled: boolean;
}

export const AddTodoFormWrapper = ({ disabled }: AddTodoFormWrapperProps) => {
  return <AddTodoForm disabled={disabled} />;
};
