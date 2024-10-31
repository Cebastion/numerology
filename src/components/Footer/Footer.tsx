'use client'
import Link from 'next/link'
import { FC } from 'react'
import style from './Footer.module.scss'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Footer: FC = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    const regex = new RegExp(`^${path.replace(/:\w+/g, '\\d+')}$`)
    return regex.test(pathname)
  }

  const GetDateYear = () => {
    const date = new Date()
    return date.getFullYear()
  }

  return (
    <footer className={style.footer} style={isActive('/purchase') ? { display: 'none' } : { backgroundColor: 'flex' }}>
      <div className={style.footer_container}>
        <div className={style.footer_menu}>
          <div className={style.menu_column}>
            <Link href='/'>Главная</Link>
            <Link href='/#forecast'>Прогноз по годам</Link>
            {/*<Link href='/#compatibility'>Совместимость</Link>*/}
          </div>
          <div className={style.menu_column}>
            <Link href='/blogs'>Блог</Link>
            <Link href='/dashboard'>Личный кабинет</Link>
          </div>
          <div className={style.menu_column}>
            <p>Контакты</p>
            <div className={style.menu_link}>
              <Image src={'/image/telegram.png'} width={40} height={40} alt='telegram' />
              <Link href='https://t.me/mtrxmap'>Telegram</Link>
            </div>
            <div className={style.menu_link}>
              <Image src={'/image/mail.png'} width={40} height={40} alt='site' />
              <Link href='mailto:support@matrix-map.ru'>support@matrix-map.ru</Link>
            </div>
            {/*<div className={style.menu_link}>
              <Image src={'/image/vk.png'} width={40} height={40} alt='friends' />
              <Link href='/#'>Давайте дружить?</Link>
            </div>*/}
          </div>
        </div>
        <div className={style.footer_info}>
          <div className={style.info_link}>
            <Link href='/privacy_policy'>Политика конфиденциальности</Link>
            <Link href='/public_offer'>Публичная оферта</Link>
          </div>
          <span>© {GetDateYear()} - matrix-map.ru - Матрица Судьбы</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
