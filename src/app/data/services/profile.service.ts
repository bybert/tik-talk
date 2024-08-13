import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Profile} from '../interfaces/profile.interface'
import {Pageble} from '../interfaces/pageble.interface'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
  }

  getSubscribersShortlist() {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers`)
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
