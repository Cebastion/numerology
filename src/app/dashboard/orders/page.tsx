'use client'
import { FC, useEffect, useState } from 'react'
import style from './page.module.scss'
import Image from 'next/image'
import Pagination from './components/Pagination/Pagination'
import { IManyInstanceUserHistory, IManyUserHistory, IOneUserHistory } from '@/interfaces/UserHistory.interface'
import Order from './components/Order/Order'
import { UserService } from '@/services/user.service'

const page: FC = () => {
  const [HistoryOrders, SetHistoryOrders] = useState<IManyUserHistory>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function GetHistoryOrders() {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        try {
          const response = await UserService.GetHistoryUser(token)
          SetHistoryOrders(response)
        } catch (error: any) {
          window.location.assign('/login')
          if (error.response && error.response.status === 400) {
            window.location.assign('/login')
          } else {
            window.location.assign('/login')
          }
        }
      }
    }

    GetHistoryOrders()
  }, [])


  const totalPages = HistoryOrders && Math.ceil(HistoryOrders.length / 10)

  // Получаем заказы для текущей страницы
  const currentOrders = HistoryOrders && HistoryOrders.slice((page - 1) * 10, page * 10)

  return (
    <div className={style.content}>
      <div className={style.content__container}>
        <h1 className={style.content__title}>Личный кабинет</h1>
        <div className={style.content_block}>
          <div className={style.block_title}>
            <Image src={'/image/ShoppingCard.svg'} width={24} height={24} alt='ShoppingCard' />
            <h2>Ваши заказы</h2>
          </div>
          <div className={style.block_content}>
            <div className={style.block_list}>
              {
                currentOrders && currentOrders.length > 0
                  ? currentOrders.map((history, index) => (<Order key={index} history={history}/>))
                  : <span className={style.empty}>Заказы отсутствуют</span>
              }
            </div>
          </div>
        </div>
        <Pagination currentPage={page}
          totalPages={totalPages ? totalPages : 0}
          onPageChange={setPage} />
      </div>
    </div>
  )
}

export default page