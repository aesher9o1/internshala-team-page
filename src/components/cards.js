import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import {
  SHUFFLE_ARRAY,
  MESSAGE_SAME_CARD,
  POSITIVE_REINFORCEMENTS,
  NEGATIVE_REINFORCEMENTS
} from '../utils/repository'

const Card = styled.div`
  background: ${(props) => props.theme.colorSeconday};
  box-shadow: ${(props) => props.theme.primaryBoxShadow};
  border-radius: ${(props) => props.theme.radius};
  padding: ${(props) => props.theme.padding};
  color: white;
  padding: 1rem;
  height: 5rem;
  text-align: center;
  cursor: pointer;
  transform: scale(1);
  user-select: none;
  transition: all 0.3s;

  &:active {
    transform: scale(0.95);
    transition: transform 0.3s;
  }

  &.selected {
    box-shadow: none !important;
    background: #47cf73;
    transform: scale(0.95);
  }
`
const Emoji = styled.img`
  font-size: 2rem;
  width: 100px;
  margin-top:-0.2em;
  border-radius: 50%;
`

function Cards(props) {
  const [cards, setCards] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [firstSelectedItem, setFirstSelectedItem] = useState(null)
  const [score, setScore] = useState(0)
  const { emojiCount, team } = props

  useEffect(() => {
    const temp = []
    for (let i = 0; i < emojiCount; i++) {
      temp.push({
        emoji: team[i].img,
        isActive: false,
        canBeClicked: true
      })
      temp.push({
        emoji: team[i].img,
        isActive: false,
        canBeClicked: true
      })
    }
    setCards(SHUFFLE_ARRAY(temp))
  }, [emojiCount, team])

  const handleCardClick = (index) => {
    const cardsCopy = [...cards]

    if (firstSelectedItem === index || !cards[index].canBeClicked) {
      // card that was revealed was clicked
      cardsCopy[firstSelectedItem] = {
        ...cardsCopy[firstSelectedItem],
        isActive: false
      }
      setCards(cardsCopy)
      setFirstSelectedItem(null)

      props.showSnackbar(MESSAGE_SAME_CARD)
    } else if (firstSelectedItem || firstSelectedItem === 0) {
      if (cards[firstSelectedItem].emoji === cards[index].emoji) {
        // right answer select current and first item to unclickable
        cardsCopy[firstSelectedItem] = {
          ...cardsCopy[firstSelectedItem],
          isActive: true,
          canBeClicked: false
        }
        cardsCopy[index] = {
          ...cardsCopy[index],
          isActive: true,
          canBeClicked: false
        }
        setCards(cardsCopy)
        setScore(score + 1)

        props.showSnackbar(
          POSITIVE_REINFORCEMENTS[
          Math.floor(Math.random() * POSITIVE_REINFORCEMENTS.length)
          ]
        )
        setFirstSelectedItem(null)

        // game over
        if (score === emojiCount - 1) props.setShouldTimerRun(false)
      } else {
        // wrong answer disable both
        cardsCopy[firstSelectedItem] = {
          ...cardsCopy[firstSelectedItem],
          isActive: false
        }

        cardsCopy[index] = {
          ...cardsCopy[index],
          isActive: true
        }

        setCards(cardsCopy)

        props.showSnackbar(
          NEGATIVE_REINFORCEMENTS[
          Math.floor(Math.random() * NEGATIVE_REINFORCEMENTS.length)
          ]
        )
      }
      setFirstSelectedItem(index)
    } else {
      // set first selected card
      cardsCopy[index] = { ...cardsCopy[index], isActive: true }
      setCards(cardsCopy)

      setFirstSelectedItem(index)
    }
  }

  const makeCard = () => {
    const temp = []
    for (let i = 0; i < cards.length; i++) {
      temp.push(
        <Card
          className={cards[i].isActive || !cards[i].canBeClicked ? 'selected' : ''}
          key={i}
          onClick={() => {
            handleCardClick(i)
          }}
        >
          {cards[i].isActive || !cards[i].canBeClicked ? (
            <Emoji src={cards[i].emoji} />
          ) : (
              <div />
            )}
        </Card>
      )
    }
    return temp
  }

  return <div className="cards-wrapper">{makeCard()}</div>
}

Cards.propTypes = {
  emojiCount: PropTypes.number,
  showSnackbar: PropTypes.func,
  setShouldTimerRun: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  team: PropTypes.array
}

Cards.defaultProps = {
  emojiCount: 4,
  showSnackbar: null,
  setShouldTimerRun: null,
  team: null
}

export default withTheme(Cards)
