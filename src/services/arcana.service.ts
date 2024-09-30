import { ISchema } from '@/interfaces/Schema.interface'
import axios from 'axios'

export class ArcanaService {
  static async GenerateArcana(birthday: string, gender: string, name: string) {
    try {
      const { data } = await axios.post<ISchema>('https://matrix-map.ru:5000/api/arcanas', { birthday, gender, name })
      return data
    } catch (error: any) {
      console.error( 'Error response:', error.response )
      return error
    }
  }
}
