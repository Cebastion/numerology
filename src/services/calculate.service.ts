import axios from 'axios'
import { useRouter } from 'next/router';

export class CalculateService {
  static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static async CalculateYears(birthday: string, gender: string, name: string, auth_token?: string) {
    try {
      const { data } = await axios.post('https://matrix-map.ru:5000/api/calculate/years',
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
      if (error.response && error.response.data) {
        const errorData = error.response.data

        console.error("Ошибка:", errorData.error)
        console.error("Тип ошибки:", errorData.error_type)
        console.error("Результат:", errorData.result)

        // Проверка на истечение сессии и редирект
        if (errorData.error === "Сессия истекла. Авторизуйтесь в личный кабинет снова.") {
          alert("Сессия истекла. Авторизуйтесь в личный кабинет снова")
          window.location.assign('/login');
        }

        return {
          error: errorData.error,
          error_type: errorData.error_type,
          result: errorData.result
        }
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }

  static async CalculateFate(birthday: string, gender: string, name: string, auth_token?: string) {
    try {
      const { data } = await axios.post('https://matrix-map.ru:5000/api/calculate/fate',
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
      if (error.response && error.response.data) {
        const errorData = error.response.data

        console.error("Ошибка:", errorData.error)
        console.error("Тип ошибки:", errorData.error_type)
        console.error("Результат:", errorData.result)

        // Проверка на истечение сессии и редирект
        if (errorData.error === "Сессия истекла. Авторизуйтесь в личный кабинет снова.") {
          alert("Сессия истекла. Авторизуйтесь в личный кабинет снова")
          window.location.assign('/login');
        }

        return {
          error: errorData.error,
          error_type: errorData.error_type,
          result: errorData.result
        }
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }
}
