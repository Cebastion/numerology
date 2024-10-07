export interface IBlog {
  id: number
  date: string
  core_img: string
  title: string
  img_1: string
  text_title: string
  texts: {
      title: string
      text_1: string
      img_1?: string
      img_2?: string
      text_2?: string
    }[]
  img_2: string
  quotation: {
    auth: string
    text: string
  }
  conclusion: string
}

export interface IBlogs {
  blogs: IBlog[]
}