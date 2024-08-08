'use client'
import Image from "next/image"
import style from "./page.module.scss"
import Select from '@/UI/Select/Select'
import { useEffect, useRef, useState } from 'react'
import { cards } from '@/list/card.list'
import { us_number } from '@/list/us_number.list'
import { levels } from '@/list/level.list'
import { questions } from '@/list/question.list'
import Tariffs from '@/components/Tariffs/Tariffs'
import { link } from 'fs'

export default function Home() {
  const [select, setSelect] = useState('Женщина')
  const [selectTwo, setSelectTwo] = useState('Женщина')
  const [ActiveFAQ, setActiveFAQ] = useState(null)
  const [ActiveIndexCard, setActiveIndexCard] = useState(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const faqBlockRef = useRef<HTMLDivElement | null>(null)
  const MatrixBlockRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [FormOne, SetFormOne] = useState({
    name: '',
    date: '',
    touchedName: false,
    touchedDate: false
  })

  const [FormTwo, SetFormTwo] = useState({
    name: '',
    date: '',
    touchedName: false,
    touchedDate: false
  })

  const [FormThree, SetFormThree] = useState({
    name: '',
    date: '',
    touchedName: false,
    touchedDate: false
  })

  const [FormFour, SetFormFour] = useState({
    name: '',
    date: '',
    touchedName: false,
    touchedDate: false
  })



  const setRef = (el: HTMLDivElement | null, index: number) => {
    faqRefs.current[index] = el
  }

  const handleFAQClick = (index: any) => {
    setActiveFAQ(index === ActiveFAQ ? null : index)
  }

  const handleMouseEnter = (index: any) => {
    setActiveIndexCard(index)
  }

  const handleMouseLeave = () => {
    setActiveIndexCard(null)
  }

  useEffect(() => {
    faqRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.height = ActiveFAQ === index ? `${ref.scrollHeight}px` : '0px'
        ref.style.marginTop = ActiveFAQ === index ? `20px` : '0px'
      }
    })
  }, [ActiveFAQ])

  useEffect(() => {
    if (ActiveIndexCard !== null && cardRefs.current[ActiveIndexCard]) {
      cardRefs.current[ActiveIndexCard].style.height = `${cardRefs.current[ActiveIndexCard].scrollHeight}px`
    }
  }, [ActiveIndexCard])

  return (
    <main className="content">
      <div className={style.content_container}>
        <section className={style.content_reg} ref={MatrixBlockRef}>
          <div className={style.reg_content}>
            <div className={style.reg_title}>
              <h1>МАТРИЦА СУДЬБЫ</h1>
              <p>Глубокоя расшифровка вашей личности</p>
              <p>Рассчитайте бесплатно вашу матрицу судьбы, прямо сейчас, чтобы узнать себя на 100%</p>
            </div>
            <form action="" className={style.reg_form}>
              <div className={style.form_top}>
                <input type="text" placeholder='Введите ваше имя*' style={FormOne.name.trim() === '' && FormOne.touchedName ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormOne.name} onChange={(e) => SetFormOne({ ...FormOne, name: e.target.value })} required onBlur={() => SetFormOne({ ...FormOne, touchedName: true })} />
                <input type="text" placeholder='Введите дату рождения*' style={FormOne.date.trim() === '' && FormOne.touchedDate ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormOne.date} onChange={(e) => SetFormOne({ ...FormOne, date: e.target.value })} required onBlur={() => SetFormOne({ ...FormOne, touchedDate: true })} />
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
            <button className={style.about_button} onClick={() => faqBlockRef.current && faqBlockRef.current.scrollIntoView({ behavior: 'smooth' })} >Что такое?</button>
          </div>
        </section>
        <section className={style.content_cards}>
          <div className={style.cards_content}>
            <div className={style.cards_title}>
              <p>Базовые расшифровки бесплатны</p>
              <h2>ИЗУЧИТЕ <span style={{ color: 'rgb(115, 121, 176)' }}>СТРУКТУРУ</span> ЛИЧНОСТИ ПО ВСЕМ СФЕРАМ</h2>
            </div>
            <ul className={style.cards_grid}>
              {cards.map((card, index) => (
                <li className={style.card_structure} key={index} onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}>
                  <div className={style.card}>
                    <span>{card.title}</span>
                  </div>
                  {ActiveIndexCard === index && (
                    <div className={style.card_body} ref={(el) => {
                      cardRefs.current[index] = el
                    }}>
                      <h2>{card.title}</h2>
                      <p dangerouslySetInnerHTML={{ __html: card.text }} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className={style.cards_row}>
              <button className={style.cards_button} onClick={() => MatrixBlockRef.current && MatrixBlockRef.current.scrollIntoView({ behavior: 'smooth' })}>Рассчитать мою матрицу</button>
            </div>
          </div>
        </section>
        <section className={`${style.content_recognise} ${style.content_cards}`}>
          <div className={`${style.recognise_content}`}>
            <div className={`${style.recognise_title} ${style.cards_title}`}>
              <p>Ваша роль</p>
              <h2>ЕСЛИ ВЫ <span style={{ color: 'rgb(115, 121, 176)' }}>СЕБЯ УЗНАЛИ</span>, ТО МЫ СОЗДАЛИ ЭТОТ СЕРВИС ДЛЯ ВАС</h2>
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
              <h2>Вас посещали подобные мысли, задавали себе такие <span style={{ color: 'rgb(115, 121, 176)' }}>вопросы</span>?</h2>
            </div>
            <div className={style.questions_row}>
              <div className={style.questions_column}>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Почему я не ощущаю гармонию в своей жизни?</span>
                  </div>
                </div>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Как мне надоели постоянные скандалы! Когда все это прекратиться?</span>
                  </div>

                </div>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Живу чужими проблемами. Почему не хватает времени на свою личную жизнь?</span>
                  </div>

                </div>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Боюсь принимать решения? Как избавиться от этого страха?</span>
                  </div>

                </div>
              </div>
              <div className={style.questions_column}>
                <h3><p>Если ответ ДА, то</p><p> вы в правильном месте</p></h3>
              </div>
              <div className={style.questions_column}>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Почему я беспокоюсь о том, что скажут люди?</span>
                  </div>

                </div>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Где найти эмоционально близкого человека?</span>
                  </div>

                </div>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Надоел однообразный образ жизни? Можно ли вырваться из замкнутого круга?</span>
                  </div>

                </div>
                <div className={style.questions_block}>
                  <div className={style.questions_sub_block}>
                    <span>Как мне реализовать себя, гармонизировать тело и дух?</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${style.content_material} ${style.content_cards}`}>
          <div className={`${style.material_content} ${style.cards_content}`}>
            <div className={`${style.material_title} ${style.cards_title}`}>
              <p>После выбора тарифа, вы моментально</p>
              <h2>Получите <span style={{ color: 'rgb(115, 121, 176)' }}>бесценный материал</span>, чтобы познать себя, близких и клиентов</h2>
            </div>
            <div className={style.material_row}>
              <div className={style.material_column}>
                <div className={style.material_block}>
                  <div className={style.material_info}>
                    <h2 className={style.material_block_title}>РАСШИФРОВКА МАТРИЦЫ СУДЬБЫ:</h2>
                    <div className={style.material_text}>
                      <span>Персональная онлайн книга, созданная по анализу вашей личности. В нее входят подробные описания 12 основных сфер вашей жизни</span>
                    </div>
                    <div className={style.material_scope}>
                      <span>Объем 40-50 страниц</span>
                    </div>
                  </div>
                  <div className={style.material_block_number}>1</div>
                </div>
                <div className={style.material_block}>
                  <div className={style.material_info}>
                    <h2 className={style.material_block_title}>ПРОГНОЗ ПО ГОДАМ</h2>
                    <div className={style.material_text}>
                      <span>Подробное описание и анализ энергий которые будут влиять на вашу жизнь. Прогноз на 10 лет вперед</span>
                    </div>
                    <div className={style.material_scope}>
                      <span>Объем 12-15 страниц</span>
                    </div>
                  </div>
                  <div className={style.material_block_number}>2</div>
                </div>
                <div className={style.material_block}>
                  <div className={style.material_info}>
                    <h2 className={style.material_block_title}>МАТРИЦА СОВМЕСТИМОСТИ:</h2>
                    <div className={style.material_text}>
                      <span>Подробное описание и анализ двух партнеров, оценка отношений, потенциал пары по 8 критериям с рекомендациями</span>
                    </div>
                    <div className={style.material_scope}>
                      <span>Объем 12-15 страниц</span>
                    </div>
                  </div>
                  <div className={style.material_block_number}>3</div>
                </div>
              </div>
              <Image src={'/img/book.png'} width={1136} height={800} alt='book' />
            </div>
            <div style={{ marginTop: '100px' }} className={`${style.material_title} ${style.cards_title}`}>
              <p>С нами вы всегда в плюсе</p>
              <h2>Помимо материалов, вы <span style={{ color: 'rgb(115, 121, 176)' }}>получите</span></h2>
            </div>
            <div className={style.recognise_row}>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/img/gift.png'} width={120} height={120} alt="gift" />
                  <h3>ПОДАРКИ</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Рабочая тетрадь для практической проработки инсайтов.В нее входят:Чек листы, таблицы, упражнения, индивидуальные медитации</span>
                </div>
              </div>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/img/pazle.png'} width={120} height={120} alt="pazle" />
                  <h3>СТРУКТУРу</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Вся информация, интуитивно понятна и структурированна.Ее приятно и легко изучать.Описание делится на подробную часть и основные тезисы</span>
                </div>
              </div>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/img/bird.png'} width={120} height={120} alt="bird" />
                  <h3>КЭШБЭК</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>При оплате любого тарифа, вам всегда начисляются баллы.10% от стоимости.Вы можете их использовать для следующих покупок в нашем сервисе</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${style.content_forecast} ${style.content_reg}`}>
          <div className={`${style.forecast_content} ${style.reg_content}`}>
            <div className={`${style.forecast_title} ${style.reg_title}`}>
              <h1>Расчет прогноза на 10 лет</h1>
              <p>Глубокоя расшифровка вашей личности</p>
              <p>Узнайте на какие события обратить внимание в определенный год вашего рождения, что вас может ожидать, на что можно надеяться и чего следует опасаться</p>
            </div>
            <form action="" className={style.reg_form}>
              <div className={style.form_top}>
                <input type="text" placeholder='Введите ваше имя*' style={FormTwo.name.trim() === '' && FormTwo.touchedName ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormTwo.name} onChange={(e) => SetFormTwo({ ...FormTwo, name: e.target.value })} required onBlur={() => SetFormTwo({ ...FormTwo, touchedName: true })} />
                <input type="text" placeholder='Введите дату рождения*' style={FormTwo.date.trim() === '' && FormTwo.touchedDate ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormTwo.date} onChange={(e) => SetFormTwo({ ...FormTwo, date: e.target.value })} required onBlur={() => SetFormTwo({ ...FormTwo, touchedDate: true })} />
              </div>
              <div className={style.form_bottom}>
                <Select setSelect={setSelectTwo} select={selectTwo} />
                <button>Рассчитать</button>
              </div>
            </form>
          </div>
        </section>
        <section className={`${style.us_number} ${style.content_cards}`}>
          <div className={`${style.us_number_content} ${style.cards_content}`}>
            <div className={`${style.us_number_title} ${style.cards_title}`}>
              <p>Вместо тысячи слов. Данные мы обновляем ежемесячно</p>
              <h2>О НАШИХ ТРУДАХ В <span style={{ color: 'rgb(115, 121, 176)' }}>ЦИФРАХ</span></h2>
            </div>
            <div className={style.us_number_grid}>
              {us_number.map((number) => (
                <div className={style.us_number_block}>
                  <div className={style.us_number_number}>
                    <span>{number.number}</span>
                  </div>
                  <div className={style.us_number_text}>
                    <span>{number.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.cards_row}>
              <button className={style.cards_button} onClick={() => MatrixBlockRef.current && MatrixBlockRef.current.scrollIntoView({ behavior: 'smooth' })}>Рассчитать мою матрицу</button>
            </div>
          </div>
        </section>
        <section className={`${style.content_couple} ${style.content_reg}`}>
          <div className={`${style.couple_content} ${style.reg_content}`}>
            <div className={`${style.couple_title} ${style.reg_title}`}>
              <h1>Расчет совместимости</h1>
              <p>Глубокоя расшифровка для двоих</p>
              <p>Наш онлайн-калькулятор поможет оценить совместимость партнёров по Матрице судьбы, в результате вы получите расшифровку и руководство к действию</p>
            </div>
            <form action="" className={style.couple_form}>
              <div className={style.couple_form_row}>
                <div className={style.couple_form_sex}>
                  <div className={style.couple_form_title}>
                    <Image src={'/img/woman.svg'} width={50} height={50} alt="woman" />
                    <h3>Женщина</h3>
                  </div>
                  <input type="text" placeholder='Введите ваше имя*' style={FormThree.name.trim() === '' && FormThree.touchedName ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormThree.name} onChange={(e) => SetFormThree({ ...FormThree, name: e.target.value })} required onBlur={() => SetFormThree({ ...FormThree, touchedName: true })} />
                  <input type="text" placeholder='Введите дату рождения*' style={FormThree.date.trim() === '' && FormThree.touchedDate ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormThree.date} onChange={(e) => SetFormThree({ ...FormThree, date: e.target.value })} required onBlur={() => SetFormThree({ ...FormThree, touchedDate: true })} />
                </div>
                <div className={style.couple_form_sex}>
                  <div className={style.couple_form_title}>
                    <Image src={'/img/man.svg'} width={50} height={50} alt="man" />
                    <h3>мужчина</h3>
                  </div>
                  <input type="text" placeholder='Введите ваше имя*' style={FormFour.name.trim() === '' && FormFour.touchedName ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormFour.name} onChange={(e) => SetFormFour({ ...FormFour, name: e.target.value })} required onBlur={() => SetFormFour({ ...FormFour, touchedName: true })} />
                  <input type="text" placeholder='Введите дату рождения*' style={FormFour.date.trim() === '' && FormFour.touchedDate ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormFour.date} onChange={(e) => SetFormFour({ ...FormFour, date: e.target.value })} required onBlur={() => SetFormFour({ ...FormFour, touchedDate: true })} />
                </div>
              </div>
              <button className={style.couple_button}>Рассчитать</button>
            </form>
          </div>
        </section>
        <section className={`${style.content_level} ${style.content_cards}`}>
          <div className={`${style.level_content} ${style.cards_content}`}>
            <div className={`${style.level_title} ${style.cards_title}`}>
              <p>Изучение расшифровок своей матрицы даст вам</p>
              <h2>Выход на <span style={{ color: 'rgb(115, 121, 176)' }}>новый уровень</span> жизни через осознание и корректировку программ</h2>
            </div>
            <div className={style.level_grid}>
              {levels.map((level) => (
                <div className={style.level_block}>
                  <Image src={level.img} alt={level.img} width={70} height={70} style={{ width: '70px', height: '70px' }} />
                  <p>{level.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section ref={faqBlockRef} className={`${style.content_faq} ${style.content_cards}`}>
          <div className={`${style.faq_content} ${style.cards_content}`}>
            <div className={`${style.faq_title} ${style.cards_title}`}>
              <p>А еще всегда на связи служба заботы</p>
              <h2>Отвечаем на ваши самые частые <span style={{ color: 'rgb(115, 121, 176)' }}>вопросы</span></h2>
            </div>
            <div className={style.faq_column}>
              {questions.map((question, index) => (
                <div className={index === ActiveFAQ ? style.faq_block_active : style.faq_block}>
                  <div className={style.faq_block_title} onClick={() => handleFAQClick(index)}>
                    <h3>{question.title}</h3>
                    <div className={style.faq_img}>
                      <Image src={'/img/arrow.png'} alt={`arrow`} width={24} height={24} />
                    </div>
                  </div>
                  <div className={style.faq_text} ref={(el) => setRef(el, index)}>
                    <span>{question.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Tariffs MatrixBlockRef={MatrixBlockRef?.current} />
      </div>
    </main>
  )
}
