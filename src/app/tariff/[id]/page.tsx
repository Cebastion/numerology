import { tariffs } from '@/list/tariff.list'
import { FC } from 'react'
import style from './page.module.scss'
import Tariff from './template/Tariff'

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return tariffs.map(tariff => ({ id: tariff.id.toString() }))
}

const page: FC<PageProps> = ({ params }) => {

  const { id } = params
  const tariff = tariffs.find(tariff => tariff.id === +id)
  
  return (
    <div className={style.content}>
      <div className="content__container">
        <Tariff tariff={tariff}/>
      </div>
    </div>
  )
}

export default page