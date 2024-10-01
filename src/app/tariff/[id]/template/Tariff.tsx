'use client'
import { FC, FormEvent, useEffect, useState } from 'react'
import style from '../page.module.scss'
import { IValidTariff } from '@/interfaces/Validator.interface'
import { ValidatorService } from '@/services/validator.service'
import { ITariff } from '@/interfaces/Tariff.interface'
import Image from 'next/image'
import { UserService } from '@/services/user.service'
import { TariffEnum } from '@/enums/tariff.enum'

const Tariff: FC<ITariff> = ({ tariff }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [formValues, setFormValues] = useState({ Email: '', IsChecked: false })
  const [Dirty, setDirty] = useState<IValidTariff>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue = value

    setFormValues({ ...formValues, [name]: newValue })
  }

  const PayTariff = async (e: FormEvent) => {
    e.preventDefault()

    const EmailError = ValidatorService.ValidateEmail(formValues.Email)

    setDirty({ Email: EmailError, IsChecked: !isChecked })

    if (!EmailError && isChecked) {
      const forecast = localStorage.getItem('forecast')
      const matrix = localStorage.getItem('matrix')
      const token = sessionStorage.getItem('auth_token')
      if(forecast && tariff){
        if(token){
          const UserData = JSON.parse(forecast)
          await UserService.PayTariff(token, TariffEnum[tariff?.id - 1], String(UserData.Date), UserData.Gender, UserData.Name)
        }
      }
      if(matrix && tariff){
        if(token){
          const UserData = JSON.parse(matrix)
          await UserService.PayTariff(token, TariffEnum[tariff?.id - 1], String(UserData.Date), UserData.Gender, UserData.Name)
        }
      }
      console.log('Form submitted:', formValues)
    }
  }

  function CheckEmail(){
    const LoginEmail = sessionStorage.getItem('login')
    const SignUpEmail = sessionStorage.getItem('signup')

    if (LoginEmail || SignUpEmail) {
      if (LoginEmail) {
        const EmailParse = JSON.parse(LoginEmail)
        setFormValues({ ...formValues, Email: EmailParse.email })
      }
      if(SignUpEmail) {
        const EmailParse = JSON.parse(SignUpEmail)
        setFormValues({ ...formValues, Email: EmailParse.email })
      }
    }
  }


  useEffect(() => {
    CheckEmail()
  })

  useEffect(() => {
    const CheckUser = async () => {
      const token = sessionStorage.getItem('auth_token')

      if (!token) {
        window.location.href = '/login'
      }
    }

    CheckUser()
  })


  return (
    <form onSubmit={PayTariff} className="content_tariff">
      <div className={style.tariff_title}>
        <h1>ОФормление заказа</h1>
      </div>
      {Dirty.IsChecked && (
        <div className={style.block_error}>
          <Image src={'/image/warning.svg'} width={24} height={24} alt="warning" />
          <span>Чтобы продолжить оформление заказа, прочитайте правила и условия и подтвердите своё согласие с ними.</span>
        </div>
      )}
      <div className={style.tariff_block}>
        <div className={style.tariff_block_title}>
          <h2>Данные</h2>
        </div>
        <div className={style.tariff_input}>
          <label htmlFor="">E-mail*</label>
          <input name='Email' className={Dirty.Email ? style.form_email_error : ''} type="email" placeholder='mail@matrix-map.ru' value={formValues.Email} onChange={handleChange} />
        </div>
      </div>
      <div className={style.tariff_block}>
        <div className={style.tariff_block_title}>
          <h2>Детали заказа</h2>
        </div>
        <div className={style.tariff_detail}>
          <div className={style.detail_block}>
            <h3>Тариф</h3>
            <p>{`«${tariff?.title.toLocaleUpperCase().replace(/<\/?[^>]+(>|$)/g, "")}»`}</p>
          </div>
          <div className={style.detail_block}>
            <h3>Стоимость</h3>
            <p>{tariff?.price}</p>
          </div>
        </div>
      </div>
      <div className={style.tariff_block}>
        <div className={style.tariff_block_title}>
          <h2>Способ оплаты</h2>
        </div>
        <div className={style.robokassa}>
          <Image src={`/image/robokassa.png`} alt='robokassa' width={140} height={80} />
          <span>Оплатить через Robokassa</span>
        </div>
        <div className={style.tariff_checkbox}>
          <label htmlFor="" className={Dirty.IsChecked ? style.error : ''}>
            <input className={isChecked ? style.checked : ''} type="checkbox" checked={isChecked} onChange={() => {
              setIsChecked(!isChecked)
              setFormValues({ ...formValues, IsChecked: !isChecked })
            }} />
            <span>Я прочитал(а) и принимаю <a href="">правила и условия</a> сайта *</span>
          </label>
        </div>
        <div className={style.tariff_button}>
          <button>Подтвердить заказ</button>
        </div>
      </div>
    </form>
  )
}

export default Tariff