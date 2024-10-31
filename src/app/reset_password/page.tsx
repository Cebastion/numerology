'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FC, FormEvent, useEffect, useState } from 'react'
import style from './page.module.scss'
import { ValidatorService } from '@/services/validator.service'
import { IValidSignUp } from '@/interfaces/Validator.interface'
import { UserService } from '@/services/user.service'

const page: FC = () => {
  const [ShowPassword, setShowPassword] = useState(false)
  const [ShowPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [formValues, setFormValues] = useState({ Name: '', Email: '', Password: '', PasswordRepeat: '' })
  const [Dirty, setDirty] = useState<IValidSignUp>({})
  const [Token, SetToken] = useState<string>('')
  const router = useRouter()

  const TogglePassword = () => {
    setShowPassword(!ShowPassword)
  }

  const TogglePasswordRepeat = () => {
    setShowPasswordRepeat(!ShowPasswordRepeat)
  }

  const SignUp = async (e: FormEvent) => {
    e.preventDefault()
    const PasswordError = ValidatorService.ValidatePassword(formValues.Password)
    const PasswordRepeatError = ValidatorService.ValidPasswordRepeat(formValues.Password, formValues.PasswordRepeat)

    setDirty({ Password: PasswordError, PasswordRepeat: PasswordRepeatError })

    if (!PasswordError && !PasswordRepeatError) {
      await UserService.PasswordRecovery(formValues.Password, Token)
    }
  }

  useEffect(() => {
    async function CheckedURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const resetToken = urlParams.get('token'); // Извлекаем токен из URL
      if (resetToken) {
        const result = await UserService.CheckedURL(resetToken)
        if (!result) {
          window.location.assign("/")
        }
        SetToken(resetToken)
      } else {
        window.location.assign("/")
      }
    }

    CheckedURL();
  }, []);

  return (
    <div className={style.content}>
      <div className="content__container">
        <div className={style.content_body}>
          <div className={style.content_title}>
            <h1>Восстановление пароля</h1>
            <p style={{ display: "inherit" }}>Придумайте новый пароль</p>
          </div>
          <form onSubmit={SignUp} className={style.content_from}>
            <div className={style.form_inputs}>
              <div style={{ marginTop: '20px' }} className={style.form_password}>
                <input minLength={8} maxLength={64} className={Dirty.Password ? style.form_password_error : ''} type={ShowPassword ? 'text' : 'password'} placeholder='Пароль*' value={formValues.Password} onChange={(e) => setFormValues({ ...formValues, Password: e.target.value })} />
                {ShowPassword ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePassword} />}
              </div>
              <div className={style.form_password}>
                <input minLength={8} maxLength={64} className={Dirty.PasswordRepeat ? style.form_password_repeat_error : ''} type={ShowPasswordRepeat ? 'text' : 'password'} placeholder='Повторите пароль*' value={formValues.PasswordRepeat} onChange={(e) => setFormValues({ ...formValues, PasswordRepeat: e.target.value })} />
                {ShowPasswordRepeat ? <Image src={'/image/EyeOn.svg'} width={24} height={24} alt='eye' onClick={TogglePasswordRepeat} /> : <Image src={'/image/EyeOff.svg'} width={24} height={24} alt='eye' onClick={TogglePasswordRepeat} />}
              </div>
            </div>
            <div className={style.form_button}>
              <button>Восстановить пароль</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
