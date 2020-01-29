
// fucntion for get all the appointments for specific day
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

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer]
    return { ...interview, interviewer }
  } else {
    return null
  }
}
// get all the interviewers for specific day 
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(eachDay => eachDay.name === day);

  if (filteredDay.length === 0) {
    return []
  }
  const interviewers = filteredDay[0].interviewers;
  const specificInterviewer = interviewers.map(id => {
    if (state.interviewers[id]) {
      return state.interviewers[id]
    } else {
      return "";
    }
  })
  return specificInterviewer;

}