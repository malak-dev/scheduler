

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview } from "helpers/selectors"
import React, { useState, useEffect } from "react";
import axios from 'axios'

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  const appointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">}
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
            />
          );
        })
        }
      </section>
      <nav>
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
    </main>

  );
}
