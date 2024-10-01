import { IOneInstanceUserHistory, IOneUserHistory } from '@/interfaces/UserHistory.interface'
import { FC } from 'react'
import style from './order.module.scss'
import Image from 'next/image'

const Order: FC<IOneInstanceUserHistory> = ({history}) => {
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
        Name: history.name.charAt(0).toUpperCase() + history.name.slice(1).toLowerCase(),
        Date: history.birthday,
        Gender: history.gender
      }
      localStorage.setItem('forecast', JSON.stringify(UserData))
      window.location.assign('/forecast')
    }
    if(history.calculator_type === "matrix"){
      const UserData = {
        Name: history.name.charAt(0).toUpperCase() + history.name.slice(1).toLowerCase(),
        Date: history.birthday,
        Gender: history.gender
      }
      localStorage.setItem('matrix', JSON.stringify(UserData))
      window.location.assign('/matrix')
    }
  }

  return (
    <div key={history.timestamp} className={style.block_item} onClick={() => Redirect(history)}>
      <div className={style.item_title}>
        <h4>{ConvertTimeStampToDate(history.timestamp)}</h4>
        <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendars' />
      </div>
      <div className={style.item_text}>
        <span>«{history.calculator_type} {history.name} {history.birthday}»</span>
      </div>
    </div>
  )
}

export default Order