import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'
import PropTypes from 'prop-types';


export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    InterviewerList.propTypes = {
      value: PropTypes.number,
      onChange: PropTypes.func.isRequired
    };
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewes">
      <h4 className="interviewers__header text--light"> interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>

    </section>
  );
}