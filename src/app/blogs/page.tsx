'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import style from './page.module.scss'
import { useRouter } from 'next/navigation'
import { IBlogs } from '@/interfaces/Blog.interface'
import { APILocalBlogs } from '@/LocalAPI/blogs.api'

const page: FC = () => {
  const router = useRouter()
  const [Blogs, setBlogs] = useState<IBlogs>(APILocalBlogs)
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
            {Blogs.blogs.map((blog) => (
              <div className={style.blog_body} onClick={() => RedirectBlog(blog.id)}>
                <div className={style.blog_title} style={{ backgroundImage: `url(${blog.img})` }}>
                  <h2>{blog.title}</h2>
                </div>
                <div className={style.blog_content}>
                  <div className={style.blog_date}>
                    <span>{blog.date}</span>
                    <Image src={'/image/Calendar.svg'} width={24} height={24} alt='Calendar' />
                  </div>
                  <div className={style.blog_description}>
                    <span>{blog.text_1.slice(0, 150) + '...'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page