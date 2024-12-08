import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
  _id: string;
  title: string;
  description?: string;
  course: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
  editing?: boolean;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, { payload }) => {
      // MongoDB will provide the _id, so we don't need to generate one
      state.assignments.push(payload);
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        assignment => assignment._id !== assignmentId
      );
    },

    updateAssignment: (state, { payload: updatedAssignment }) => {
      const index = state.assignments.findIndex(
        assignment => assignment._id === updatedAssignment._id
      );
      if (index !== -1) {
        state.assignments[index] = {
          ...state.assignments[index],
          ...updatedAssignment,
        };
      }
    },

    editAssignment: (state, { payload: assignmentId }) => {
      const assignment = state.assignments.find(a => a._id === assignmentId);
      if (assignment) {
        assignment.editing = true;
      }
    },

    // New action to handle setting multiple assignments at once (useful for initial load)
    setAssignments: (state, { payload: assignments }) => {
      state.assignments = assignments;
    },
  },
});

export const { 
  setAssignment, 
  addAssignment, 
  deleteAssignment, 
  updateAssignment,
  editAssignment,
  setAssignments 
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;