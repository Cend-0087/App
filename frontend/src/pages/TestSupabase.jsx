import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TestSupabase() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getCars() {
            try {
                console.log('Пробуем получить данные из Supabase...')

                const { data, error } = await supabase
                    .from('cars')
                    .select('*')

                if (error) throw error

                console.log('Полученные данные:', data)
                setCars(data)
            } catch (err) {
                console.error('Ошибка:', err.message)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        getCars()
    }, [])

    if (loading) return <div style={styles.loading}>Загрузка...</div>
    if (error) return <div style={styles.error}>Ошибка: {error}</div>

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Тест подключения к Supabase</h1>

            <div style={styles.stats}>
                <p>Статус: <span style={styles.success}>✅ Подключено</span></p>
                <p>Найдено машин: <strong>{cars.length}</strong></p>
            </div>

            <div style={styles.carsGrid}>
                {cars.map(car => (
                    <div key={car.id} style={styles.carCard}>
                        <h3>{car.model}</h3>
                        <p>Год: {car.year}</p>
                        <p>Цена: €{car.price.toLocaleString()}</p>
                        <p style={styles.desc}>{car.description}</p>
                    </div>
                ))}
            </div>

            <div style={styles.rawData}>
                <h4>Сырые данные (для проверки):</h4>
                <pre>{JSON.stringify(cars, null, 2)}</pre>
            </div>
        </div>
    )
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'sans-serif'
    },
    title: {
        color: '#f5c518',
        borderBottom: '2px solid #f5c518',
        paddingBottom: '10px'
    },
    stats: {
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '30px'
    },
    success: {
        color: 'green',
        fontWeight: 'bold'
    },
    carsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    carCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#f9f9f9'
    },
    desc: {
        fontSize: '0.9rem',
        color: '#666'
    },
    rawData: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        padding: '15px',
        borderRadius: '8px',
        overflow: 'auto'
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5rem',
        marginTop: '50px'
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: '1.2rem',
        marginTop: '50px'
    }
}