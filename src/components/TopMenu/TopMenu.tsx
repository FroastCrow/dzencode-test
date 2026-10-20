import { useEffect, useState } from 'react'
import { MONTHS, pad } from '../../utils/format'
import './TopMenu.css'

const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

function TopMenu() {
  const [now, setNow] = useState(() => new Date())

  // Раз на секунду оновлюємо стан -> React перемальовує годинник.
  // Функція, яку повертає useEffect, прибирає таймер, коли компонент зникає.
  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <header className="top-menu">
      <div className="top-menu__logo">INVENTORY</div>
      <div className="top-menu__clock">
        <div className="top-menu__weekday">{WEEKDAYS[now.getDay()]}</div>
        <div className="top-menu__date">
          {pad(now.getDate())} {MONTHS[now.getMonth()]}, {now.getFullYear()}
          <span className="top-menu__time">{pad(now.getHours())}:{pad(now.getMinutes())}</span>
        </div>
      </div>
      {/* Лічильник активних вкладок (Socket.io) додамо на етапі WebSocket */}
    </header>
  )
}

export default TopMenu
