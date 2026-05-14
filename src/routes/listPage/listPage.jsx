import React from 'react'
import { listData } from '../../lib/dummydata'
import './listPage.scss'
import Filter from '../../components/filter/Filter'
import Card from '../../components/card/Card'
const listPage = () => {
  const data =listData
  return (
    <div className='listpage'>
      <div className="listContainer">
        <div className="wrapper">
            <Filter/>
{data.map(item=>(<Card key={item.id} item={item}/>))}

        </div>
      </div>
      <div className="mapContainer">mapcontainer</div>
    </div>
  )         
}

export default listPage
