import { IError } from '@/interfaces/Error.interface';
import axios from 'axios'
import { useRouter } from 'next/router';

export class CalculateService {
  static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static async CalculateYears(birthday: string, gender: string, name: string, auth_token?: string) {
    try {
      name = name.replace(/\s+/g, "")
      const { data } = await axios.post('https://matrix-map.ru/api/calculate/years',
        { birthday, gender, name },
        {
          headers: {
            accept: 'application/json',
            apiKey: auth_token ? auth_token : ''
          },
        })

      console.log(data)

      return data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const Error = error.response.data
        alert(Error.error)
        window.location.assign("/#forecast")
      }
    }
  }

  static async CalculateFate(birthday: string, gender: string, name: string, auth_token?: string) {
    try {
      name = name.replace(/\s+/g, "")
      console.log(name)
      const { data } = await axios.post('https://matrix-map.ru/api/calculate/fate',
        { birthday, gender, name },
        {
          headers: {
            accept: 'application/json',
            apiKey: auth_token ? auth_token : ''
          },
        })

      console.log(data)
      return data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        console.error(error)
        const Error = error.response.data
        alert(Error.error)
        window.location.assign("/#matrix")
      }
    }
  }
}
