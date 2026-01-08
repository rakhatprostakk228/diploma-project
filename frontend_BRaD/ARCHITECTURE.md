# Архитектура проекта

## Структура FSD (Feature-Sliced Design)

```
src/
├── app/                          # Инициализация приложения
│   ├── providers/
│   │   └── router/
│   │       └── ui/
│   │           └── AppRouter.tsx # Роутинг приложения
│   └── index.tsx                  # Точка входа
│
├── pages/                         # Страницы приложения
│   ├── home/                      # Главная страница
│   ├── admin-dashboard/           # Админ: Дашборд
│   ├── admin-jobs/                # Админ: Управление вакансиями
│   └── admin-users/               # Админ: Управление пользователями
│
├── widgets/                       # Крупные составные блоки UI
│   ├── header/                    # Шапка сайта
│   ├── footer/                    # Подвал сайта
│   ├── hero/                      # Hero секция с поиском
│   ├── opportunities/             # Список вакансий
│   └── admin-sidebar/             # Боковое меню админки
│
├── features/                      # Функциональные возможности
│   ├── job-search/                # Поиск вакансий
│   ├── job-filter/                # Фильтрация вакансий
│   ├── job-form/                  # Форма создания/редактирования вакансий
│   └── user-form/                 # Форма создания/редактирования пользователей
│
├── entities/                      # Бизнес-сущности
│   ├── job/
│   │   ├── model/
│   │   │   ├── types.ts           # TypeScript типы
│   │   │   ├── schemas.ts         # Zod схемы валидации
│   │   │   └── store.ts           # Zustand store
│   │   ├── api/
│   │   │   └── jobApi.ts          # Axios API методы
│   │   └── index.ts               # Публичный API
│   └── user/                      # Аналогичная структура
│
└── shared/                        # Переиспользуемый код
    ├── ui/                        # UI компоненты
    │   ├── Button/
    │   └── Input/
    ├── lib/
    │   └── axios.ts              # Настройка Axios
    ├── styles/
    │   └── global.css            # Глобальные стили
    └── types/
        └── index.ts              # Общие типы
```

## Поток данных

```
User Action
    ↓
Feature Component (JobForm)
    ↓
react-hook-form + Zod (валидация)
    ↓
Entity Store (useJobStore.createJob)
    ↓
Entity API (jobApi.create)
    ↓
Axios (HTTP запрос)
    ↓
Backend API
    ↓
Store обновляется автоматически
    ↓
Все компоненты, использующие useJobStore, получают обновленные данные
```