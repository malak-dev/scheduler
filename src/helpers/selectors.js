

export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.filter(eachDay => eachDay.name === day);
  if (filteredDay.length === 0) {
    return []
  }
  const appointments = filteredDay[0].appointments;
  const specificAppointment = appointments.map(id => {
    if (state.appointments[id]) {
      return state.appointments[id]
    } else {
      return "";
    }
  })
  return specificAppointment;

} 
