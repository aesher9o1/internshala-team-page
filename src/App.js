import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Contols from './components/controls'
import theme from './utils/theme'
import Cards from './components/cards'
import Snackbar from './components/snackbar'

/**
 * Wrappers classes for this component is defined in style.css
 */

function App() {
  const [emojiCount, setEmojiCount] = useState(4)
  const [shouldTimerRun, setShouldTimerRun] = useState(true)
  const [snackbarState, setSnackbarState] = useState({
    isActive: false,
    message: 'demo'
  })

  const showSnackbar = (message) => {
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
    }, 3000)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="controls-wrapper">
        <Contols
          setEmojiCount={setEmojiCount}
          showSnackbar={showSnackbar}
          setShouldTimerRun={setShouldTimerRun}
          shouldTimerRun={shouldTimerRun}
        />
      </div>
      <Cards
        emojiCount={emojiCount}
        showSnackbar={showSnackbar}
        setShouldTimerRun={setShouldTimerRun}
      />
      <Snackbar isActive={snackbarState.isActive} message={snackbarState.message} />
    </ThemeProvider>
  )
}

export default App
