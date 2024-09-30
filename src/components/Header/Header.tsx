'use client'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import style from './Header.module.scss'
import { usePathname } from 'next/navigation'

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [widthWindow, setWidthWindow] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

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

  const isActive = (path: string) => {
    const regex = new RegExp(`^${path.replace(/:\w+/g, '\\d+')}$`)
    return regex.test(pathname)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!sessionStorage.getItem('auth_token'))
    }
  }, [])

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <>
      <header className={style.header}>
        <div className={style.header__container}>
          <ul className={style.header__menu}>
            <li style={{ display: widthWindow > 540 ? 'block' : 'none' }} className={isActive('/') ? style.header__menu_li_active : ''}>
              <Link href='/'>Главная</Link>
            </li>
            <li className={isActive('/forecast') ? style.header__menu_li_active : ''}>
              <Link href='/#forecast'>Прогноз по годам</Link>
            </li>
            <li className={isActive('/compatibility') ? style.header__menu_li_active : ''}>
              <Link href='/#compatibility'>Совместимость</Link>
            </li>
            <li style={{ display: widthWindow > 768 ? 'block' : 'none' }} className={isActive('/blogs') || isActive('/blogs/blog/:id') ? style.header__menu_li_active : ''}>
              <Link href='/blogs'>Блог</Link>
            </li>
            <li style={{ display: widthWindow > 768 ? 'block' : 'none' }} className={isActive('/dashboard') || isActive('/login') || isActive('/signup') ? style.header__menu_li_active : ''}>
              <Link href={isLoggedIn ? '/dashboard' : '/login'}>Личный кабинет</Link>
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
                    <Link href='/blogs'>Блог</Link>
                  </li>
                  <li>
                    <Link href={isLoggedIn ? '/dashboard' : '/login'}>Личный кабинет</Link>
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
    </>
  )
}

export default Header