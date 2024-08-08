import { tariffs } from '@/list/tariff.list'
import { FC } from 'react'
import style from './Tariffs.module.scss'


interface ITariffs{
  MatrixBlockRef?: HTMLDivElement | null
}
const Tariffs: FC<ITariffs> = () => {
  return (
    <section className={style.content_tariffs}>
      <div className={style.tariffs_content}>
        <div className={style.tariffs_title}>
          <p>Отправим на почту или в личный кабинет</p>
          <h2>ВЫБЕРИТЕ <span style={{ color: 'rgb(115, 121, 176)' }}>ТАРИФ</span> И ПОЛУЧИТЕ ВАШИ ПОЛНЫЕ РАСШИФРОВКИ</h2>
        </div>
        <div className={style.tariffs_list}>
          {tariffs.map((tariff) => (
            <div className={style.tariffs_block}>
              <h2 className={style.tariffs_block_title} dangerouslySetInnerHTML={{ __html: tariff.title }}/>
              <ul className={style.tariffs_advantages}>
                {tariff.advantages.map((advantage) => (
                  <li>{advantage}</li>
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
                <button>Выбрать</button>
              </div>
            </div>
          ))}
        </div>
        <div className={style.tariffs_row}>
          <button className={style.tariffs_row_button}>Рассчитать мою матрицу</button>
        </div>
      </div>
    </section>
  )
}

export default Tariffs