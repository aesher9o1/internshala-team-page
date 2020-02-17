import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'
import Contols from './components/controls'
import theme from './utils/theme'
import Cards from './components/cards'
import Snackbar from './components/snackbar'

/**
 * Wrappers classes for this component is defined in style.css
 */

const Bold = styled.b`
    position:absolute;
    color:white;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -200px;
  `

function App() {

  const [team, setTeam] = useState(null)
  const [emojiCount, setEmojiCount] = useState(6)
  const [shouldTimerRun, setShouldTimerRun] = useState(true)
  const [snackbarState, setSnackbarState] = useState({
    isActive: false,
    message: 'demo'
  })

  useEffect(() => {
    axios.get('https://internshala-team.firebaseio.com/team.json').then(res => {
      const temp = res.data.slice(0, 82)
      setTeam(temp.reverse())
    })
  }, [])

  const showSnackbar = (message, timeout = 3000) => {
    if (snackbarState.isActive) return

    setSnackbarState({
      isActive: true,
      message
    })

    setTimeout(() => {
      setSnackbarState({
        isActive: false,
        message: 'demo'
      })
    }, timeout)
  }

  return (
    <ThemeProvider theme={theme}>
      {(!team) ? <Bold>Please wait while we load the get the team members</Bold> : <div>
        <div className="controls-wrapper">
          <Contols
            setEmojiCount={setEmojiCount}
            showSnackbar={showSnackbar}
            setShouldTimerRun={setShouldTimerRun}
            shouldTimerRun={shouldTimerRun}
          />
        </div>
        <Cards
          team={team}
          emojiCount={emojiCount}
          showSnackbar={showSnackbar}
          setShouldTimerRun={setShouldTimerRun}
        />
        <Snackbar isActive={snackbarState.isActive} message={snackbarState.message} />
      </div>
      }

    </ThemeProvider>
  )
}

export default App
