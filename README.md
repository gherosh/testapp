<table>
<tr><td>
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="250">
</td>
<td>
    <img alt="react" align="right" src="https://create-react-app.dev/img/logo.svg" width="100" />
</td>
</tr>
</table>

## testapp

### backend
- `cd testapp`
- `cp .env.example .env` adjust accordingly 
- `composer install`
- `touch database/database.sqlite`
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan serve`

### frontend
- `cd testapp/frontapp`
- `npm install`
- adjust accordingly `./src/config.js`
- `npm start`

