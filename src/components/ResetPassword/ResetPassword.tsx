import { FC, useState } from 'react'
import style from './ResetPassword.module.scss'
import { UserService } from '@/services/user.service'
import Link from 'next/link'
import React from 'react'

interface IResetPassword {
  SetOpen: (value: any) => void
}

interface CheckUserResult {
  result: boolean;
  message?: string;
}

const ResetPassword: FC<IResetPassword> = ({ SetOpen }) => {
  const [Email, SetEmail] = useState<string>('')

  const CheckUser = async () => {
    const result: CheckUserResult = await UserService.CheckUser(Email)
    console.log(result)
    if (!result.result) {

      alert(result.message)
    } else {
      alert("Мы отправили письмо на Вашу электронную почту с соответствующими инструкциями. При необходимости, проверьте папку спам.")
      SetOpen(false)
    }
  }


  return (
    <>
      <div className={style.blur}></div>
      <div className={style.content_body}>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}><div className={style.close} onClick={() => SetOpen(false)} /></div>
        <div className={style.content_title}>
          <h1>Восстановление пароля</h1>
        </div>
        <div className={style.content_from}>
          <div className={style.form_inputs}>
            <input type="email" placeholder='Введите ваш e-mal*' value={Email} onChange={(e) => SetEmail(e.target.value)} />
          </div>
          <div className={style.form_button}>
            <button onClick={CheckUser}>Отправить</button>
          </div>
          <div className={style.content_signup}>
            <span>У вас нет аккаунта?<Link href="/signup">Зарегистрируйтесь</Link></span>
          </div>
        </div>
      </div >
    </>
  )
}

export default ResetPassword
