import Link from 'next/link'
import { FC } from 'react'
import style from './Footer.module.scss'
import Image from 'next/image'

const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer_container}>
        <div className={style.footer_menu}>
          <div className={style.menu_column}>
            <Link href='/'>Главная</Link>
            <Link href='/#forecast'>Прогноз по годам</Link>
            <Link href='/#compatibility'>Совместимость</Link>
          </div>
          <div className={style.menu_column}>
            <Link href='/blog'>Блог</Link>
            <Link href='/account'>Личный кабинет</Link>
          </div>
          <div className={style.menu_column}>
            <p>Контакты</p>
            <div className={style.menu_link}>
              <Image src={'/image/telegram.png'} width={40} height={40} alt='telegram' />
              <Link href='/#'>Telergram</Link>
            </div>
            <div className={style.menu_link}>
              <Image src={'/image/mail.png'} width={40} height={40} alt='site' />
              <Link href='/#'>xxx.ru</Link>
            </div>
            <div className={style.menu_link}>
              <Image src={'/image/vk.png'} width={40} height={40} alt='friends' />
              <Link href='/#'>Давайте дружить?</Link>
            </div>
          </div>
        </div>
        <div className={style.footer_info}>
          <div className={style.info_link}>
            <Link href='/#'>Политика конфиденциальности</Link>
            <Link href='/#'>Публичная оферта</Link>
          </div>
          <span>© 2024 - xxx.ru - Матрица Судьбы</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
