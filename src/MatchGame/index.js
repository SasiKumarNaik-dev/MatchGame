import {Component} from 'react'
import './index.css'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'

const initialState = {
  activeTabId: 'FRUIT',
  index: 0,
  score: 0,
  isGameOn: true,
  timer: 60,
}

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  clearIntervalFun = () => {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {timer} = this.state
    if (timer === 0) {
      this.clearIntervalFun()
      this.setState({isGameOn: false})
    } else {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }
  }

  getFiltered = imagesList => {
    const {activeTabId} = this.state

    return imagesList.filter(eachItem => eachItem.category === activeTabId)
  }

  changeTabFun = tabId => {
    this.setState({activeTabId: tabId})
  }

  resetGame = () => {
    this.setState(initialState)
    this.componentDidMount()
  }

  getTab = () => {
    const {tabsList, imagesList} = this.props
    const {activeTabId} = this.state
    const filteredImagesList = this.getFiltered(imagesList)
    const getIdOfThumbNail = id => {
      const {index} = this.state
      if (imagesList[index].id === id) {
        this.setState(prevState => ({
          score: prevState.score + 1,
          index: Math.floor(Math.random() * 30),
        }))
      } else {
        this.clearIntervalFun()
        this.setState({isGameOn: false})
      }
    }

    return (
      <>
        <ul className="tabs-div">
          {tabsList.map(eachItem => (
            <TabItem
              item={eachItem}
              key={eachItem.tabId}
              activeTabId={activeTabId}
              changeTabFun={this.changeTabFun}
            />
          ))}
        </ul>
        <ul className="thumbnail-div">
          {filteredImagesList.map(eachItem => (
            <ThumbnailItem
              item={eachItem}
              key={eachItem.id}
              getIdOfThumbNail={getIdOfThumbNail}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {imagesList} = this.props
    const {index, score, isGameOn, timer} = this.state

    return (
      <div className="page-div">
        <ul className="nav-bar">
          <li className="logo-img-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="app-logo-img"
            />
          </li>
          <li className="nav-right">
            <p className="score-text">
              Score:<span className="score">{score}</span>
            </p>
            <div className="timer-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />
              <p className="timer">{timer} sec</p>
            </div>
          </li>
        </ul>
        {isGameOn ? (
          <div className="app-div">
            <div className="display-img-div">
              <img
                src={imagesList[index].imageUrl}
                alt="match"
                className="display-img"
              />
            </div>
            {this.getTab()}
          </div>
        ) : (
          <div className="app-div">
            <div className="result-card">
              <div className="cup-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
                  alt="trophy"
                  className="trophy-img"
                />
              </div>
              <div className="score-div">
                <p className="score-tag">YOUR SCORE</p>
                <p className="result-score">{score}</p>
              </div>
              <button type="button" className="btn" onClick={this.resetGame}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-img"
                />
                <p>PLAY AGAIN</p>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
