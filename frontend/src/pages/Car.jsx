import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function Car(){
  const { id } = useParams()
  const [car, setCar] = useState(null)
  useEffect(()=>{ api.get('/cars/'+id).then(r=>setCar(r.data)).catch(()=>{}) },[id])
  if(!car) return <div>Загрузка...</div>
  return (<div>
    <h2>{car.model} — {car.year}</h2>
    <p>Цена: €{car.price}</p>
    <p>Кузов: {car.body} — {car.hp} HP</p>
    <p>{car.description}</p>
  </div>)
}
