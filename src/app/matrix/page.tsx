import Tariffs from '@/components/Tariffs/Tariffs'
import Image from 'next/image'
import { FC } from 'react'
import style from './page.module.scss'

const matrix: FC = () => {
  return (
    <main className="content">
      <div className="content_container">
        <div className={style.content_title}>
          <h1>Ваш персональный расчет <span>матрицы судьбы</span></h1>
        </div>
        <div className={style.content_user}>
          <div className={style.user_block}>
            <span>Имя: <b>Оля</b></span>
          </div>
          <div className={style.user_block}>
            <span>Дата рождения: <b>25.01.2000</b></span>
          </div>
          <div className={style.user_block}>
            <span>Возраст: <b>29 лет</b></span>
          </div>
        </div>
        <div className={style.content_schema}>
          <div className={style.schema_container}>
            <div className={style.schema_title}>
              <h2>Ваша карта <span>здоровья</span></h2>
            </div>
            <div className={style.schema_row}>
              <div className={style.schema_block}>
                <div className={style.table_container}>
                  <div className={style.header_row}>
                    <span>Чакра</span>
                    <div className={style.header_row_right}>
                    <span>Физика</span>
                    <span>Энергия</span>
                    <span>Эмоции</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(211, 70, 69)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(211, 70, 69)' }}>Муладхара</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(255, 124, 3)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(255, 124, 3)' }}>Свадхистана</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(251, 201, 59)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(251, 201, 59)' }}>Манипура</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(124, 185, 105)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(124, 185, 105)' }}>Анахата</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(77, 185, 245)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(77, 185, 245)' }}>Вишудха</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(17, 113, 203)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(17, 113, 203)' }}>Аджна</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.chakra_row}>
                    <div className={style.chakra_name}>
                      <div style={{ backgroundColor: 'rgb(139, 70, 193)' }} className={style.chakra_dot}></div>
                      <span style={{ color: 'rgb(139, 70, 193)' }}>Сахасрара</span>
                      <Image className={style.chakra_info} src={'/img/info.svg'} width={24} height={24} alt="info" />
                    </div>
                    <div className={style.chakra_numbers}>
                      <span>5</span>
                      <span>19</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className={style.result_row}>
                    <span>Результат:</span>
                    <div className={style.result_row_right}>
                    <span>12</span>
                    <span>13</span>
                    <span>7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="schema">
                <Image src={`/img/schema.svg`} width={640} height={581} alt="schema" />
              </div>
            </div>
          </div>
        </div>
        <Tariffs />
      </div>
    </main>
  )
}

export default matrix