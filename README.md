
## Тестовое задание Avito: GitHub Dashboard

> Ссылка на задание: [https://github.com/avito-tech/pro-fe-trainee-task/blob/master/README.md](https://github.com/avito-tech/pro-fe-trainee-task/blob/master/README.md)


## Используемые технологии
* **React** для реактивного манипулирования DOM деревом
* **Redux + RTK** для логики состояния приложения
* **Redux-thunk** для ассинхронных _actions_
* **React-redux + hooks** биндинг для redux + мемоизированные селекторы

## Запуск

    git clone https://github.com/ValeriiMakhniuk/avito-github-dashboard.git
    cd avito-github-dashboard
    npm install
    npm start

## Возможности

1. При незаполненном поле поиска отображаются топ 10 репоизториев по кол-ву звезд
2. Хранение последнего поискового запроса + страницы в `localStorage`
3. Удобный интерфейс поиска GitHub репозиториев и просмотра детальной информации по репозиторию

## TO-DO

 - [x] **React-router**: для возмности сохранения закладок и навигирования
 - [ ] Сохранение выбранной страницы в пагинации в `localStorage` _with throttle()_
 - [ ] **CSS variables**: для переиспользования цветовой схемы и размера
...
