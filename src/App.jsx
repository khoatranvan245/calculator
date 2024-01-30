import { useState, useRef } from 'react'
import './App.css'
const App = () => {
  const [mainInput, setMainInput] = useState('0')
  const [subInput, setSubInput] = useState('')
  const [existResult, setExistResult] = useState('')
  const [isShowResult, setIsShowResult] = useState(false)

  const stringToResult = (input) => {
    //Adding top method to array
    if (!Array.prototype.top) {
      Array.prototype.top = function () {
        return this[this.length - 1]
      }
    }

    const countFloatNumber = (number) => {
      let string = number.toString();
      let dotPosition = string.indexOf('.')

      if (dotPosition === -1) return 0
      
      let result = string.length - dotPosition - 1

      return result
    }

    const getPriority = (operator) => {
      if (operator === '+' || operator === '-') return 1
      if (operator === 'x' || operator === '/') return 2
    }

    const getInFixStack = (inFix) => {
      inFix += '+'
      let pos = 0,
        subString = '',
        stack = []
      while (pos <= inFix.length) {
        if (!isOperator(inFix[pos])) {
          subString += inFix[pos]
          pos++
        } else if (isOperator(inFix[pos])) {
          stack.push(Number(subString))
          stack.push(inFix[pos])
          subString = ''
          pos++
        }
      }
      stack.pop()
      return stack
    }

    const getPostFixStack = (inFixStack) => {
      let output = [],
        stack = []

      for (let i = 0; i < inFixStack.length; i++) {
        if (typeof inFixStack[i] == 'number')
          output.push(inFixStack[i])
        if (typeof inFixStack[i] == 'string') {
          while (
            isOperator(stack.top()) &&
            getPriority(stack.top()) >= getPriority(inFixStack[i])
          ) {
            output.push(stack.top())
            stack.pop()
          }
          stack.push(inFixStack[i])
        }
      }

      while (stack.length > 0) {
        output.push(stack.top())
        stack.pop()
      }
      return output
    }

    const getResult = (postFixStack) => {
      let stack = [],
        result
      for (let i = 0; i < postFixStack.length; i++) {
        if (typeof postFixStack[i] == 'number')
          stack.push(postFixStack[i])
        else {
          let b = stack.top()
          stack.pop()
          let a = stack.top()
          stack.pop()
          let cal
          if (postFixStack[i] === '+') cal = a + b
          if (postFixStack[i] === '-') cal = a - b
          if (postFixStack[i] === 'x') cal = a * b
          if (postFixStack[i] === '/') cal = a / b
          stack.push(cal)
        }
      }
      result = stack.top()
      return result
    }

    const innerFix = input
    let innerFixStack = getInFixStack(innerFix)
    let postFixStack = getPostFixStack(innerFixStack)
    let result = getResult(postFixStack)

    if (countFloatNumber(result) <= 3) return result;
    else return result.toFixed(3)
  }

  const isOperator = (char) => {
    if (char == '+' || char == '-' || char == 'x' || char == '/')
      return true
    else return false
  }

  const checkRedundantZero = (string) => {
    if (string[string.length - 1] !== '0') return 0
    if (string === '0' || isOperator(string[string.length - 2]))
      return 1
  }

  const handleNumberClick = (value) => {
    setMainInput((prev) => {
      if (existResult == '') {
        let newPrev
        if (checkRedundantZero(prev))
          newPrev = prev.slice(0, prev.length - 1)
        else if (isOperator(prev[prev.length - 1])) newPrev = ''
        else newPrev = prev

        return newPrev + value
      } else {
        setExistResult('')
        return value
      }
    })

    setSubInput((prev) => {
      if (existResult === '') {
        let newPrev
        if (checkRedundantZero(prev))
          newPrev = prev.slice(0, prev.length - 1)
        else newPrev = prev

        return newPrev + value
      } else {
        return value
      }
    })

    setIsShowResult(false)
  }

  const handleOperatorClick = (value) => {
    if (existResult === '') {
      setMainInput(value)
      setSubInput((prev) => {
        if (isOperator(prev[prev.length - 1])) {
          if (value === '-') return prev + value
          else return prev.slice(0, prev.length - 1) + value
        } else return prev + value
      })
    } else {
      setMainInput(existResult + value)
      setSubInput(existResult + value)
      setExistResult('')
    }

    setIsShowResult(false)
  }

  const handleACClick = () => {
    setMainInput('0')
    setSubInput('')
    setExistResult('')
  }

  const handleEqualClick = () => {
    if (isShowResult === false) {
      const result = stringToResult(subInput)
      setSubInput((prev) => prev + '=' + result)
      setMainInput(result)
      setExistResult(result)
      setIsShowResult(true)
    } else {
      setSubInput(prev => prev)
      setMainInput(prev => prev)
    }
  }

  return (
    <div className="container">
      <div className="calculator">
        <div className="input">
          <input
            className="subInput"
            value={subInput}
            readOnly
          ></input>
          <input
            className="mainInput"
            value={mainInput}
            readOnly
          ></input>
        </div>
        <div className="keyboard">
          <ul>
            <li
              className="AC"
              onClick={handleACClick}
            >
              AC
            </li>
            <li
              className="operator"
              onClick={(e) => handleOperatorClick(e.target.innerText)}
            >
              /
            </li>
            <li
              className="operator"
              onClick={(e) => handleOperatorClick(e.target.innerText)}
            >
              x
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              7
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              8
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              9
            </li>
            <li
              className="operator"
              onClick={(e) => handleOperatorClick(e.target.innerText)}
            >
              -
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              4
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              5
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              6
            </li>
            <li
              className="operator"
              onClick={(e) => handleOperatorClick(e.target.innerText)}
            >
              +
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              1
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              2
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              3
            </li>
            <li
              className="equal"
              onClick={handleEqualClick}
            >
              =
            </li>
            <li
              className="zero number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              0
            </li>
            <li
              className="number"
              onClick={(e) => handleNumberClick(e.target.innerText)}
            >
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
