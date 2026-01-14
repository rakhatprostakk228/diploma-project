# BRaD. - Landing Page

Лендинг для платформы BRaD. - Virtual Internships & Job Matching Platform.

## Структура проекта (FSD)

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/router/  # Роутинг
│   └── index.tsx          # Точка входа
│
├── pages/                  # Страницы
│   ├── landing/           # Лендинг страница
│   └── app/               # Основное приложение (заглушка)
│
├── widgets/                # Крупные составные блоки
│   ├── landing-header/    # Шапка лендинга
│   ├── landing-hero/      # Hero секция
│   ├── landing-about/     # О нас секция
│   ├── landing-contact/   # Контакты секция
│   └── landing-footer/    # Подвал лендинга
│
├── features/               # Функциональные возможности
│   └── contact-form/      # Форма контакта (react-hook-form + zod)
│
└── shared/                 # Переиспользуемый код
    ├── ui/                 # UI компоненты (Button, Input, Textarea)
    ├── lib/                # Утилиты (cn для tailwind-merge)
    └── styles/             # Глобальные стили (Tailwind CSS)
```

## Технологии

- **React 18** + **TypeScript**
- **Tailwind CSS** - стилизация
- **react-hook-form** + **Zod** - формы и валидация
- **lucide-react** - иконки
- **class-variance-authority** - варианты компонентов
- **@radix-ui/react-slot** - композиция компонентов

## Запуск

```bash
npm install
npm run dev
```

## Роутинг

- `/` - Лендинг страница
- `/app` - Основное приложение (будет реализовано позже)

## Особенности

- ✅ Архитектура FSD
- ✅ Tailwind CSS с кастомными темами
- ✅ Адаптивный дизайн
- ✅ Анимации и переходы
- ✅ Валидация форм через Zod
- ✅ TypeScript для типобезопасности
