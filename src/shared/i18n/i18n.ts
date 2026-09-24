import { en } from '@/shared/i18n/en.ts'
import i18n from 'i18next'
import includes from 'lodash/includes'
import { initReactI18next } from 'react-i18next'
import { ru } from '@/shared/i18n/ru.ts'

export const languages = ['ru', 'en'] as const

export type Language = (typeof languages)[number]

const STORAGE_KEY = 'lang'
const DEFAULT_LANGUAGE: Language = 'ru'

export const isLanguage = (value: unknown): value is Language => includes(languages, value)

const toLanguage = (value: unknown): Language => (isLanguage(value) ? value : DEFAULT_LANGUAGE)

const applyLanguage = (language: string) => {
  const next = toLanguage(language)
  localStorage.setItem(STORAGE_KEY, next)
  document.documentElement.lang = next
}

const initial = toLanguage(localStorage.getItem(STORAGE_KEY))

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: initial,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

applyLanguage(initial)
i18n.on('languageChanged', applyLanguage)
