import React, { useState } from 'react'
import "components/Appointment/styles.scss";
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'



export default function Form(props) {

  const reset = function () {
    setInterviewer(null);
    setName("");

  }
  const cancel = function () {
    reset();
    props.onCancel()

  }
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [name, setName] = useState(props.name || "")
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => { setName(event.target.value) }}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}