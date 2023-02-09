# rs-clone-api
Документация по использованию АПИ приложения - **RS-clone**.

## Регистрация/авторизация
### Регистрация

Опции запроса для регистрации:
```
url: /api/auth/register
method: POST
headers: { Content-Type: application/json }
body: { login, fullName, password }
```
Ответ с сервера при успешной регистрации:
```json
{
    "message": "User created!"
}
```

Возможные ошибки: <br>
```json
{
    "message": "This user has been registered!"
}
```
```json
{
    "message": "Minimum number of characters 6!"
}
```
```json
{
    "message": "Incorect data!"
}
```

### Авторизация
Опции запроса для авторизации:
```
url: /api/auth/register
method: POST
headers: { Content-Type: application/json }
body: { login, password }
```
Ответ при успешной аунтификации:
```json
{
    "email": "...",
    "fullName": "...",
    "data": [ ],
    "token": "...",
    "userId": "..."
}
```
Возможные ошибки:
```json
{
    "message": "Incorect password!"
}
```
```json
{
    "message": "User not found!"
}
```
```json
{
    "message": "Incorect data!" 
}
```
```json
{
    "message": "Type of name must be string!"
}
```

### JWT Token

Для дальнейшей работы с АПИ необходимо отправлять полученный "token" в заголовках запроса.

Ошибка при отсутствии токена:
```json
{
    "message": "You are not authorized!"
}
```

Ошибка при недействительном/просроченном токене:
```json
{
    "message": "Session timed out,please login again!"
}
```
Для обновления Access token:
```
url: /api/auth/refresh_token
method: POST
headers: { Content-Type: application/json } приходит при авторизации
body: { refreshToken }
```
Где поле `refreshToken` - и является вашим рефреш токеном, и если запрос проходит успешно, то мы получаем новый токен:
```json
{
    "token": "..."
}
```
Ошибка неверного рефреш токена:
```json
{
    "message": "Invalid token,please login again!"
}
```
Ошибка отсутствия рефреш токена:
```json
{
    "message": "Access denied,token missing!"
}
```
Ошибка недействительного рефреш токена:
```json
{
    "message": "Token expired!"
}
```
### Выход с аккаунта
```
url: /api/auth/logout
method: POST
headers: { Content-Type: application/json } приходит при авторизации
body: { userId }
```
Успешный ответ:
```json
{
    "message": "User logged out!"
}
```
## Работа с данными
## 
### Создание 
