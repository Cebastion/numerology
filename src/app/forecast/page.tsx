'use client'
import { FC, useEffect, useState } from 'react'
import style from './page.module.scss'
import { CalculateService } from '@/services/calculate.service'
import Image from 'next/image'
import { IMatrix } from '@/interfaces/Matrix.inteface'
import OpenBLock from '../assets/OpenBlock.svg'
import Tariffs from '@/components/Tariffs/Tariffs'
import React from 'react'

const page: FC = () => {
  const [UserData, SetUserData] = useState()
  const [UserInfo, SetUserInfo] = useState<IMatrix>()
  const [openIndex, SetOpenIndex] = useState([0])

  useEffect(() => {
    const fetchUserData = async () => {
      sessionStorage.removeItem('matrix')
      const UserData = sessionStorage.getItem('forecast')
      try {
        if (UserData) {
          const UserDataParse = JSON.parse(UserData)
          const token = sessionStorage.getItem('auth_token')
          SetUserInfo(UserDataParse)
          if (token) {
            const data = await CalculateService.CalculateYears(UserDataParse.Date, UserDataParse.Gender, UserDataParse.Name, token)
            if (data["paid_version"]) {
              SetOpenIndex([12, 1, 2, 3, 4, 5])
            }
            console.log(data)
            SetUserData(data)
          } else {
            const data = await CalculateService.CalculateYears(UserDataParse.Date, UserDataParse.Gender, UserDataParse.Name)
            console.log(data)
            SetUserData(data)
          }
        } else {
          window.location.href = '/#forecast'
        }
      } catch (error) {
        window.location.href = '/#forecast'
        sessionStorage.removeItem('forecast')
        alert("Произошла ошибка, пожалуйста попробуйте еще раз")
      }
    }

    fetchUserData()
  }, [])

  const ToggleOpenIndex = (index: number) => {
    if (openIndex.includes(index)) {
      SetOpenIndex(openIndex.filter((i) => i !== index))
    } else {
      SetOpenIndex([...openIndex, index])
    }
  }

  const GetYearUser = (birthYear: string) => {
    function extractYear(dateString: string): number {
      const match = dateString.match(/\d{4}$/) // Ищем 4 цифры в конце строки
      return match ? parseInt(match[0], 10) : NaN
    }

    const birthYearNumber = extractYear(birthYear)
    const currentYear = new Date().getFullYear()
    return currentYear - birthYearNumber
  }


  const RedirectTariffs = () => {
    const element = document.getElementById('tariffs')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  console.log(UserData)
  console.log(UserData && UserData[Object.keys(UserData)[1]]["Суть года, основной мотив"]["В плюсе"])

  return (
    <div className={style.content}>
      <div className="content__container">
        <div className={style.content_title}>
          <h1>ВАШ ПЕРСОНАЛЬНЫЙ <span>ПРОГНОЗ НА 10 ЛЕТ</span></h1>
        </div>
        <div className={style.content_user}>
          <div className={style.user_block}>
            <span>Имя: <b>{UserInfo?.Name}</b></span>
          </div>
          <div className={style.user_block}>
            <span>Дата рождения: <b>{UserInfo?.Date}</b></span>
          </div>
          <div className={style.user_block}>
            <span>Возраст: <b>{UserInfo && GetYearUser(UserInfo?.Date)} лет</b></span>
          </div>
        </div>
        <div className={style.content_forecast}>
          <div className={style.forecast_title}>
            <h2>{UserData && UserData["paid_version"] && 'Бесплатный'} прогноз на <span>{new Date().getFullYear()} - {new Date().getFullYear() + 7}</span></h2>
          </div>
          <div className={style.forecast_column}>
            <div className={style.forecast_blocks}>
              <div className={style.forecast_block}>
                <div className={style.forecast_block_title_age}>
                  <h2>{UserData && Object.keys(UserData)[1]}</h2>
                </div>
                <div className={style.forecast_block_title}>
                  <h2>Суть года, основной мотив</h2>
                </div>
                <div className={style.block_plus}>
                  <h3>В плюсе</h3>
                  <span>{UserData && UserData[Object.keys(UserData)[1]]["Суть года, основной мотив"]["В плюсе"]}</span>
                </div>
                <div className={style.block_minus}>
                  <h3>В минусе</h3>
                  <span>{UserData && UserData[Object.keys(UserData)[1]]["Суть года, основной мотив"]["В минусе"]}</span>
                </div>
              </div>
              <div className={style.forecast_block}>
                <div className={style.forecast_block_title}>
                  <h2>Причины событий</h2>
                </div>
                <div className={style.block_plus}>
                  <h3>В плюсе</h3>
                  <span>{UserData && UserData[Object.keys(UserData)[1]]["Причины событий"]["В плюсе"]}</span>
                </div>
                <div className={style.block_minus}>
                  <h3>В минусе</h3>
                  <span>{UserData && UserData[Object.keys(UserData)[1]]["Причины событий"]["В минусе"]}</span>
                </div>
              </div>
            </div>
            <div className={`${style.forecast_blocks} ${UserData && UserData["paid_version"] ? '' : style.forecast_block_half}`} onClick={() => ToggleOpenIndex(12)}>
              <div className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>{new Date().getFullYear() + 1} - {new Date().getFullYear() + 2}</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 12) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                {UserData && !UserData["paid_version"] && (
                  <div className={style.forecast_sub_block}>
                    <div className={style.forecast_block}>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData[Object.keys(UserData)[2]]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </div>
                  </div>
                )}
                {UserData && UserData["paid_version"] && (
                  <>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Суть года, основной мотив</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[2]]["Суть года, основной мотив"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[2]]["Суть года, основной мотив"]["В минусе"]}</span>
                      </div>
                    </div>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Причины событий</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[2]]["Причины событий"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[2]]["Причины событий"]["В минусе"]}</span>
                      </div>
                    </div>
                  </>
                )}
              </div >
            </div>
            <div className={`${style.forecast_blocks} ${UserData && UserData["paid_version"] ? '' : style.forecast_block_half}`} onClick={() => ToggleOpenIndex(1)}>
              <div className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>{new Date().getFullYear() + 2} - {new Date().getFullYear() + 3}</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 1) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                {UserData && !UserData["paid_version"] && (
                  <div className={style.forecast_sub_block}>
                    <div className={style.forecast_block}>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData[Object.keys(UserData)[3]]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </div>
                  </div>
                )}
                {UserData && UserData["paid_version"] && (
                  <>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Суть года, основной мотив</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[3]]["Суть года, основной мотив"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[3]]["Суть года, основной мотив"]["В минусе"]}</span>
                      </div>
                    </div>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Причины событий</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[3]]["Причины событий"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[3]]["Причины событий"]["В минусе"]}</span>
                      </div>
                    </div>
                  </>
                )}
              </div >
            </div>
            <div className={`${style.forecast_blocks} ${UserData && UserData["paid_version"] ? '' : style.forecast_block_half}`} onClick={() => ToggleOpenIndex(2)}>
              <div className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>{new Date().getFullYear() + 4}</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 2) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                {UserData && !UserData["paid_version"] && (
                  <div className={style.forecast_sub_block}>
                    <div className={style.forecast_block}>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData[Object.keys(UserData)[4]]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </div>
                  </div>
                )}
                {UserData && UserData["paid_version"] && (
                  <>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Суть года, основной мотив</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[4]]["Суть года, основной мотив"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[4]]["Суть года, основной мотив"]["В минусе"]}</span>
                      </div>
                    </div>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Причины событий</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[4]]["Причины событий"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[4]]["Причины событий"]["В минусе"]}</span>
                      </div>
                    </div>
                  </>
                )}
              </div >
            </div>
            <div className={`${style.forecast_blocks} ${UserData && UserData["paid_version"] ? '' : style.forecast_block_half}`} onClick={() => ToggleOpenIndex(3)}>
              <div className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>{new Date().getFullYear() + 4} - {new Date().getFullYear() + 5}</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 3) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                {UserData && !UserData["paid_version"] && (
                  <div className={style.forecast_sub_block}>
                    <div className={style.forecast_block}>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData[Object.keys(UserData)[5]]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </div>
                  </div>
                )}
                {UserData && UserData["paid_version"] && (
                  <>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Суть года, основной мотив</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[5]]["Суть года, основной мотив"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[5]]["Суть года, основной мотив"]["В минусе"]}</span>
                      </div>
                    </div>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Причины событий</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[5]]["Причины событий"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[5]]["Причины событий"]["В минусе"]}</span>
                      </div>
                    </div>
                  </>
                )}
              </div >
            </div>
            <div className={`${style.forecast_blocks} ${UserData && UserData["paid_version"] ? '' : style.forecast_block_half}`} onClick={() => ToggleOpenIndex(4)}>
              <div className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>{new Date().getFullYear() + 5} - {new Date().getFullYear() + 6}</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 4) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                {UserData && !UserData["paid_version"] && (
                  <div className={style.forecast_sub_block}>
                    <div className={style.forecast_block}>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData[Object.keys(UserData)[6]]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </div>
                  </div>
                )}
                {UserData && UserData["paid_version"] && (
                  <>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Суть года, основной мотив</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[6]]["Суть года, основной мотив"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[6]]["Суть года, основной мотив"]["В минусе"]}</span>
                      </div>
                    </div>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Причины событий</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[6]]["Причины событий"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[6]]["Причины событий"]["В минусе"]}</span>
                      </div>
                    </div>
                  </>
                )}
              </div >
            </div>
            {/* <div className={`${style.forecast_blocks} ${UserData && UserData["paid_version"] ? '' : style.forecast_block_half}`} onClick={() => ToggleOpenIndex(5)}>
              <div className={style.forecast_info}>
                <div className={style.forecast_age}>
                  <span>{new Date().getFullYear() + 6} - {new Date().getFullYear() + 7}</span>
                </div>
                <div className={`${style.forecast_status} ${style.forecast_status_open}`}>
                  <span>Блок открыт</span>
                  <Image src={OpenBLock} width={24} height={24} alt='open' />
                </div>
              </div>
              <div style={{ display: openIndex.find((i) => i === 5) ? 'flex' : 'none' }} className={`${style.forecast_block_column}`}>
                {UserData && !UserData["paid_version"] && (
                  <div className={style.forecast_sub_block}>
                    <div className={style.forecast_block}>
                      <div className={style.block_plus}>
                        <span>{UserData && UserData[Object.keys(UserData)[7]]}</span>
                      </div>
                      <div className={style.block_continue} onClick={() => RedirectTariffs()}>
                        <span>Читать продолжение</span>
                      </div>
                    </div>
                  </div>
                )}
                {UserData && UserData["paid_version"] && (
                  <>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Суть года, основной мотив</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[7]]["Суть года, основной мотив"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[7]]["Суть года, основной мотив"]["В минусе"]}</span>
                      </div>
                    </div>
                    <div className={style.forecast_block}>
                      <div className={style.forecast_block_title}>
                        <h2>Причины событий</h2>
                      </div>
                      <div className={style.block_plus}>
                        <h3>В плюсе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[7]]["Причины событий"]["В плюсе"]}</span>
                      </div>
                      <div className={style.block_minus}>
                        <h3>В минусе</h3>
                        <span>{UserData && UserData[Object.keys(UserData)[7]]["Причины событий"]["В минусе"]}</span>
                      </div>
                    </div>
                  </>
                )}
              </div >
            </div> */}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Tariffs />
      </div>
    </div>
  )
}

export default page