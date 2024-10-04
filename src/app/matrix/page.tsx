'use client'
import Tariffs from '@/components/Tariffs/Tariffs'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import style from './page.module.scss'
import './schema.scss'
import './destiny.scss'
import { ArcanaService } from '@/services/arcana.service'
import { ISchema } from '@/interfaces/Schema.interface'
import { IMatrix } from '@/interfaces/Matrix.inteface'
import { CalculateService } from '@/services/calculate.service'
import { IUser } from '@/interfaces/User.interface'
import OpenBLock from '../assets/OpenBlock.svg'
import React from 'react'


const matrix: FC = () => {
  const [points, setPoints] = useState<ISchema>()
  const [UserMatrix, setUserMatrix] = useState<IMatrix>()
  const [UserData, SetUserData] = useState()
  const [openIndex, setOpenIndex] = useState([12, 2, 7])
  const [User, SetUser] = useState<IUser>()

  const GetYearUser = (birthYear: string) => {
    function extractYear(dateString: string): number {
      const match = dateString.match(/\d{4}$/) // Ищем 4 цифры в конце строки
      return match ? parseInt(match[0], 10) : NaN
    }

    const birthYearNumber = extractYear(birthYear)
    const currentYear = new Date().getFullYear()
    return currentYear - birthYearNumber
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        sessionStorage.removeItem('forecast')
        const LocalUserData = sessionStorage.getItem('matrix')
        const token = sessionStorage.getItem('auth_token')
        if (LocalUserData) {
          const UserDataParse = JSON.parse(LocalUserData)
          setUserMatrix(UserDataParse)
          if (token) {
            const data = await CalculateService.CalculateFate(UserDataParse.Date, UserDataParse.Gender, UserDataParse.Name, token)
            if (!data) {
              window.location.href = '/#matrix'
            }
            if (data["paid_version"]) {
              setOpenIndex([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
            }
            const UserNotParse = localStorage.getItem('UserData')
            if (UserNotParse) {
              const UserParse = JSON.parse(UserNotParse)
              SetUserData(data)
              SetUser(UserParse)
            }
          }
          if (!token || token === null) {
            const data = await CalculateService.CalculateFate(UserDataParse.Date, UserDataParse.Gender, UserDataParse.Name)
            if (!data) {
              window.location.href = '/#matrix'
            }
            SetUserData(data)
          }
          const points = await ArcanaService.GenerateArcana(UserDataParse.Date, UserDataParse.Gender, UserDataParse.Name)
          if (!points) {
            window.location.href = '/#matrix'
          }
          setPoints(points)
        } else {
          window.location.href = '/#matrix'
        }
      } catch (error) {
        window.location.href = '/#matrix'
        sessionStorage.removeItem('matrix')
        alert("Произошла ошибка, пожалуйста попробуйте еще раз")
      }
    }

    fetchUserData()
  }, [])

  const ToggleOpenIndex = (index: number) => {
    if (openIndex.includes(index)) {
      setOpenIndex(openIndex.filter((i) => i !== index))
    } else {
      setOpenIndex([...openIndex, index])
    }
  }

  const RedirectTariffs = () => {
    const element = document.getElementById('tariffs')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //console.log(UserData && UserData)

  return (
    <main className="content">
      <div className="content_container">
        <div className={style.content_title}>
          <h1>Ваш персональный расчет <span>матрицы судьбы</span></h1>
        </div>
        <div className={style.content_user}>
          <div className={style.user_block}>
            <span>Имя: <b>{UserMatrix?.Name}</b></span>
          </div>
          <div className={style.user_block}>
            <span>Дата рождения: <b>{UserMatrix?.Date}</b></span>
          </div>
          <div className={style.user_block}>
            <span>Возраст: <b>{UserMatrix && UserMatrix.Date && GetYearUser(UserMatrix.Date)} лет</b></span>
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
                  <div className={style.table_body}>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(211, 70, 69)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(211, 70, 69)' }}>Муладхара</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4>Муладхар</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.C}</span>
                        <span>{points?.D}</span>
                        <span>{points?.K1}</span>
                      </div>
                    </div>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(255, 124, 3)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(255, 124, 3)' }}>Свадхистана</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4 style={{ color: 'rgb(255, 124, 3)' }}>Свадхистана</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>Надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.C1}</span>
                        <span>{points?.D1}</span>
                        <span>{points?.K2}</span>
                      </div>
                    </div>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(251, 201, 59)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(251, 201, 59)' }}>Манипура</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4 style={{ color: 'rgb(251, 201, 59)' }}>Манипура</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.X_2}</span>
                        <span>{points?.X}</span>
                        <span>{points?.K3}</span>
                      </div>
                    </div>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(124, 185, 105)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(124, 185, 105)' }}>Анахата</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4 style={{ color: 'rgb(124, 185, 105)' }}>Анахата</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>Сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.A3}</span>
                        <span>{points?.B3}</span>
                        <span>{points?.K4}</span>
                      </div>
                    </div>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(77, 185, 245)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(77, 185, 245)' }}>Вишудха</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4 style={{ color: 'rgb(77, 185, 245)' }}>Вишудха</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>Щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.A2}</span>
                        <span>{points?.B2}</span>
                        <span>{points?.K5}</span>
                      </div>
                    </div>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(17, 113, 203)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(17, 113, 203)' }}>Аджна</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4 style={{ color: 'rgb(17, 113, 203)' }}>Аджна</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>Затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.A1}</span>
                        <span>{points?.B1}</span>
                        <span>{points?.K6}</span>
                      </div>
                    </div>
                    <div className={style.chakra_row}>
                      <div className={style.chakra_name}>
                        <div style={{ backgroundColor: 'rgb(139, 70, 193)' }} className={style.chakra_dot}></div>
                        <span style={{ color: 'rgb(139, 70, 193)' }}>Сахасрара</span>
                        <div className={style.chakra_info}>
                          <Image src={'/image/info.svg'} width={24} height={24} alt="info" />
                          <div className={style.info_block}>
                            <div className={style.info_title}>
                              <h4 style={{ color: 'rgb(139, 70, 193)' }}>Сахасрара</h4>
                            </div>
                            <div className={style.info_text}>
                              <p>За что отвечает:</p>
                              <p>Головной мозг, волосы, верхняя часть черепа</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.chakra_numbers}>
                        <span>{points?.A}</span>
                        <span>{points?.B}</span>
                        <span>{points?.E}</span>
                      </div>
                    </div>
                  </div>
                  <div className={style.result_row}>
                    <span>Результат:</span>
                    <div className={style.result_row_right}>
                      <span>{points?.T2}</span>
                      <span>{points?.T1}</span>
                      <span>{points?.T3}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.schema}>
                <div className="X point">{points?.X}</div>
                <div className="Y point">{points?.Y}</div>
                <div className="E2 point">{points?.E2}</div>
                <div className="E1 point">{points?.E1}</div>
                <div className="E point">{points?.E}</div>
                <div className="B3 point">{points?.B3}</div>
                <div className="B2 point">{points?.B2}</div>
                <div className="B1 point">{points?.B1}</div>
                <div className="B point">{points?.B}</div>
                <div className="F2 point">{points?.F2}</div>
                <div className="F1 point">{points?.F1}</div>
                <div className="F point">{points?.F}</div>
                <div className="C2 point">{points?.C2}</div>
                <div className="C1 point">{points?.C1}</div>
                <div className="C point">{points?.C}</div>
                <div className="M point">{points?.M}</div>
                <div className="L point">{points?.L}</div>
                <div className="G4 point">{points?.G4}</div>
                <div className="G2 point">{points?.G2}</div>
                <div className="G1 point">{points?.G1}</div>
                <div className="G point">{points?.G}</div>
                <div className="D2 point">{points?.D2}</div>
                <div className="D1 point">{points?.D1}</div>
                <div className="D point">{points?.D}</div>
                <div className="H2 point">{points?.H2}</div>
                <div className="H1 point">{points?.H1}</div>
                <div className="H point">{points?.H}</div>
                <div className="A3 point">{points?.A3}</div>
                <div className="A2 point">{points?.A2}</div>
                <div className="A1 point">{points?.A1}</div>
                <div className="A point">{points?.A}</div>
                <Image src={`/image/Schema1.svg`} width={640} height={581} alt="schema" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.content_destiny}>
          <div className={style.destiny_container}>
            <div className={style.destiny_row}>
              <div className={style.destiny_block}>
                <div className={style.destiny_title}>
                  <h4>Личное предназначение (20-40 лет)</h4>
                </div>
                <div className={style.destiny_block_row}>
                  <span>Небо</span>
                  <span>Земля</span>
                </div>
                <div className={style.destiny_img}>
                  <div className="LN point-text">{points?.LN}</div>
                  <div className="LZ point-text">{points?.LZ}</div>
                  <div className="LP1 point-text">{points?.LP1}</div>
                  <Image src={`/image/destiny.png`} width={300} height={150} alt="destiny" />
                </div>
              </div>
              <div className={style.destiny_block}>
                <div className={style.destiny_title}>
                  <h4>СОЦИАЛЬНОЕ ПРЕДНАЗНАЧЕНИЕ (40-60 ЛЕТ)</h4>
                </div>
                <div className={style.destiny_block_row}>
                  <span>Муж</span>
                  <span>Жен</span>
                </div>
                <div className={style.destiny_img}>
                  <div className="LN point-text">{points?.LO}</div>
                  <div className="LZ point-text">{points?.LM}</div>
                  <div className="LP1 point-text">{points?.Y}</div>
                  <Image src={`/image/destiny.png`} width={300} height={150} alt="destiny" />
                </div>
              </div>
              <div className={style.destiny_block}>
                <div className={style.destiny_title}>
                  <h4>ДУХОВНОЕ ПРЕДНАЗНАЧЕНИЕ (ПОСЛЕ 60 ЛЕТ)</h4>
                </div>
                <div className={style.destiny_block_row}>
                  <span>Лич</span>
                  <span>Соц</span>
                </div>
                <div className={style.destiny_img}>
                  <div className="LN point-text">{points?.LP1_2}</div>
                  <div className="LZ point-text">{points?.Y_2}</div>
                  <div className="LP1 point-text">{points?.LP3}</div>
                  <Image src={`/image/destiny.png`} width={300} height={150} alt="destiny" />
                </div>
              </div>
              <div className={style.destiny_block}>
                <div className={style.destiny_title}>
                  <h4>РОДОВЫЕ ПРОГРАММЫ</h4>
                </div>
                <div className={style.destiny_block_column}>
                  <div className={style.destiny_block_column_row}>
                    <span>Муж</span>
                    <div className={style.destiny_block_column_circle}>
                      <span>{points?.E}</span>
                    </div>
                    <div className={style.destiny_block_column_circle}>
                      <span>{points?.G}</span>
                    </div>
                    <div className={style.destiny_block_column_circle}>
                      <span>{points?.X}</span>
                    </div>
                  </div>
                  <div className={style.destiny_block_column_row}>
                    <span>Жен</span>
                    <div className={style.destiny_block_column_circle}>
                      <span>{points?.F}</span>
                    </div>
                    <div className={style.destiny_block_column_circle}>
                      <span>{points?.H}</span>
                    </div>
                    <div className={style.destiny_block_column_circle}>
                      <span>{points?.X}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.content_spoiler}>
          <div className={style.spoiler_container}>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(12)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Личностные качества</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 12) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  <div className={style.block_plus}>
                    <h3>В позитиве</h3>
                    <span>{UserData && UserData["Личностные качества"]["В позитиве"]}</span>
                  </div>
                  <div className={style.block_minus}>
                    <h3>В негативе</h3>
                    <span>{UserData && UserData["Личностные качества"]["В негативе"]}</span>
                  </div>
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(1)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Таланты</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 1) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Таланты"] ? (
                    <>
                      <ul className={`${style.block_list}`}>
                        <li>{UserData && UserData["🔒 Таланты"]}</li>
                      </ul>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {UserData && UserData["paid_version"] === true && Object.keys(UserData["Таланты"]).map((key, index) => (
                        <div className={style.block_container_list}>
                          <h3>{UserData && Object.keys(UserData["Таланты"])[index]}</h3>
                          <ul className={`${style.block_list}`}>
                            <li>{UserData && UserData["Таланты"][Object.keys(UserData["Таланты"])[index]]}</li>
                          </ul>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(2)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Прошлая жизнь</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 2) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData?.["Прошлая жизнь"] && Object.keys(UserData["Прошлая жизнь"]).length > 0 ? (
                    <>
                      <div className={style.sub_block_title}>
                        <h4>{UserData && Object.keys(UserData["Прошлая жизнь"])[0].split(':')[0].trim()}: <span style={{ color: '#494d59' }}>{UserData && Object.keys(UserData["Прошлая жизнь"])[0].split(':')[1].trim()}</span></h4>
                      </div>
                      <div className={style.sub_block_text}>
                        <span>{UserData && UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]][Object.keys(UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]])[0]]}</span>
                        <span>{UserData && UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]][Object.keys(UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]])[1]]}</span>
                        <span>{UserData && UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]][Object.keys(UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]])[2]]}</span>
                      </div>
                    </>
                  ) :
                    <>
                      <div className={style.sub_block_title}>
                        <h4>{UserData && Object.keys(UserData["Прошлая жизнь"])[0].split(':')[0].trim()}: <span style={{ color: '#494d59' }}>{UserData && Object.keys(UserData["Прошлая жизнь"])[0].split(':')[1].trim()}</span></h4>
                      </div>
                      <div className={style.sub_block_text}>
                        <span>{UserData && UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]][Object.keys(UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]])[0]]}</span>
                        <span>{UserData && UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]][Object.keys(UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]])[1]]}</span>
                        <span>{UserData && UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]][Object.keys(UserData["Прошлая жизнь"][Object.keys(UserData["Прошлая жизнь"])[0]])[2]]}</span>
                      </div>
                    </>
                  }
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(3)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Здоровье</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 3) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.g20}`} style={{ padding: '0px' }}>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix1.svg`} width={30} height={30} alt='matrix1' />
                      <h3 style={{ color: '#1171cb' }}>Аджна</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечает за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Аджна - отвечают за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Аджна - отвечают за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Аджна - отвечают за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Аджна - отвечают за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Аджна - отвечают за затылочные и височные доли мозга, глаз, уши, нос, лицо, верхняя челюсть, зубы верхней челюсти, зрительный нерв, кора головного мозга.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix2.svg`} width={30} height={30} alt='matrix2' />
                      <h3 style={{ color: '#72b969' }}>Анахата</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечает за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Анахата - отвечают за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Анахата - отвечают за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Анахата - отвечают за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Анахата - отвечают за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Анахата - отвечают за сердце, кровеносная система, органы дыхания, легкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная зона спины, грудь.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix3.svg`} width={30} height={30} alt='matrix3' />
                      <h3 style={{ color: '#4db9f5' }}>Вишудха</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Вишудха - отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Вишудха - отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Вишудха - отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Вишудха - отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Вишудха - отвечают за щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, седьмой шейный позвонок, все шейные позвонки, нижняя челюсть, зубы нижней челюсти.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix4.svg`} width={30} height={30} alt='matrix4' />
                      <h3 style={{ color: '#fbc93b' }}>Манипура</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Манипура - отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Манипура - отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Манипура - отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Манипура - отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Манипура - отвечают за ЖКТ, органы брюшной полости, поджелудочная железа, селезёнка, печень, желчный пузырь, тонкий кишечник, центральная часть позвоночника.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix5.svg`} width={30} height={30} alt='matrix5' />
                      <h3 style={{ color: '#d34645' }}>Муладхара</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Муладхара - отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Муладхара - отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Муладхара - отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Муладхара - отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Муладхара - отвечают за Мочеполовая система, нижние конечности, толстый кишечник, копчик, крестец, ноги.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix6.svg`} width={30} height={30} alt='matrix6' />
                      <h3 style={{ color: '#d61e8c' }}>Сахасрара</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечают за головной мозг, волосы, верхняя часть черепа.</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Сахасрара - отвечают за головной мозг, волосы, верхняя часть черепа.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Сахасрара - отвечают за головной мозг, волосы, верхняя часть черепа.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Сахасрара - отвечают за головной мозг, волосы, верхняя часть черепа.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Сахасрара - отвечают за головной мозг, волосы, верхняя часть черепа.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Сахасрара - отвечают за головной мозг, волосы, верхняя часть черепа.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={style.block_health}>
                    <div className={style.health_title}>
                      <Image src={`/image/matrix7.svg`} width={30} height={30} alt='matrix7' />
                      <h3 style={{ color: '#ff7c03' }}>Свадхистана</h3>
                    </div>
                    <div className={style.health_desc}>
                      <span>Отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.</span>
                    </div>
                    <div className={style.health_text}>
                      <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] ? UserData["🔒 Здоровье"]['Свадхистана - отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.']["Описание цифр"] : UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Свадхистана - отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.']["Описание цифр"]}</span>
                    </div>
                    {UserData && UserData["paid_version"] === true && UserData["Здоровье"] && (
                      <>
                        <div className={style.health_problem}>
                          <h3>Проблемы со здоровьем</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Свадхистана - отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.']["Проблемы со здоровьем"]}</span>
                        </div>
                        <div className={style.health_reasons}>
                          <h3>Причины</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Свадхистана - отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.']["Причины"]}</span>
                        </div>
                        <div className={style.health_solution}>
                          <h3>Решение проблемы</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Здоровье"]['Свадхистана - отвечают за надпочечники, матка и яичники, почки, кишечник, предстательная железа у мужчин, поясничный район позвоночного столба.']["Решение проблемы"]}</span>
                        </div>
                      </>
                    )}
                  </div>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Здоровье"] && (
                    <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                      <span>Читать продолжение</span>
                    </div>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(4)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Предназначение</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 4) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Предназначение"] && (
                    <>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Предназначение"]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Предназначение"] && (
                    <>
                      {Object.keys(UserData["Предназначение"]).map((item, index) => (
                        <div className={style.block_purpose}>
                          <h3>{UserData && UserData["paid_version"] === true && Object.keys(UserData["Предназначение"])[index]}</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Предназначение"][Object.keys(UserData["Предназначение"])[index]]}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(5)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Испытания</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 5) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Испытания"] && (
                    <>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Испытания"]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Испытания"] && (
                    <>
                      {Object.keys(UserData["Испытания"]).map((item, index) => (
                        <div className={style.block_test}>
                          <h3>{Object.keys(UserData["Испытания"])[index]}</h3>
                          <span>{UserData && UserData["paid_version"] === true && UserData["Испытания"][Object.keys(UserData["Испытания"])[index]]}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(6)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Отношения и любовь</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 6) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Отношения и любовь"] && (
                    <>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Отношения и любовь"]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Отношения и любовь"] && (
                    <>
                      {Object.keys(UserData["Отношения и любовь"]).map((item, index) => (
                        <div className={style.block_relationship}>
                          <h3>{Object.keys(UserData["Отношения и любовь"])[index]}</h3>
                          <span>{UserData["Отношения и любовь"][Object.keys(UserData["Отношения и любовь"])[index]]}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(7)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Прогноз по годам</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>

              </div>
              <div style={{ display: openIndex.find((i) => i === 7) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div style={{ padding: '0px' }} className={style.forecast_sub_block}>
                  <div className={style.forecast_block}>
                    <div className={`${style.forecast_block_title}`}>
                      <h2>Суть года, основной мотив</h2>
                    </div>
                    <div className={style.block_plus}>
                      <h3>В плюсе</h3>
                      <span>{UserData && UserData["Прогноз по годам"]["Суть года, основной мотив. В плюсе."]}</span>
                    </div>
                    <div className={style.block_minus}>
                      <h3>В минусе</h3>
                      <span>{UserData && UserData["Прогноз по годам"]["Суть года, основной мотив. В минусе."]}</span>
                    </div>
                  </div>
                  <div className={style.forecast_block}>
                    <div className={style.forecast_block_title}>
                      <h2>Причины событий</h2>
                    </div>
                    <div className={style.block_plus}>
                      <h3>В плюсе</h3>
                      <span>{UserData && UserData["Прогноз по годам"]["Причины событий. В плюсе"]}</span>
                    </div>
                    <div className={style.block_minus}>
                      <h3>В минусе</h3>
                      <span>{UserData && UserData["Прогноз по годам"]["Причины событий. В минусе"]}</span>
                    </div>
                  </div>
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks} `}>
              <div onClick={() => ToggleOpenIndex(8)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Деньги</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 8) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Деньги"] && (
                    <>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Деньги"]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Деньги"] && (
                    <>
                      {Object.keys(UserData["Деньги"]).map((item, index) => (
                        <div className={style.block_money}>
                          <h3>{Object.keys(UserData["Деньги"])[index]}</h3>
                          <span>{UserData["Деньги"][Object.keys(UserData["Деньги"])[index]]}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(9)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Родители</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 9) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Родители"] && (
                    <>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Родители"]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Родители"] && (
                    <>
                      {Object.keys(UserData["Родители"]).map((item, index) => (
                        <>
                          <div className={style.block_father}>
                            <h3>{Object.keys(UserData["Родители"])[index]}</h3>
                            <span>{UserData["Родители"][Object.keys(UserData["Родители"])[index]]}</span>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(10)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Дети</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 10) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Дети"] && (
                    <>
                      <ul className={`${style.block_list} ${style.block_list_child}`}>
                        <li>{UserData && UserData["paid_version"] === false && UserData["🔒 Дети"]}</li>
                      </ul>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Дети"] && (
                    <>
                      <ul className={`${style.block_list} ${style.block_list_child}`}>
                        <li>{UserData && UserData["paid_version"] === true && UserData["Дети"]}</li>
                      </ul>
                    </>
                  )}
                </div>
              </div >
            </div>
            <div className={`${style.forecast_blocks}`}>
              <div onClick={() => ToggleOpenIndex(11)} className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>Руководство</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 11) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                <div className={`${style.forecast_sub_block} ${style.forecast_sub_block_full_background}`}>
                  {UserData && UserData["paid_version"] === false && UserData["🔒 Руководство"] && (
                    <>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData["paid_version"] === false && UserData["🔒 Руководство"]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </>
                  )}
                  {UserData && UserData["paid_version"] === true && UserData["Руководство"] && (
                    <div className={style.block_manual}>
                      <h3>Ответы</h3>
                      <span>{UserData["Руководство"]}</span>
                    </div>
                  )}
                </div>
              </div >
            </div>
          </div>
        </div>
        <Tariffs />
      </div>
    </main>
  )
}

export default matrix