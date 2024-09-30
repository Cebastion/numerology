'use client'
import { tariffs } from '@/list/tariff.list'
import { FC } from 'react'
import style from './Tariffs.module.scss'
import { useRouter } from 'next/navigation'


interface ITariffs{
  MatrixBlockRef?: HTMLDivElement | null
}
const Tariffs: FC<ITariffs> = () => {
  const router = useRouter()

  const RedirectTariff = (id: number) => {
    router.push(`/tariff/${id}`)
  }

  return (
    <section id='tariffs' className={style.content_tariffs}>
      <div className={style.tariffs_content}>
        <div className={style.tariffs_title}>
          <p>Отправим на почту или в личный кабинет</p>
          <h2>ВЫБЕРИТЕ <span style={{ color: 'rgb(115, 121, 176)' }}>ТАРИФ</span> И ПОЛУЧИТЕ ВАШИ ПОЛНЫЕ РАСШИФРОВКИ</h2>
        </div>
        <div className={style.tariffs_list}>
          {tariffs.map((tariff, index) => (
            <div className={style.tariffs_block} key={index}>
              <h2 className={style.tariffs_block_title} dangerouslySetInnerHTML={{ __html: tariff.title }}/>
              <ul className={style.tariffs_advantages}>
                {tariff.advantages.map((advantage, index) => (
                  <li key={index}>{advantage}</li>
                ))}
              </ul>
              {tariff.additional && (
                <div className={style.tariffs_additional}>
                  <span>{tariff.additional}</span>
                </div>
              )}
              <div className={tariff.discount ? style.tariffs_price_discount : style.tariffs_price}>
                <span>{tariff.price}</span>
                {tariff.discount && (
                  <span>{tariff.discount}</span>
                )}
              </div>
              <div className={style.tariffs_button}>
                <button onClick={() => RedirectTariff(tariff.id)}>Выбрать</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tariffs