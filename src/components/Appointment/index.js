import React, { useState } from 'react'
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form';
import Status from 'components/Appointment/Status'
import Confirm from './Confirm';
import Error from 'components/Appointment/Error'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY);


  function deleteint(id) {
    transition(CONFIRM);
  };

  function ConfirmDeleting(id) {
    transition(DELETE, true);
    props.deleteInterview(props.id)
      .then(() =>
        transition(EMPTY)
      ).catch(error =>
        transition(ERROR_DELETE, true)
      )
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() =>
        transition(SHOW)
      ).catch(error =>
        transition(ERROR_SAVE, true)
      )
  }
  function edit() {
    transition(EDIT);
  }

  return (
    <>
      {
        mode === SHOW && (
          <article className="appointment">
            {props.time}
            <Header />
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete={deleteint}
              onEdit={edit}
            />
          </article>
        )
      }
      {
        mode === EMPTY && (
          <article className="appointment">
            {props.time}
            <Empty onAdd={() => transition(CREATE)} />
          </article>
        )
      }
      {
        mode === CREATE && (
          <article className="appointment">
            <Form
              interviewers={props.interviewers}
              onCancel={() => back(EMPTY)}
              onSave={save}
            />
          </article>
        )
      }
      {mode === SAVING && (
        <article className="appointment">
          <Status />

        </article>
      )}
      {mode === DELETE && (
        <article className="appointment">
          <Status />
        </article>
      )}
      {mode === CONFIRM && (
        <article className="appointment">

          <Confirm
            onCancel={() => back(SHOW)}
            onConfirm={ConfirmDeleting} />
        </article>
      )}
      {mode === EDIT && (
        <article className="appointment">
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        </article>
      )}
      {
        mode === ERROR_DELETE && (
          <article className="appointment">
            <Error
              onClose={back()}
            />
          </article>
        )
      }
      {
        mode === ERROR_SAVE && (
          <article className="appointment">
            <Error
              onClose={back()}
            />
          </article>
        )
      }
    </>
  )
}

