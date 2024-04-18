import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StatusData, LeadsResponse, UsersResponse } from './crmResponses.interface'

@Injectable()
export class AppService {

  // Общий метод для запросов к сервису
  reqCrm(apiUrl: string, params?: object) {
    return axios.get(process.env.URL_INTEGRATION + apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN_INTEGRATION
      },
      params
    })
  }

  async getDeals(query? : string) {
    const res = await this.reqCrm("/api/v4/leads", {query});
    const data = res.data as LeadsResponse

    // Получение статусов
    // Для оптимизации статусы сначала собираются в объект, исключая повторения
    const arrStatuses = {}
    for (const deal of data._embedded.leads) {
      if (deal.status_id in arrStatuses) continue
      arrStatuses[deal.status_id] = deal.pipeline_id
    }

    for (const [status_id, pipeline_id] of Object.entries(arrStatuses)) {
      const res = await this.reqCrm(`/api/v4/leads/pipelines/${pipeline_id}/statuses/${status_id}`);
      const dataStatus = res.data as StatusData

      for (const deal of data._embedded.leads) {
        if (deal.status_id === parseInt(status_id)) {
          deal.status_name = dataStatus.name
        }
      }
    }

    // Получение пользователей
    const resUsers = await this.reqCrm("/api/v4/users")
    const dataUser = resUsers.data as UsersResponse
    for (const user of dataUser._embedded.users) {
      for (const deal of data._embedded.leads) {
        if (deal.responsible_user_id === user.id) {
          deal.responsible_user_name = user.name
        }
      }
    }

    return res.data;
  }
}
