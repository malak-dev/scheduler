import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios'
import DayList from "components/DayList";

export function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEWERS = "SET_INTERVIEWERS";
  const SET_APPOINTMENTS = "SET_APPOINTMENTS"

  function reducer(state, action) {
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
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = day => dispatch({ type: SET_DAY, day });


  useEffect(() => {
    Promise.all([axios.get(`/api/days`),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')])
      .then((response) => {
        const days = response[0].data
        console.log(response[0].data)
        const appointments = response[1].data
        const interviewers = response[2].data
        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      });
  }, [state]);


  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
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

        dispatch({
          type: SET_APPOINTMENTS,
          appointments,
          id
        });
      })

  }
  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)

  }
  return ({
    state,
    setDay,
    bookInterview,
    deleteInterview
  })

}