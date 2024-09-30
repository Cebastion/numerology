import Image from 'next/image'
import style from './page.module.scss'

type BlogPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [{ id: '1' }]
}

const page = ({ params }: BlogPageProps) => {
  const { id } = params

  return (
    <div className={style.content}>
      <div className="content__container">
        <div className={style.content_title}>
          <h1>Новый Разгар: Знаки Зодиака, которые Встретят Успех с 1 июля 2024</h1>
        </div>
        <div className={style.content_body}>
          <div className={style.content_block}>
            <Image src="/image/blog_1.png" alt="block_1" width={1064} height={480} />
            <span>С 1 июля 2024 года некоторые знаки Зодиака будут испытывать особое влияние планет и числовых энергий, что обещает им новые возможности и успехи. Давайте взглянем на те знак ...</span>
          </div>
          <div className={style.content_block}>
            <h2>Овен (21 марта — 19 апреля)</h2>
            <span>С 1 июля Овны могут ощутить прилив энергии и уверенности в себе. Нумерология показывает, что число 1, которое ассоциируется с Овном, будет на пике своей силы в этот период. Это время, когда Овны могут чувствовать себя более решительными, амбициозными и готовыми броситься в новые проекты и предприятия.</span>
          </div>
          <div className={style.content_block}>
            <h2>Лев (23 июля — 22 августа)</h2>
            <span>Для Львов начало лета будет временем уверенности и внутреннего благополучия. Согласно нумерологии, число 1, которое также ассоциируется с Львами, будет стимулировать их лидерские качества и желание выделяться на фоне других. Это время, когда Львы могут успешно реализовывать свои амбиции и привлекать внимание к своим достижениям.</span>
            <div className={style.block_images}>
              <Image src="/image/Blog.png" alt="Blog" width={300} height={300} />
              <Image src="/image/blog_3.png" alt="Blog" width={300} height={300} />
            </div>
            <span>Для Львов начало лета будет временем уверенности и внутреннего благополучия. Согласно нумерологии, число 1, которое также ассоциируется с Львами, будет стимулировать их лидерские качества и желание выделяться на фоне других. Это время, когда Львы могут успешно реализовывать свои амбиции и привлекать внимание к своим достижениям.</span>
          </div>
          <div className={style.content_block}>
            <Image src="/image/blog_2.png" alt="Blog" width={1064} height={480} />
            <div className={style.block_quotation}>
              <div className={style.quotation_text}>
                <span>«Мой знак зодиака — Скорпион, а они съедают себя и сжигают изнутри. Я порхаю между счастьем и тайнами. Я и ханжа, и еретик в одном лице. Я говорю, что думаю и не претворяюсь и я готова принять все последствия своего поведения»</span>
              </div>
              <div className={style.quotation_author}>
                <span>Вивьен ли</span>
              </div>
            </div>
          </div>
          <div className={style.block_conclusion}>
            <h2>Вывод</h2>
            <span>С 1 июля 2024 года Овны, Львы и Стрельцы могут ожидать новых возможностей и успехов, благодаря сильному влиянию числовых энергий и планет. Но не стоит забывать, что успех приходит тем, кто готов воспользоваться возможностями и приложить усилия к своему развитию. Пусть этот период станет временем роста, достижений и радостных моментов для всех, кто ощущает его влияние.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page