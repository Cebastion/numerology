import Tariffs from '@/components/Tariffs/Tariffs'
import Image from 'next/image'
import { FC } from 'react'
import style from './page.module.scss'

const matrix: FC = () => {
  return (
    <main className="content">
      <div className="content_container">
        <div className="content_title">
          <h1>Ваш персональный расчет <span>матрицы судьбы</span></h1>
        </div>
        <div className="content_user">
          <div className="user_block">
            <span>Имя: <b>Оля</b></span>
          </div>
          <div className="user_block">
            <span>Дата рождения: <b>25.01.2000</b></span>
          </div>
          <div className="user_block">
            <span>Возраст: <b>29 лет</b></span>
          </div>
        </div>
        <div className="content_schema">
          <div className="schema_title">
            <h2>Ваша карта <span>здоровья</span></h2>
          </div>
          <div className="schema_row">
            <div className="schema_block">
              <table>
                <thead>
                  <tr>
                    <th>Чакра</th>
                    <th>Физика</th>
                    <th>Энергия</th>
                    <th>Эмоции</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color muladhara"></span>Муладхара</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color svadhisthana"></span>Свадхистана</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color manipura"></span>Манипура</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color anahata"></span>Анахата</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color vishuddha"></span>Вишудха</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color ajna"></span>Аджна</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td className="chakra-name"><span className="chakra-color sahasrara"></span>Сахасрара</td>
                    <td>5</td>
                    <td>19</td>
                    <td>6</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="result">
                    <td>Результат:</td>
                    <td>12</td>
                    <td>13</td>
                    <td>7</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="schema">
              <Image src={`/img/schema.svg`} width={640} height={581} alt="schema" />
            </div>
          </div>
        </div>
        <Tariffs />
      </div>
    </main>
  )
}

export default matrix