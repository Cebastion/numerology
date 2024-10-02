import { FC, useState } from 'react'
import style from './ResetPassword.module.scss'
import { ISendCode } from '@/interfaces/SendCode.interface'
import { UserService } from '@/services/user.service'
import Link from 'next/link'
import React from 'react'

interface IResetPassword {
  SetOpen: (value: any) => void
}

const ResetPassword: FC<IResetPassword> = ({SetOpen}) => {
  const [FirstStep, SetFirstStep] = useState(true)
  const [SecondStep, SetSecondStep] = useState(false)
  const [FormSendCode, SetFormSendCode] = useState<ISendCode>({})
  const SendCode = async () => {
    try {
      if (FormSendCode.email && FormSendCode.code) {
        //const error = await UserService.SendCodeEmail(FormSendCode.email, FormSendCode.code)
        // if (error) {
        //   return
        // }
      }
    } catch (e) {
    }
  }


  return (
    <>
      <div className={style.blur}></div>
      <div className={style.content_body}>
        <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}><div className={style.close} onClick={() => SetOpen(false)} /></div>
        <div className={style.content_title}>
          <h1>Восстановление пароля</h1>
          {FirstStep && (<><p style={{ margin: "20px 0 0 0" }}>Введите адрес электронной почты. <p> Мы пришлём вам новый пароль</p></p></>)}
          {SecondStep && <p style={{ margin: "20px auto 0", width: "100%" }}>новый пароль отправлен вам на почту</p>}
        </div>
        {FirstStep &&
          (
            <form className={style.content_from}>
              <div className={style.form_inputs}>
                <input type="email" placeholder='Введите ваш e-mal*' />
              </div>
              <div className={style.form_button}>
                <button onClick={() => SendCode()}>Отправить</button>
              </div>
              <div className={style.content_signup}>
                <span>У вас нет аккаунта?<Link href="/signup">Зарегистрируйтесь</Link></span>
              </div>
            </form>
          )}
        {SecondStep &&
          (
            <form className={style.content_from}>
              <div className={style.form_button}>
                <button onClick={() => SetOpen(false)}>Войти</button>
              </div>
              <div className={style.content_signup}>
                <span>У вас нет аккаунта?<Link href="/signup">Зарегистрируйтесь</Link></span>
              </div>
            </form>
          )}
      </div>
    </>
  )
}

export default ResetPassword