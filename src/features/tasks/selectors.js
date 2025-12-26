import { createSelector } from "@reduxjs/toolkit";

export const selectTasksState = state => state.tasks;
export const selectUI = state => state.ui;

export const selectFilteredSortedTasks = createSelector(
  [selectTasksState, selectUI],
  (tasksState, ui) => {
    let tasks = [...tasksState.entities];

    // Filter
    if (ui.filters.status !== "All") {
      tasks = tasks.filter(t => t.status === ui.filters.status);
    }

    if (ui.filters.priority !== "All") {
      tasks = tasks.filter(t => t.priority === ui.filters.priority);
    }

    if (ui.filters.search.trim()) {
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(ui.filters.search.toLowerCase())
      );
    }

    // Sort
    tasks.sort((a, b) =>
      ui.sortOrder === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );

    return tasks;
  }
);
