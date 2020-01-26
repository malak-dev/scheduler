import React, { useState, useEffect } from "react";

import axios from 'axios'
export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log("hello", response)
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
      })

  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
  }
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([axios.get(`/api/days`),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')])
      .then((response) => {
        console.log(response)
        const days = response[0].data
        const appointments = response[1].data
        const interviewers = response[2].data
        setState(prev => ({ ...state, days: days, appointments: appointments, interviewers: interviewers }));

      });
  }, []);
  return ({
    state,
    setDay,
    bookInterview,
    deleteInterview
  })

}