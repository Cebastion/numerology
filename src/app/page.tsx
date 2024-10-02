'use client'
import Image from "next/image"
import style from "./page.module.scss"
import Select from '@/UI/Select/Select'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { cards } from '@/list/card.list'
import { us_number } from '@/list/us_number.list'
import { levels } from '@/list/level.list'
import { questions } from '@/list/question.list'
import { tariffs } from '@/list/tariff.list'
import { useRouter } from 'next/navigation'
import { IValidForecast } from '@/interfaces/Forecast.interface'
import { IValidCompatibility } from '@/interfaces/Compatibility.interface'
import { IValidMatrix } from '@/interfaces/Matrix.inteface'
import { ValidatorService } from '@/services/validator.service'

export default function Home() {
  const [selectMatrix, setSelectMatrix] = useState('Женщина')
  const [selectForecast, setSelectForecast] = useState('Женщина')
  const [ActiveFAQ, setActiveFAQ] = useState(null)
  const [ActiveIndexCard, setActiveIndexCard] = useState(null)
  const [ActiveBooleanCard, setActiveBooleanCard] = useState(false)
  const [DirtyForecast, SetDirtyForecast] = useState<IValidForecast>({})
  const [DirtyCompatibility, SetDirtyCompatibility] = useState<IValidCompatibility>({})
  const [DirtyMatrix, SetDirtyMatrix] = useState<IValidMatrix>({})
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const faqBlockRef = useRef<HTMLDivElement | null>(null)
  const MatrixBlockRef = useRef<HTMLDivElement | null>(null)
  const ForecastBlockRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const router = useRouter()

  const [FormMatrix, SetFormMatrix] = useState({
    Name: '',
    Date: '',
    Gender: ''
  })

  const [FormForecast, SetFormForecast] = useState({
    Name: '',
    Date: '',
    Gender: ''
  })

  const [FormCompatibility, SetFormCompatibility] = useState({
    WomanName: '',
    ManName: '',
    WomanDate: '',
    ManDate: '',
  })



  const setRef = (el: HTMLDivElement | null, index: number) => {
    faqRefs.current[index] = el
  }

  const handleFAQClick = (index: any) => {
    setActiveFAQ(index === ActiveFAQ ? null : index)
  }

  const handleMouseEnter = (index: any) => {
    setActiveBooleanCard(true)
    setActiveIndexCard(index)
  }

  const handleMouseLeave = () => {
    setActiveIndexCard(null)
  }

  const RedirectTariff = (id: number) => {
    router.push(`/tariff/${id}`)
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


  const RedirectMatrix = async (e: FormEvent) => {
    e.preventDefault()
    const NameError = ValidatorService.ValidName(FormMatrix.Name)
    const DateError = ValidatorService.ValidDate(FormMatrix.Date)

    SetDirtyMatrix({ Name: NameError, Date: DateError })

    if(!NameError && !DateError) {
      if(selectMatrix === 'Женщина') {
        FormMatrix.Gender = 'Ж'
      }
      if(selectMatrix === 'Мужчина') {
        FormMatrix.Gender = 'М'
      }

      FormMatrix.Name = FormMatrix.Name.charAt(0).toUpperCase() + FormMatrix.Name.slice(1).toLowerCase()

      localStorage.setItem('matrix', JSON.stringify(FormMatrix))
      router.push('/matrix')
    }

  }

  const RedirectForecast = async (e: FormEvent) => {
    e.preventDefault()

    const NameError = ValidatorService.ValidName(FormForecast.Name)
    const DateError = ValidatorService.ValidDate(FormForecast.Date)

    SetDirtyForecast({ Name: NameError, Date: DateError })

    if(!NameError && !DateError) {
      if(selectForecast === 'Женщина') {
        FormForecast.Gender = 'Ж'
      }
      if(selectForecast === 'Мужчина') {
        FormForecast.Gender = 'М'
      }

      FormForecast.Name = FormForecast.Name.charAt(0).toUpperCase() + FormForecast.Name.slice(1).toLowerCase()

      localStorage.setItem('forecast', JSON.stringify(FormForecast))
      router.push('/forecast')
    }

  }

  const RedirectCompatibility = async (e: FormEvent) => {
    e.preventDefault()

    const ManNameError = ValidatorService.ValidName(FormCompatibility.ManName)
    const ManDateError = ValidatorService.ValidDate(FormCompatibility.ManDate)
    const WomanNameError = ValidatorService.ValidName(FormCompatibility.WomanName)
    const WomanDateError = ValidatorService.ValidDate(FormCompatibility.WomanDate)

    SetDirtyCompatibility({ WomanName: WomanNameError, WomanDate: WomanDateError, ManName: ManNameError, ManDate: ManDateError })

    if(!WomanNameError && !WomanNameError && !ManNameError && !ManDateError) {
      console.log("Form submitted:", FormCompatibility)
      router.push('/compatibility')
    }

  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>, formName: string, fieldName: string) => {
    let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    
    // Добавляем точки после второй и пятой цифры
    if (value.length > 1) value = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 4) value = value.slice(0, 5) + '.' + value.slice(5, 9);
  
    // Обрезаем строку, чтобы она не превышала длину 10 символов
    if (value.length > 10) value = value.slice(0, 10);
  
    // Обновляем соответствующую форму
    if (formName === 'formMatrix') {
      SetFormMatrix({ ...FormMatrix, [fieldName]: value });
    } else if (formName === 'formForecast') {
      SetFormForecast({ ...FormForecast, [fieldName]: value });
    } else if (formName === 'formCompatibility') {
      SetFormCompatibility({ ...FormCompatibility, [fieldName]: value });
    }
  };

  return (
    <main className="content">
      <div className={style.content_container}>
        <section id='matrix' className={style.content_reg} ref={MatrixBlockRef}>
          <div className={style.reg_content}>
            <div className={style.reg_title}>
              <h1>МАТРИЦА СУДЬБЫ</h1>
              <p>Глубокая расшифровка вашей личности</p>
              <p>Рассчитайте бесплатно вашу матрицу судьбы, прямо сейчас, чтобы узнать себя на 100%</p>
            </div>
            <form onSubmit={RedirectMatrix} className={style.reg_form}>
              <div className={style.form_top}>
                <input type="text" placeholder='Введите ваше имя*' style={DirtyMatrix.Name ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormMatrix.Name} onChange={(e) => SetFormMatrix({ ...FormMatrix, Name: e.target.value })}/>
                <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyMatrix.Date ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormMatrix.Date} onChange={(e) => handleDateChange(e, 'formMatrix', 'Date')} />
              </div>
              <div className={style.form_bottom}>
                <Select setSelect={setSelectMatrix} select={selectMatrix} />
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
              <h2>ИЗУЧИТЕ <span style={{ color: 'rgb(140, 151, 251)' }}>СТРУКТУРУ</span> ЛИЧНОСТИ ПО ВСЕМ СФЕРАМ</h2>
            </div>
            <ul className={style.cards_grid}>
              {cards.map((card, index) => (
                <li className={style.card_structure} key={index} onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}>
                  <div className={style.card}>
                    <span>{card.title}</span>
                  </div>
                  {ActiveIndexCard === index && ActiveBooleanCard && (
                    <div className={style.card_body} ref={(el) => {
                      cardRefs.current[index] = el
                    }}>
                      <h2>{card.title}</h2>
                      <p onMouseEnter={() => setActiveBooleanCard(false)} dangerouslySetInnerHTML={{ __html: card.text }} />
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
              <h2>ЕСЛИ ВЫ <span style={{ color: 'rgb(140, 151, 251)' }}>СЕБЯ УЗНАЛИ</span>, ТО МЫ СОЗДАЛИ ЭТОТ СЕРВИС ДЛЯ ВАС</h2>
            </div>
            <div className={style.recognise_row}>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/image/stone1.png'} width={120} height={120} alt="stone" />
                  <h3>Разведчик</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Система помогает астрологам, нумерологам обслуживать клиентов, а психологи определяют <b>психотипы личности.</b></span>
                </div>
              </div>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/image/stone2.png'} width={120} height={120} alt="stone" />
                  <h3>Осознанный</h3>
                </div>
                <div className={style.recognise_text}>
                  <span><b>Матрица судьбы онлайн с расшифровкой</b> в вашем случае – удобный и простой способ узнать о себе как можно больше.</span>
                </div>
              </div>
              <div className={style.recognise_block}>
                <div className={style.recognise_block_title}>
                  <Image src={'/image/stone3.png'} width={120} height={120} alt="stone" />
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
              <h2>Вас посещали подобные мысли, задавали себе такие <span style={{ color: 'rgb(140, 151, 251)' }}>вопросы</span>?</h2>
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
              <div className={`${style.questions_column} ${style.girl_column}`}>
                <h3><p>Если ответ ДА, то</p><p> вы в правильном месте</p></h3>
                <img src="/image/girl.png" alt="girl" />
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
              <h2>Получите <span style={{ color: 'rgb(140, 151, 251)' }}>бесценный материал</span>, чтобы познать себя, близких и клиентов</h2>
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
              <Image src={'/image/book.png'} width={1136} height={800} alt='book' />
            </div>
            <div className={`${style.material_title} ${style.cards_title}`}>
              <p>С нами вы всегда в плюсе</p>
              <h2>Помимо материалов, вы <span style={{ color: 'rgb(140, 151, 251)' }}>получите</span></h2>
            </div>
            <div className={style.recognise_row}>
              <div className={`${style.recognise_block} ${style.recognise_block_material}`}>
                <div className={style.recognise_block_title}>
                  <Image src={'/image/gift.png'} width={120} height={120} alt="gift" />
                  <h3>ПОДАРКИ</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Рабочая тетрадь для практической проработки инсайтов.В нее входят:Чек листы, таблицы, упражнения, индивидуальные медитации</span>
                </div>
              </div>
              <div className={`${style.recognise_block} ${style.recognise_block_material}`}>
                <div className={style.recognise_block_title}>
                  <Image src={'/image/pazle.png'} width={120} height={120} alt="pazle" />
                  <h3>СТРУКТУРу</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>Вся информация, интуитивно понятна и структурированна.Ее приятно и легко изучать.Описание делится на подробную часть и основные тезисы</span>
                </div>
              </div>
              <div className={`${style.recognise_block} ${style.recognise_block_material}`}>
                <div className={style.recognise_block_title}>
                  <Image src={'/image/bird.png'} width={120} height={120} alt="bird" />
                  <h3>КЭШБЭК</h3>
                </div>
                <div className={style.recognise_text}>
                  <span>При оплате любого тарифа, вам всегда начисляются баллы.10% от стоимости.Вы можете их использовать для следующих покупок в нашем сервисе</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='forecast' ref={ForecastBlockRef} className={`${style.content_forecast} ${style.content_reg}`}>
          <div className={`${style.forecast_content} ${style.reg_content}`}>
            <div className={`${style.forecast_title} ${style.reg_title}`}>
              <h1>Расчет прогноза на 10 лет</h1>
              <p>Глубокоя расшифровка вашей личности</p>
              <p>Узнайте на какие события обратить внимание в определенный год вашего рождения, что вас может ожидать, на что можно надеяться и чего следует опасаться</p>
            </div>
            <form onSubmit={RedirectForecast} className={`${style.reg_form} ${style.forecast_form}`}>
              <div className={style.form_top}>
                <input type="text" placeholder='Введите ваше имя*' style={DirtyForecast.Name ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormForecast.Name} onChange={(e) => SetFormForecast({ ...FormForecast, Name: e.target.value })} />
                <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyForecast.Date ? {
                  boxSizing: 'border-box',
                  border: '2px solid rgb(251, 140, 140)',
                  borderRadius: '100px',
                  background: 'rgb(255, 255, 255)'
                } : undefined} value={FormForecast.Date} onChange={(e) => handleDateChange(e, 'formForecast', 'Date')} />
              </div>
              <div className={style.form_bottom}>
                <Select setSelect={setSelectForecast} select={selectForecast} />
                <button>Рассчитать</button>
              </div>
            </form>
          </div>
        </section>
        <section className={`${style.us_number} ${style.content_cards}`}>
          <div className={`${style.us_number_content} ${style.cards_content}`}>
            <div className={`${style.us_number_title} ${style.cards_title}`}>
              <p>Вместо тысячи слов. Данные мы обновляем ежемесячно</p>
              <h2>О НАШИХ ТРУДАХ В <span style={{ color: 'rgb(140, 151, 251)' }}>ЦИФРАХ</span></h2>
            </div>
            <div className={style.us_number_grid}>
              {us_number.map((number, index) => (
                <div className={style.us_number_block} key={index}>
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
        <section id='compatibility' className={`${style.content_couple} ${style.content_reg}`}>
          <div className={`${style.couple_content} ${style.reg_content}`}>
            <div className={`${style.couple_title} ${style.reg_title}`}>
              <h1>Расчет совместимости</h1>
              <p>Глубокоя расшифровка для двоих</p>
              <p>Наш онлайн-калькулятор поможет оценить совместимость партнёров по Матрице судьбы, в результате вы получите расшифровку и руководство к действию</p>
            </div>
            <form onSubmit={RedirectCompatibility} className={style.couple_form}>
              <div className={style.couple_form_row}>
                <div className={style.couple_form_sex}>
                  <div className={style.couple_form_title}>
                    <Image src={'/image/woman.svg'} width={50} height={50} alt="woman" />
                    <h3>Женщина</h3>
                  </div>
                  <input type="text" placeholder='Введите ваше имя*' style={DirtyCompatibility.WomanName ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormCompatibility.WomanName} onChange={(e) => SetFormCompatibility({ ...FormCompatibility, WomanName: e.target.value })} />
                  <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyCompatibility.WomanDate ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormCompatibility.WomanDate} onChange={(e) => handleDateChange(e, 'formCompatibility', 'WomanDate')} />
                </div>
                <div className={style.couple_form_sex}>
                  <div className={style.couple_form_title}>
                    <Image src={'/image/man.svg'} width={50} height={50} alt="man" />
                    <h3>мужчина</h3>
                  </div>
                  <input type="text" placeholder='Введите ваше имя*' style={DirtyCompatibility.ManName ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormCompatibility.ManName} onChange={(e) => SetFormCompatibility({ ...FormCompatibility, ManName: e.target.value })} />
                  <input pattern="\d{2}\.\d{2}\.\d{4}" type="text" placeholder='Введите дату рождения*' style={DirtyCompatibility.ManDate ? {
                    boxSizing: 'border-box',
                    border: '2px solid rgb(251, 140, 140)',
                    borderRadius: '100px',
                    background: 'rgb(255, 255, 255)'
                  } : undefined} value={FormCompatibility.ManDate} onChange={(e) => handleDateChange(e, 'formCompatibility', 'ManDate')} />
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
              <h2>Выход на <span style={{ color: 'rgb(140, 151, 251)' }}>новый уровень</span> жизни через осознание и корректировку программ</h2>
            </div>
            <div className={style.level_grid}>
              {levels.map((level, index) => (
                <div className={style.level_block} key={index}>
                  <Image src={level.img} alt={level.img} width={70} height={70} style={{ maxWidth: '70px', maxHeight: '70px', width: '100%', height: '100%' }} />
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
              <h2>Отвечаем на ваши самые частые <span style={{ color: 'rgb(140, 151, 251)' }}>вопросы</span></h2>
            </div>
            <div className={style.faq_column}>
              {questions.map((question, index) => (
                <div className={index === ActiveFAQ ? style.faq_block_active : style.faq_block} key={index}>
                  <div className={style.faq_block_title} onClick={() => handleFAQClick(index)}>
                    <h3>{question.title}</h3>
                    <div className={style.faq_img}>
                      <Image src={'/image/arrow.png'} alt={`arrow`} width={24} height={24} />
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
        <section id='tariff' className={style.content_tariffs}>
          <div className={style.tariffs_content}>
            <div className={style.tariffs_title}>
              <p>Отправим на почту или в личный кабинет</p>
              <h2>ВЫБЕРИТЕ <span style={{ color: 'rgb(140, 151, 251)' }}>ТАРИФ</span> И ПОЛУЧИТЕ ВАШИ ПОЛНЫЕ РАСШИФРОВКИ</h2>
            </div>
            <div className={style.tariffs_list}>
              {tariffs.map((tariff, index) => (
                <div className={style.tariffs_block} key={index}>
                  <h2 className={style.tariffs_block_title} dangerouslySetInnerHTML={{ __html: tariff.title }} />
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
                    <button onClick={() => {
                      if(tariff.id === 1) {
                        MatrixBlockRef.current?.scrollIntoView({ behavior: 'smooth' })
                      } else if(tariff.id === 2) {
                        ForecastBlockRef.current?.scrollIntoView({ behavior: 'smooth' })
                      } else {
                        MatrixBlockRef.current?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}>Выбрать</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.tariffs_row}>
              <button className={style.tariffs_row_button} onClick={() => MatrixBlockRef.current && MatrixBlockRef.current.scrollIntoView({ behavior: 'smooth' })}>Рассчитать мою матрицу</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
