import { NavLink } from 'react-router-dom'
import './Navigation.css'

const links = [
  { to: '/orders', label: 'Приход' },
  { to: '/products', label: 'Продукты' },
]

// БЕМ: блок "navigation", елемент "navigation__link", модифікатор "navigation__link--active".
function Navigation() {
  return (
    <nav className="navigation">
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
  )
}

export default Navigation
