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
      console.log({ birthday, gender, name });

      // Making the post request to the server
      const { data } = await axios.post<ISchema>(
        'https://matrix-map.ru:5000/api/arcanas',
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
      // Handling any potential errors
      console.error('Error:', error);

      alert("Произошла ошибка, пожалуйста попробуйте еще раз")
      window.location.assign('/#matrix');

      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }
}
