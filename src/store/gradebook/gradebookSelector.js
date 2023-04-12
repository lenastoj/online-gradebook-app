export function gradebooksSelector(state) {
  return state.gradebook.page;
}

export function pageSelector(state) {
  return state.gradebook.page;
}

export function gradebookSelector(state) {
  return state.gradebook.singleGradebook;
}

export function selectAppendErrors(state) {
  return state.gradebook.appendErrors;
}

export function selectFilters(state) {
  return state.gradebook.filters;
}
