import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import { checkCardLimits, LIMIT_HIGH, LIMIT_LOW } from '../utils/repository'

const FloatingLayout = styled.div`
  background: ${(props) => props.theme.colorSeconday};
  box-shadow: ${(props) => props.theme.primaryBoxShadow};
  display: block;
  position: absolute;
  width: 250px !important;
  margin: auto;
  left: 0;
  right: 0;
  text-align: centre;
  border-radius: ${(props) => props.theme.radius};
  padding: ${(props) => props.theme.padding};
  margin-top: 2em;
`

const EmojiButton = styled.button`
  margin: 0 !important;
  padding: 0.1em;
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: white;
  font-family: 'Merriweather Sans', sans-serif;
  font-weight: 900;
  cursor: pointer;
  -webkit-appearance: button;
  outline: none !important;
`

function Controls(props) {
  const [seconds, setSeconds] = useState(0)
  const { shouldTimerRun } = props

  const padZeros = (i) => {
    return i < 10 ? `0${i}` : i
  }

  const getMinuteString = () => {
    const m = padZeros(Math.floor(seconds / 60))
    const s = padZeros(seconds % 60)

    return `${m}:${s}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    if (!shouldTimerRun) clearInterval(interval)

    return () => clearInterval(interval)
  }, [seconds, shouldTimerRun])

  const handleEmojiDecrease = () => {
    props.setEmojiCount((emoji) => {
      if (checkCardLimits(emoji - 1)) {
        setSeconds(0)
        props.setShouldTimerRun(true)
        return emoji - 1
      }
      props.showSnackbar(LIMIT_LOW)
      return emoji
    })
  }
  const handleEmojiIncrease = () => {
    props.setEmojiCount((emoji) => {
      if (checkCardLimits(emoji + 1)) {
        setSeconds(0)
        props.setShouldTimerRun(true)
        return emoji + 1
      }
      props.showSnackbar(LIMIT_HIGH)
      return emoji
    })
  }

  return (
    <FloatingLayout>
      <ul>
        <li>
          <EmojiButton onClick={handleEmojiDecrease}>
            <span role="img" aria-label="block" description="remove cards">
              ⛔️
            </span>
          </EmojiButton>
        </li>
        <li style={{ width: '140px' }}>
          &nbsp;&nbsp;&nbsp;{getMinuteString()}&nbsp;&nbsp;&nbsp;
        </li>
        <li>
          <EmojiButton onClick={handleEmojiIncrease}>
            <span role="img" aria-label="block" description="remove cards">
              ➕
            </span>
          </EmojiButton>
        </li>
      </ul>
    </FloatingLayout>
  )
}

Controls.propTypes = {
  showSnackbar: PropTypes.func,
  setEmojiCount: PropTypes.func,
  setShouldTimerRun: PropTypes.func,
  shouldTimerRun: PropTypes.bool
}

Controls.defaultProps = {
  showSnackbar: null,
  setEmojiCount: null,
  setShouldTimerRun: null,
  shouldTimerRun: true
}

export default withTheme(Controls)
