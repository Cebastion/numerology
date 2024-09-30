'use client'

import Image from 'next/image'
import { FC } from 'react'
import style from './page.module.scss'
import { useRouter } from 'next/navigation'

const page: FC = () => {
  const router = useRouter()

  const RedirectBlog = (id: number) => {
    router.push(`/blogs/blog/${id}`)
  }

  return (
    <div className={style.content}>
      <div className="content__container">
        <div className={style.content_title}>
          <h1>Наш блог</h1>
        </div>
        <div className={style.content_blogs}>
          <div className={style.blogs_list}>
            <div className={style.blog_body} onClick={() => RedirectBlog(1)}>
              <div className={style.blog_title} style={{ backgroundImage: 'url(/image/Blog.png)' }}>
                <h2>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h2>
              </div>
              <div className={style.blog_content}>
                <div className={style.blog_date}>
                  <span>12 ноября 2023</span>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar'/>
                </div>
                <div className={style.blog_description}>
                  <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
                </div>
              </div>
            </div>
            <div className={style.blog_body} onClick={() => RedirectBlog(1)}>
              <div className={style.blog_title} style={{ backgroundImage: 'url(/image/Blog.png)' }}>
                <h2>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h2>
              </div>
              <div className={style.blog_content}>
                <div className={style.blog_date}>
                  <span>12 ноября 2023</span>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar'/>
                </div>
                <div className={style.blog_description}>
                  <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
                </div>
              </div>
            </div>
            <div className={style.blog_body} onClick={() => RedirectBlog(1)}>
              <div className={style.blog_title} style={{ backgroundImage: 'url(/image/Blog.png)' }}>
                <h2>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h2>
              </div>
              <div className={style.blog_content}>
                <div className={style.blog_date}>
                  <span>12 ноября 2023</span>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar'/>
                </div>
                <div className={style.blog_description}>
                  <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
                </div>
              </div>
            </div>
            <div className={style.blog_body} onClick={() => RedirectBlog(1)}>
              <div className={style.blog_title} style={{ backgroundImage: 'url(/image/Blog.png)' }}>
                <h2>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h2>
              </div>
              <div className={style.blog_content}>
                <div className={style.blog_date}>
                  <span>12 ноября 2023</span>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar'/>
                </div>
                <div className={style.blog_description}>
                  <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
                </div>
              </div>
            </div>
            <div className={style.blog_body} onClick={() => RedirectBlog(1)}>
              <div className={style.blog_title} style={{ backgroundImage: 'url(/image/Blog.png)' }}>
                <h2>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h2>
              </div>
              <div className={style.blog_content}>
                <div className={style.blog_date}>
                  <span>12 ноября 2023</span>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar'/>
                </div>
                <div className={style.blog_description}>
                  <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
                </div>
              </div>
            </div>
            <div className={style.blog_body} onClick={() => RedirectBlog(1)}>
              <div className={style.blog_title} style={{ backgroundImage: 'url(/image/Blog.png)' }}>
                <h2>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h2>
              </div>
              <div className={style.blog_content}>
                <div className={style.blog_date}>
                  <span>12 ноября 2023</span>
                  <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar'/>
                </div>
                <div className={style.blog_description}>
                  <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page