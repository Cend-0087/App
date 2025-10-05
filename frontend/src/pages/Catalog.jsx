import React, {useEffect, useState} from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Catalog(){
  const [cars, setCars] = useState([])
  useEffect(()=>{ api.get('/cars').then(r=>setCars(r.data)).catch(()=>{}) },[])
  return (<div>
    <h2>Каталог</h2>
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:12}}>
      {cars.map(c=>(
        <div key={c.id} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
          <h3>{c.model}</h3>
          <p>{c.year} — €{c.price}</p>
          <p>{c.description}</p>
          <Link to={'/cars/'+c.id}>Подробнее</Link>
        </div>
      ))}
    </div>
  </div>)
}
