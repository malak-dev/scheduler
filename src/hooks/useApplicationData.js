import { useEffect, useReducer } from "react";
import axios from 'axios'
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_APPOINTMENTS,
  SET_DAYS
} from "reducers/application";

export function useApplicationData() {


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = day => dispatch({ type: SET_DAY, day });


  useEffect(() => {
    Promise.all([axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')])
      .then((response) => {
        const days = response[0].data
        const appointments = response[1].data
        const interviewers = response[2].data
        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      });
  }, []);



  function bookInterview(id, interview) {

    return Promise.all([
      axios.put(`/api/appointments/${id}`, { interview }),
      axios.get('/api/days')])
      .then(response => {
        //Create an object contain the current appointment
        const appointment = { ...state.appointments[id] }
        //Update the interview with the new one
        appointment.interview = interview

        // const coolAppointment = {...state.appointments[id], interview}

        //create an object with all appointments
        const appointments = {
          ...state.appointments
        };
        //update the appointments with the updated appointment
        appointments[id] = appointment
        const days = response[1].data
        dispatch({
          type: SET_APPOINTMENTS,
          appointments,
          id,

        });
        dispatch({
          type: SET_DAYS,
          days
        });
      })
  }

  function deleteInterview(id) {
    return Promise.all([axios.delete(`/api/appointments/${id}`),
    axios.get('/api/days')])
      .then(response => {
        const days = response[1].data
        dispatch({
          type: SET_DAYS,
          days
        });
      })

  }
  return ({
    state,
    setDay,
    bookInterview,
    deleteInterview
  })

}