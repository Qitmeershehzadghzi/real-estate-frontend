import './list.scss'
import Card from"../card/Card"

function List({ posts = [], emptyMessage = "No posts found." }) {
  return (
    <div className='list'>
      {posts.length === 0 && <p>{emptyMessage}</p>}
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List
