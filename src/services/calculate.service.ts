import axios from 'axios'

export class CalculateService {
  static async CalculateYears(birthday: string, gender: string, name: string, auth_token?: string) {
    try {
      const { data } = await axios.post('https://matrix-map.ru:5000/api/calculate/years',
        { birthday, gender, name },
        {
          headers: {
            accept: 'application/json',
            apiKey: auth_token ? auth_token : ''
          }
        })
      return data
    } catch (error: any) {
      return error
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
          }
        })
      return data
    } catch (error: any) {
      return error
    }
  }
}
