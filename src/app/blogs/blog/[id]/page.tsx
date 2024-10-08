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
                {Blog.text_1 && <span style={{marginBottom: "20px"}}>{Blog.text_1}</span>}
                <Image src={Blog.img} alt="block_1" width={1064} height={480} />
                {Blog.text_2 && (<span>{Blog.text_2}</span>)}
              </div>
              {Blog.paragraph.map((item) => (
                <div className={style.content_block}>
                  <h2>{item.title}</h2>
                  {item.text.map(item_text => (
                    <p>{item_text}</p>
                  ))}
                  {item.paragraph_mini?.map(sub_item => (
                    <div className={style.content_block} style={{paddingLeft: "20px"}}>
                      <h2>{sub_item.title}</h2>
                      <span>{sub_item.text}</span>
                    </div>
                  ))}
                  {item.list && (
  <ul style={{ paddingLeft: "0", margin: "0" }}>
    {item.list?.map((sub_item) => (
      <li
        className={style.content_block}
        style={{
          display: "flex", // Используем flexbox
          alignItems: "center", // Выравниваем по центру по вертикали
          marginLeft: "20px",
          fontSize: "20px",
          position: "relative",
          flexDirection: "row"
        }}
      >
        {/* Создаем маркер вручную */}
        <span
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "black",
            borderRadius: "50%",
            display: "inline-block",
            marginRight: "15px", // Отступ для маркера
          }}
        ></span>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{sub_item.title}</h2>
          <span>{sub_item.text}</span>
        </div>
      </li>
    ))}
  </ul>
)}

                  {item.text_end && (<span>{item.text_end}</span>)}
                </div>
              ))}
              {Blog.conclusion && (
                <div className={style.block_conclusion}>
                <h2>Вывод</h2>
                <span>{Blog.conclusion}</span>
              </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default page


/*


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
*/