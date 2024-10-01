'use client'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import style from './page.module.scss'
import Deciphering from './components/Deciphering/Deciphering'
import Orders from './components/Orders/Orders'
import Account from './components/Account/Account'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserService } from '@/services/user.service'
import { IUser } from '@/interfaces/User.interface'

const page: FC = () => {
  const [UserData, SetUserData] = useState<IUser>()
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token')
    if (!token) {
      router.push('/login')
    } else {
      const fetchUserData = async () => {
        try {
          if (token) {
            console.log(token)
            const User = await UserService.GetUser(token)

            if (!User) {
              router.push('/login')
            }

            SetUserData(User)

            const UserJSON = JSON.stringify(User)

            localStorage.setItem("UserData", UserJSON)
          }
        } catch (error) {
          router.push('/login')
        }
      }

      fetchUserData()
    }
  }, [])


  useEffect(() => {
    async function CheckedTariff() {
      const token = sessionStorage.getItem('auth_token')
      const fullUrl = window.location.href
      const urlObject = new URL(fullUrl)
      const searchParams = urlObject.searchParams
      const invId = searchParams.get('InvId')
      const signatureValue = searchParams.get('SignatureValue')
      const OutSum = searchParams.get('OutSum')

      // Проверяем, был ли этот URL уже проверен
      const isUrlChecked = localStorage.getItem('checkedUrl')

      if (token && !isUrlChecked) {
        if (signatureValue && invId && OutSum) {
          const result = await UserService.PayTariffChecked(fullUrl, token)
          if (result) {
            // Сохраняем проверенный URL
            localStorage.setItem('checkedUrl', fullUrl)

            // Очистка параметров строки запроса
            window.history.replaceState(null, '', window.location.pathname)
            if (OutSum == '750') {
              router.push('/matrix')
            }
            if (OutSum == '550') {
              router.push('/forecast')
            }
          }
        }
      }
    }

    CheckedTariff()
  }, [])

  console.log(UserData)

  return (
    <div className={style.content}>
      <div className={style.content__container}>
        <div className={style.content_title}>
          <h1>Личный кабинет</h1>
          <div className={style.content_tariff}>
            <h2><Image src={`/image/Planet.svg`} alt="planet" width={24} height={24} /> Ваш тариф: </h2>
            <Link href={'/#tariff'}>{UserData?.plan}</Link>
          </div>
        </div>
        <div className={style.content_row}>
          <Deciphering />
          <Orders />
          <Account {...(UserData as IUser)} />
        </div>
      </div>
    </div>
  )
}

export default page