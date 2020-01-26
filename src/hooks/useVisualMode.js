import { useState } from 'react'

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial)

  function transition(initial, replace = false) {

    setHistory([...history, mode])
    setMode(initial)

  }
  function back() {

    if (history.length > 1) {
      const lastState = history.pop()
      setHistory(history)
      setMode(lastState)
    }
  }
  return { mode, transition, back };

}


