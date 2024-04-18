// Объект сделки
export interface Deal {
    id: number,
    name: string,
    price: number,
    responsible_user_name: string,
    status_name: string,
    created_at: number
}

// Интерфейс ответа api|leads
export interface ObjectDeal {
    _page: number,
    _links: {
        self: {
            href: string
        },

        first?: {
            href: string
        },

        prev?: {
            href: string
        },

        next?: {
            href: string
        },
    },

    _embedded: {
        leads: Deal[]
    }
}