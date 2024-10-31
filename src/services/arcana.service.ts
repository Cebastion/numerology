import { IError } from '@/interfaces/Error.interface';
import { ISchema } from '@/interfaces/Schema.interface';
import axios from 'axios';

export class ArcanaService {

  // Function to introduce delay if needed
  static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Function to generate Arcana based on user input (birthday, gender, name)
  static async GenerateArcana(birthday: string, gender: string, name: string) {
    try {
      name = name.replace(/\s+/g, "")
      console.log({ birthday, gender, name });

      // Making the post request to the server
      const { data } = await axios.post<ISchema>(
        'https://matrix-map.ru/api/arcanas',
        { birthday, gender, name },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        },
      );

      return data;

    } catch (error: any) {
      alert("Произошла ошибка, пожалуйста попробуйте еще раз")
      window.location.assign('/#matrix');

      if (axios.isAxiosError(error) && error.response) {
        const Error: IError = error.response.data
        alert(Error.message)
      }
    }
  }
}
