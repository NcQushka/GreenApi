import { isLanguage, languages } from '@/shared/i18n'
import { useTranslation } from 'react-i18next'

export const LanguageSwitch = () => {
  const { i18n } = useTranslation()
  const current = isLanguage(i18n.language) ? i18n.language : languages[0]

  return (
    <div className="flex gap-2 text-xs">
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => void i18n.changeLanguage(language)}
          className={language === current ? 'text-white' : 'text-muted'}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
