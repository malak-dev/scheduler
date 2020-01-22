import React from 'react'
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
export default function Appointment(props) {
  const interview = props.interview
  if (interview) {
    return (
      <article className="appointment">
        {props.time}
        <Header />
        <Show
          interviewer={interview.interviewer}
          student={interview.student} />
      </article>
    )
  } else {
    return (
      <article className="appointment">
        {props.time}
        <Empty />

      </article>
    )
  }
}