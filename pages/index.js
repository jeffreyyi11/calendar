import Head from 'next/head'
import Image from 'next/image'
import Calendar from '../components/Calendar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Calendar />
    </div>
  )
}
