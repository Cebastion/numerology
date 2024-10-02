'use client'
import { UserService } from '@/services/user.service'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const page: FC = () => {
  const router = useRouter()
  
  useEffect(() => {
    async function CheckedTariff() {
      const token = sessionStorage.getItem('auth_token')
      const fullUrl = window.location.href
      const urlObject = new URL(fullUrl)
      const searchParams = urlObject.searchParams
      const signatureValue = searchParams.get('SignatureValue')
      const OutSum = searchParams.get('OutSum')

      // Получаем сохраненное значение SignatureValue из localStorage
      const savedSignatureValue = localStorage.getItem('savedSignatureValue')

      if (token) {
        if (signatureValue && OutSum) {
          // Если SignatureValue еще не было сохранено или оно отличается
          if (!savedSignatureValue || savedSignatureValue !== signatureValue) {
            // Вызываем функцию проверки тарифа
            const result = await UserService.PayTariffChecked(fullUrl, token)

            if (result) {
              localStorage.setItem('savedSignatureValue', signatureValue)

              router.push('/dashboard')

              // Очистка параметров строки запроса в URL
              window.history.replaceState(null, '', window.location.pathname)
            }
          } else {
            console.log('Этот платеж уже был проверен.')
          }
        }
      }
    }

    CheckedTariff()
  }, [])
  
  return <div></div>
}

export default page