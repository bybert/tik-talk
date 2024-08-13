import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError, tap, throwError} from 'rxjs'
import {TokenResponse} from './tokenResponse'
import {CookieService} from 'ngx-cookie-service'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
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
      tap(val => this.saveTokens(val))
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      {
        refresh_token: this.refreshToken,
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(error => {
        this.logout()
        return throwError(error)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token
    this.refreshToken = res.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}
