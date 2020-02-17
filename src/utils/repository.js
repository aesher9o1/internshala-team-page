const CARD_UPPER_LIMIT = 81
const CARD_LOWER_LIMIT = 3


export const POSITIVE_REINFORCEMENTS = [
  "You are smokn'g..🚬",
  'Fireeeeeeeeeee🔥',
  'Somebody has been flawless lateley💅🏻',
  'Are you a hacker?👨🏽‍💻',
  'Never seen someone so perfect 🙈'
]

export const NEGATIVE_REINFORCEMENTS = [
  'Errr!! Are you even trying?👀',
  'Quick fact, Almonds are good for memory🙈',
  'Alert!! The system has been infected by noob9o1🐏',
  'I bet if i give you the answer you would have forgot the question🤸‍♂️',
  'I will find you and i will kill you 🦉',
  'I have lost hope 🦛',
  'You droped 🧠 in the backyard'
]

export const MESSAGE_SAME_CARD = ["What's up doc?🐰"]

export const LIMIT_HIGH = 'Woahh!!! Slow down cowboy 🤙'
export const LIMIT_LOW = 'Are you sure you want to play? 😑'

export function SHUFFLE_ARRAY(array) {
  const temp = array
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    temp[currentIndex] = array[randomIndex]
    temp[randomIndex] = temporaryValue
  }

  return temp
}

export const checkCardLimits = (presentCardCount) => {
  return !(
    presentCardCount < CARD_LOWER_LIMIT || presentCardCount > CARD_UPPER_LIMIT
  )
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}