
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEWERS = "SET_INTERVIEWERS";
export const SET_APPOINTMENTS = "SET_APPOINTMENTS"
export const SET_DAYS = "SET_DAYS"

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day, id: action.id }

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEWERS: {
      return {
        ...state,
        id: action.id,
        interviewer: action.interviewer
      }
    }
    case SET_DAYS: {
      return { ...state, days: action.days }
    }
    case SET_APPOINTMENTS: {
      return {
        ...state,
        appointments: action.appointments,
        id: action.id
      }


    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}