import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

const SnackbarBody = styled.div`
  min-width: 250px;
  visibility: hidden;
  color: #fff;
  text-align: center;
  background: ${(props) => props.theme.colorSeconday};
  box-shadow: ${(props) => props.theme.primaryBoxShadow};
  border-radius: ${(props) => props.theme.radius};
  padding: ${(props) => props.theme.padding};
  padding: 16px;
  margin:30px;
  position: fixed;
  z-index: 1;
  left: 0%;
  font-size: 1rem;

  &.show {
    visibility: visible !important;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
`

function Snackbar(props) {
  const { isActive, message } = props

  return <SnackbarBody className={isActive ? 'show' : ''}>{message}</SnackbarBody>
}

Snackbar.propTypes = {
  isActive: PropTypes.bool,
  message: PropTypes.string
}

Snackbar.defaultProps = {
  isActive: false,
  message: ''
}

export default withTheme(Snackbar)
