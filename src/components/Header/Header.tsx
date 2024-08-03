'use client'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import style from './Header.module.scss'

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidthWindow(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <ul className={style.header__menu}>
          <li>
            <Link href='/' style={{ display: widthWindow > 540 ? 'block' : 'none' }}>Главная</Link>
          </li>
          <li>
            <Link href='/forecast'>Прогноз по годам</Link>
          </li>
          <li>
            <Link href='/compatibility'>Совместимость</Link>
          </li>
          <li style={{ display: widthWindow > 768 ? 'block' : 'none' }}>
            <Link href='/blog'>Блог</Link>
          </li>
          <li style={{ display: widthWindow > 768 ? 'block' : 'none' }}>
            <Link href='/account'>Личный кабинет</Link>
          </li>
          {showMenu && (
            <>
              <div className={style.blur}></div>
              <ul className={style.header__menu__mobile}>
                <h2>Меню</h2>
                <li style={{ display: widthWindow >= 540 ? 'none' : 'block' }}>
                  <Link href='/'>Главная</Link>
                </li>
                <li>
                  <Link href='/blog'>Блог</Link>
                </li>
                <li>
                  <Link href='/account'>Личный кабинет</Link>
                </li>
              </ul>
            </>
          )}
          <div className={showMenu ? `${style.burger} ${style.active}` : style.burger} onClick={toggleMenu}>
            <span></span>
          </div>
        </ul>
      </div>
    </header>
  )
}

export default Header