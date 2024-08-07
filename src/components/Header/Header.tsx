'use client'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import style from './Header.module.scss'
import { usePathname } from 'next/navigation'

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [widthWindow, setWidthWindow] = useState(0)
  const pathname = usePathname ()

  useEffect(() => {
    setWidthWindow(window.innerWidth)

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

  const isActive = (path: string) => pathname === path

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <ul className={style.header__menu}>
          <li style={{ display: widthWindow > 540 ? 'block' : 'none' }} className={isActive('/') ? style.header__menu_li_active : ''}>
            <Link href='/'>Главная</Link>
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
                <li style={{ display: widthWindow >= 540 ? 'none' : 'block' }} className={isActive('/') ? style.header__menu_li_active : ''}>
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