'use client'
import Image from 'next/image'
import style from './page.module.scss'
import { IBlog } from '@/interfaces/Blog.interface'
import { useEffect, useState } from 'react'
import { APILocalBlogs } from '@/LocalAPI/blogs.api'
import React from 'react'

type BlogPageProps = {
  params: {
    id: string
  }
}

const page = ({ params }: BlogPageProps) => {
  const [Blog, setBlog] = useState<IBlog>()
  const { id } = params

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = APILocalBlogs.blogs.find((blog) => blog.id === Number(id))
      setBlog(blog)
    }

    fetchBlog()
  }, [])


  return (
    <div className={style.content}>
      <div className="content__container">
        {Blog && (
          <>
            <div className={style.content_title}>
              <h1>{Blog.title}</h1>
            </div>
            <div className={style.content_body}>
              <div className={style.content_block}>
                <Image src={Blog.img_1} alt="block_1" width={1064} height={480} />
                <span>{Blog.text_title}</span>
              </div>
              {Blog.texts.map((text) => (
                <div className={style.content_block}>
                  <h2>{text.title}</h2>
                  <span>{text.text_1}</span>
                  {text.img_1 && text.img_2 && (
                    <div className={style.block_images}>
                    <Image src={text.img_1} alt="Blog" width={300} height={300} />
                    <Image src={text.img_2} alt="Blog" width={300} height={300} />
                  </div>
                  )}
                  {text.text_2 && <span>{text.text_2}</span>}
                </div>
              ))}
              <div className={style.content_block}>
                <Image src="/image/blog_2.png" alt="Blog" width={1064} height={480} />
                <div className={style.block_quotation}>
                  <div className={style.quotation_text}>
                    <span>{Blog.quotation.auth}</span>
                  </div>
                  <div className={style.quotation_author}>
                    <span>{Blog.quotation.text}</span>
                  </div>
                </div>
              </div>
              <div className={style.block_conclusion}>
                <h2>Вывод</h2>
                <span>{Blog.conclusion}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default page