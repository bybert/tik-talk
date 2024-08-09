import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {tap} from 'rxjs'
import {TokenResponse} from './tokenResponse'
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'
  cookieService = inject(CookieService)

  token: null | string = null
  refreshToken: null | string = null

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd,
    ).pipe(
      tap(val => {
        this.token = val.access_token
        this.refreshToken = val.refresh_token


        this.cookieService.set('token', this.token)
        this.cookieService.set('refreshToken', this.refreshToken)
      })
    )
  }
}
