export interface IBlog {
  id: number
  date: string
  title: string
  img: string
  text_1:string
  text_2?: string
  paragraph: {
    title:string
    text:string[]
    list?:{
        title:string
        text: string
    }[]
    paragraph_mini?: {
      title:string
      text:string
    }[]
    text_end?:string
  }[]
  conclusion?: string
}

export interface IBlogs {
  blogs: IBlog[]
}