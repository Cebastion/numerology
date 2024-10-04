'use client'
import { UserService } from '@/services/user.service'
import { useRouter } from 'next/navigation'
import { FC, ReactElement, useEffect } from 'react'

type NextPageWithLayout = FC & {
  getLayout?: (page: ReactElement) => ReactElement
}
const page: NextPageWithLayout = () => {
  const router = useRouter()

  useEffect(() => {
    async function CheckedTariff() {
      const token = sessionStorage.getItem('auth_token')
      const fullUrl = window.location.href

      if (token) {
        const result = await UserService.PayTariffChecked(fullUrl, token)

        if (result) {
          router.push('/dashboard')
        }
      } else {
        alert("Сессия истекла. Авторизуйтесь в личный кабинет снова")
        router.push('/login')
      }
    }

    CheckedTariff()
  }, [])

  return <div></div>
}

page.getLayout = function getLayout(page) {
  return page
}

export default page