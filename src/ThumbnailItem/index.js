import './index.css'

const ThumbnailItem = props => {
  const {item, getIdOfThumbNail} = props
  const {id, thumbnailUrl} = item
  const getSendFun = () => {
    getIdOfThumbNail(id)
  }
  return (
    <li className="thumbnail-list">
      <button type="button" onClick={getSendFun} className="thumb-btn">
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default ThumbnailItem
