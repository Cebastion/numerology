'use client'
import { FC, useEffect, useState } from 'react'
import style from './Orders.module.scss'
import Image from 'next/image'
import { IManyUserHistory, IOneUserHistory } from '@/interfaces/UserHistory.interface'
import { UserService } from '@/services/user.service'
import Link from 'next/link'

const Orders: FC = () => {
  const [HistoryOrders, SetHistoryOrders] = useState<IManyUserHistory>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function GetHistoryOrders() {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        try {
          const response = await UserService.GetHistoryUser(token)
          SetHistoryOrders(response)
          setErrorMessage(null) // Сбрасываем ошибку, если запрос успешен
        } catch (error: any) {
          window.location.assign('/login')
          if (error.response && error.response.status === 400) {
            setErrorMessage('Некорректный запрос. Пожалуйста, проверьте введенные данные.')
            window.location.assign('/login')
          } else {
            setErrorMessage('Произошла ошибка при загрузке данных.')
            window.location.assign('/login')
          }
        }
      }
    }

    GetHistoryOrders()
  }, [])

  const ConvertTimeStampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)

    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).replace(' г.', '')

    return formattedDate
  }

  const Redirect = (history: IOneUserHistory) => {
    if(history.calculator_type === "age"){
      const UserData = {
        Name: history.name,
        Date: history.birthday,
        Gender: history.gender
      }
      localStorage.setItem('forecast', JSON.stringify(UserData))
      window.location.assign('/forecast')
    }
    if(history.calculator_type === "matrix"){
      const UserData = {
        Name: history.name,
        Date: history.birthday,
        Gender: history.gender
      }
      localStorage.setItem('matrix', JSON.stringify(UserData))
      window.location.assign('/matrix')
    }
  }

  return (
    <div className={style.content_block}>
      <div className={style.block_title}>
        <Image src={'/image/ShoppingCard.svg'} width={24} height={24} alt='ShoppingCard' />
        <h2>Ваши заказы</h2>
      </div>
      <div className={style.block_content}>
        <div className={style.block_list}>
          {HistoryOrders ? (
            HistoryOrders.map((history) => (
              <div key={history.timestamp} className={style.block_item} onClick={() => Redirect(history)}>
                <div className={style.item_title}>
                  <h4>{ConvertTimeStampToDate(history.timestamp)}</h4>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar' />
                </div>
                <div className={style.item_text}>
                  <span>«{history.calculator_type} {history.name} {history.birthday}»</span>
                </div>
              </div>
            ))
          ) : (
            <span className={style.empty}>Вы еще не совершали покупок</span>
          )}
        </div>
      </div>
      {HistoryOrders && HistoryOrders.length > 0 && (<Link className={style.block_link} href='/dashboard/orders'>Показать все</Link>)}
    </div>
  )
}

export default Orders