import { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSearchQuery } from '../../store/searchSlice'
import { MONTHS, pad } from '../../utils/format'
import './TopMenu.css'

const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

function TopMenu() {
  const [now, setNow] = useState(() => new Date())

  // Текст пошуку живе в Redux: сторінки читають його й фільтрують свої списки.
  const searchQuery = useAppSelector((state) => state.search.query)
  const dispatch = useAppDispatch()

  // Раз на секунду оновлюємо стан -> React перемальовує годинник.
  // Функція, яку повертає useEffect, прибирає таймер, коли компонент зникає.
  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <header className="top-menu">
      <div className="top-menu__logo">
        <img className="top-menu__logo-icon" src={logo} alt="" />
        <span className="top-menu__logo-text">Inventory</span>
      </div>

      {/* Кероване поле: значення береться з Redux, кожна зміна відправляє дію setSearchQuery.
          Пошук за назвою: на сторінці приходів шукає приходи, на сторінці продуктів продукти. */}
      <input
        className="top-menu__search form-control"
        type="search"
        placeholder="Поиск"
        aria-label="Поиск по названию"
        value={searchQuery}
        onChange={(event) => dispatch(setSearchQuery(event.target.value))}
      />

      <div className="top-menu__clock">
        <div className="top-menu__weekday">{WEEKDAYS[now.getDay()]}</div>
        <div className="top-menu__date">
          {pad(now.getDate())} {MONTHS[now.getMonth()]}, {now.getFullYear()}
          <span className="top-menu__time">
            <i className="top-menu__time-icon bi bi-clock" />
            {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
          </span>
        </div>
      </div>
      {/* Лічильник активних вкладок (Socket.io) додамо на етапі WebSocket */}
    </header>
  )
}

export default TopMenu
