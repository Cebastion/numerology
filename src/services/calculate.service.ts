import axios from 'axios'

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
          timeout: 5000
        })

        console.log(data)

      return data
    } catch (error: any) {
      return error
    }
  }

  static async CalculateFate(birthday: string, gender: string, name: string, auth_token?: string) {
    try {
      //console.log({ birthday, gender, name })
      const { data } = await axios.post('https://matrix-map.ru:5000/api/calculate/fate',
        { birthday, gender, name },
        {
          headers: {
            accept: 'application/json',
            apiKey: auth_token ? auth_token : ''
          },
          timeout: 5000
        })

        //console.log(data)
      return data
    } catch (error: any) {
      return error
    }
  }
}
