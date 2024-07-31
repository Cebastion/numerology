'use client'
import Link from 'next/link'
import { FC, useState } from 'react'
import style from './Header.module.scss'

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <ul className={style.header__menu}>
          <li>
            <Link href='/'>Главная</Link>
          </li>
          <li>
            <Link href='/forecast'>Прогноз по годам</Link>
          </li>
          <li>
            <Link href='/compatibility'>Совместимость</Link>
          </li>
          <li>
            <Link href='/blog'>Блог</Link>
          </li>
          <li>
            <Link href='/account'>Личный кабинет</Link>
          </li>
        </ul>
        <div className="burger">
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Header