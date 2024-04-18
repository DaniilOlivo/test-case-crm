interface Deal {
    responsible_user_id: number,
    pipeline_id: number,
    status_id: number,

    status_name?: string,
    responsible_user_name?: string,
}

export interface StatusData {
    name: string
}

export interface LeadsResponse {
    _embedded: {
        leads: Deal[]
    }
}

interface User {
    id: number, 
    name: string
}

export interface UsersResponse {
    _embedded: {
        users: User[]
    }
}
