import './index.css'

const TabItem = props => {
  const {item, activeTabId, changeTabFun} = props
  const {displayText, tabId} = item
  const cls = activeTabId === tabId ? 'active-style' : ''

  const getTabFun = () => {
    changeTabFun(tabId)
  }

  return (
    <li className="tab-list">
      <button type="button" className={`tab-btn ${cls}`} onClick={getTabFun}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
