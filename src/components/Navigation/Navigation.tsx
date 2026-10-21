import { NavLink } from 'react-router-dom'
import './Navigation.css'

const links = [
  { to: '/orders', label: 'Приход' },
  { to: '/products', label: 'Продукты' },
]

// БЕМ: блок "navigation", елемент "navigation__link", модифікатор "navigation__link--active".
function Navigation() {
  return (
    <aside className="navigation">
      <div className="navigation__user">
        {/* Фото користувача немає, тому показуємо іконку-заглушку */}
        <div className="navigation__avatar">
          <i className="bi bi-person-fill" />
        </div>
        <button className="navigation__settings" type="button" aria-label="Настройки профиля">
          <i className="bi bi-gear-fill" />
        </button>
      </div>

      <nav className="navigation__menu">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Navigation
