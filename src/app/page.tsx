'use client'
import Image from "next/image"
import style from "./page.module.scss"
import Select from '@/UI/Select/Select'
import { useState } from 'react'
import { cards } from '@/list/card.list'

export default function Home() {
  const [select, setSelect] = useState(null)
  const [ActiveCard, setActiveCard] = useState(null)

  const handleCardClick = (index: any) => {
    setActiveCard(index === ActiveCard ? null : index)
  }

  return (
    <main className="content">
      <div className={style.content_container}>
        <section className={style.content_reg}>
          <div className={style.reg_content}>
            <div className={style.reg_title}>
              <h1>МАТРИЦА СУДЬБЫ</h1>
              <p>Глубокоя расшифровка вашей личности</p>
              <p>Рассчитайте бесплатно вашу матрицу судьбы, прямо сейчас, чтобы узнать себя на 100%</p>
            </div>
            <form action="" className={style.reg_form}>
              <div className={style.form_top}>
                <input type="text" placeholder='Введите ваше имя*' />
                <input type="text" placeholder='Введите дату рождения*' />
              </div>
              <div className={style.form_bottom}>
                <Select setSelect={setSelect} select={select} />
                <button>Рассчитать мою матрицу</button>
              </div>
            </form>
          </div>
        </section>
        <section className={style.content_about}>
          <div className={style.about_content}>
            <div className={style.about_title}>
              <p>Подробнее о матрице</p>
              <h2>На какие вопросы дает ответы Матрица судьбы?</h2>
            </div>
            <div className={style.about_text}>
              <span>Расчет матрицы выполняется по дате рождения с помощью онлайн-калькулятора, вы узнаете, зачем пришли в этот мир, какие качества необходимо развивать. Вам даже не потребуется помощь нумеролога. Персональный анализ раскрывает структуру личности человека, можно выйти на новый уровень во всех сферах жизни, выявить слабые места и раскрыть свой потенциал в работе или творчестве.</span>
            </div>
            <button className={style.about_button}>Что такое?</button>
          </div>
        </section>
        <section className={style.content_cards}>
          <div className={style.cards_content}>
            <div className={style.cards_title}>
              <p>Базовые расшифровки бесплатны</p>
              <h2>Структурный анализ личности в самых важных сферах</h2>
            </div>
            <div className={style.cards_grid}>
              {cards.map((card, index) => (
                <div className={style.card} onClick={() => handleCardClick(index)}>
                  <span>{card.title}</span>
                  {ActiveCard !== index ? null : (
                    <div className={style.card_body}>
                      <h2>{card.title}</h2>
                      <p dangerouslySetInnerHTML={{ __html: card.text }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={style.cards_row}>
              <button className={style.cards_button}>Рассчитать мою матрицу</button>
            </div>
          </div>
        </section>
        <section className={`${style.content_recognise} ${style.content_cards}`}>
          <div className={`${style.recognise_content}`}>
            <div className={`${style.recognise_title} ${style.cards_title}`}>
              <p>Ваша роль</p>
              <h2>ЕСЛИ ВЫ СЕБЯ УЗНАЛИ, ТО МЫ СОЗДАЛИ ЭТОТ СЕРВИС ДЛЯ ВАС</h2>
            </div>
            <div className={style.recognise_row}>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/img/stone1.png'} width={120} height={120} alt="stone" />
                  <h3>Разведчик</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Система помогает астрологам, нумерологам обслуживать клиентов, а психологи определяют <b>психотипы личности.</b></span>
                </div>
              </div>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/img/stone2.png'} width={120} height={120} alt="stone" />
                  <h3>Осознанный</h3>
                </div>
                <div className={style.recognise_text}>
                  <span><b>Матрица судьбы онлайн с расшифровкой</b> в вашем случае – удобный и простой способ узнать о себе как можно больше.</span>
                </div>
              </div>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/img/stone3.png'} width={120} height={120} alt="stone" />
                  <h3>Эксперт</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Интересуетесь точной системой анализа личности и пытаетесь выйти на экспертный уровень</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${style.content_questions} ${style.content_cards}`}>
          <div className={`${style.questions_content} ${style.cards_content}`}>
            <div className={`${style.questions_title} ${style.cards_title}`}>
              <p>Спросите себя</p>
              <h2>Вас посещали подобные мысли, задавали себе такие вопросы?</h2>
            </div>
            <div className={style.questions_row}>
              <div className={style.questions_column}>
                <div className={style.questions_block}>
                  <span>Почему я не ощущаю гармонию в своей жизни?</span>
                </div>
                <div className={style.questions_block}>
                  <span>Как мне надоели постоянные скандалы! Когда все это прекратиться?</span>
                </div>
                <div className={style.questions_block}>
                  <span>Живу чужими проблемами. Почему не хватает времени на свою личную жизнь?</span>
                </div>
                <div className={style.questions_block}>
                  <span>Боюсь принимать решения? Как избавиться от этого страха?</span>
                </div>
              </div>
              <div className={style.questions_column}>
                <h3><p>Если ответ ДА, то</p><p> вы в правильном месте</p></h3>
              </div>
              <div className={style.questions_column}>
                <div className={style.questions_block}>
                  <span>Почему я беспокоюсь о том, что скажут люди?</span>
                </div>
                <div className={style.questions_block}>
                  <span>Где найти эмоционально близкого человека?</span>
                </div>
                <div className={style.questions_block}>
                  <span>Надоел однообразный образ жизни? Можно ли вырваться из замкнутого круга?</span>
                </div>
                <div className={style.questions_block}>
                  <span>Как мне реализовать себя, гармонизировать тело и дух?</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content_material">
          <div className="material_content">
            <div className="material_title">
              <p>После выбора тарифа, вы моментально</p>
              <h2>Получите бесценный материал, чтобы познать себя, близких и клиентов</h2>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
