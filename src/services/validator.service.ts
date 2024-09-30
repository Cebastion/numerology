export class ValidatorService {
  static ValidateEmail(email: string) {
    if (email.trim() == '') {
      return true
    }
    return !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  }

  static ValidatePassword(password: string) {
    if (password.trim() == '') {
      return true
    }
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])$/.test(password)
  }

  static ValidName(name: string) {
    if (name.trim() == '') {
      return true
    }
  }

  static ValidDate(date: string) {
    if (date.trim() == '') {
      return true
    }
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
  }

  static ValidPasswordRepeat(password: string, passwordRepeat: string) {
    if (password.trim() == '') {
      return true
    }
    return !(password === passwordRepeat)
  }

  static ValidatePhone(phone: string) {
    if (phone.trim() == '') {
      return true
    }
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(phone)
  }
}
