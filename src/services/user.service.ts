import { IError } from '@/interfaces/Error.interface'
import { IPayTariff, IResultPayTariff } from '@/interfaces/PayTariff.inteface'
import { IToken } from '@/interfaces/Token.interface'
import { IUser } from '@/interfaces/User.interface'
import { IManyUserHistory } from '@/interfaces/UserHistory.interface'
import axios from 'axios'

export class UserService {

  static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static GeneratePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
    const passwordLength = 10
    let password = ''

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }

    return password
  }

  // Общий метод для проверки истекшей сессии
  static handleSessionExpired(errorData: any) {
    if (errorData.error_type === 'BadRequest' && errorData.error.includes('Сессия истекла')) {
      // Перенаправляем пользователя на страницу логина
      alert("Сессия истекла. Авторизуйтесь в личный кабинет снова")
      window.location.assign('/login')
      return {
        error: errorData.error,
        error_type: errorData.error_type,
        result: errorData.result
      }
    }
    return null
  }

  static async GetUser(auth_token: string) {
    try {
      const { data } = await axios.get<IUser>('https://matrix-map.ru/api/user/data', {
        headers: {
          accept: 'application/json',
          apiKey: auth_token
        }
      })
      return data
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      }
      return error
    }
  }

  static async GetHistoryUser(auth_token: string) {
    try {
      const { data } = await axios.get<IManyUserHistory>('https://matrix-map.ru/api/user/history', {
        headers: {
          accept: 'application/json',
          apiKey: auth_token
        }
      })
      return data
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      }
      return error
    }
  }

  static async GetHistoryUserLimitPage(auth_token: string, page: number) {
    try {
      const { data } = await axios.get<IManyUserHistory>(`https://matrix-map.ru/api/user/history?limit=10&page=${page}`, {
        headers: {
          accept: 'application/json',
          apiKey: auth_token
        }
      })
      return data
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      }
      return error
    }
  }

  static async LogIn(email: string, password: string) {
    try {
      const { data } = await axios.post<IToken>('https://matrix-map.ru/api/login', { email, password })
      sessionStorage.setItem('auth_token', data.auth_token)
      console.log(data.auth_token)
      window.location.assign('/dashboard')
      return { result: true }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) alert(sessionError.error)
        alert(error.response.data.error)
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }

  static async SignUp(email: string, password: string, name: string) {
    try {
      const { data } = await axios.post<IToken>('https://matrix-map.ru/api/register', { email, name, password }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      sessionStorage.setItem('auth_token', data.auth_token)
      window.location.assign('/dashboard')
      return { result: true }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }

  static async ResetAccount(token: string, new_password: string, again_new_password: string) {
    await this.delay(5000)
    try {
      const { data } = await axios.put('https://matrix-map.ru/api/user/data',
        JSON.stringify({ new_password, again_new_password }), {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apiKey: token
        }
      })
      return data
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }

  static async PayTariff(token: string, direction: string, birthday?: string, gender?: string, name?: string, email?: string) {
    try {
      const { data } = await axios.post<IPayTariff>('https://matrix-map.ru/api/payments',
        { direction, birthday, gender, name, email }, {
        headers: {
          accept: 'application/json',
          apiKey: token
        }
      })
      window.location.href = data.link
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        window.location.assign('/login')
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }

  static async PayTariffChecked(request: string, token: string) {
    try {
      const { data } = await axios.put<IResultPayTariff>('https://matrix-map.ru/api/payments', { request }, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apiKey: token
        }
      })
      return data.result
    } catch (error: any) {
      if (error.response && error.response.data) {
        const sessionError = this.handleSessionExpired(error.response.data)
        if (sessionError) return sessionError
        return error.response.data
      } else {
        console.error("Произошла ошибка без ответа от сервера:", error.message)
        return {
          error: "Unknown error",
          result: false
        }
      }
    }
  }


  static async FastRegistrationUser(email: string, name: string) {
    try {
      const password = this.GeneratePassword()

      const { data } = await axios.post<IToken>('https://matrix-map.ru/api/register', { email, name, password }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      sessionStorage.setItem('auth_token', data.auth_token)
      console.log(data)
      return data.auth_token
    } catch (error: any) {
      if (error.response && error.response.data.error === "Указанный пользователь уже зарегистрирован.") {
        window.location.assign('/login')
        alert("Пользователь с таким email уже зарегистрирован. Авторизуйтесь в личный кабинет.")
      }
    }
  }


  static async CheckedURL(restore_key: string) {
    try {
      const { data } = await axios.get<{ result: boolean }>(`https://matrix-map.ru/api/user/reset?restore_key=${restore_key}`)
      return data.result
    } catch (error) {
      console.log(error)
    }
  }



  static async CheckUser(email: string) {
    try {
      const { data } = await axios.post<{ result: boolean, error?: string }>("https://matrix-map.ru/api/user/reset", { email });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const errorMessage: IError = error.response.data;
        console.log(errorMessage);
        return errorMessage;
      } else {
        console.log("Произошла непредвиденная ошибка:", error);
        return { result: false, message: "Произошла непредвиденная ошибка." };
      }
    }
  }




  static async PasswordRecovery(password: string, restore_key: string) {
    try {
      const { data } = await axios.put<{ result: boolean }>("https://matrix-map.ru/api/user/reset", { password, restore_key })
      if (data.result === true) { window.location.assign('/login') } else { window.location.assign("/") }
    } catch (error) {
      console.log(error)
    }
  }
}
