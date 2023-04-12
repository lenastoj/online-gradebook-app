export function professorsSelector(state) {
  return state.professor.data;
}
export function professorSelector(state) {
  return state.professor.singleProfessor;
}

export function selectFiltersProfessor(state) {
  return state.professor.filters;
}
