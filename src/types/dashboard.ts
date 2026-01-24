
export interface ResidentsData {
    by_zone:
    {
        zone_id: string,
        zone_name: string,
        count: number,
    }[],
    growth:
    {
        month: string,
        count: number,
    }[],
}

export interface ResidentsResponse {
    data: ResidentsData;
}

export interface FeedbacksData {
    summary: {
        total: number,
        new: number,
        average_rating: number,
        negative: number
    },
    trends:
    {
        date: string,
        average_rating: number,
    }[],
    category_breakdown:
    {
        category: number,
        count: number,
    }[],
}

export interface FeedbacksResponse {
    data: FeedbacksData;
}

export interface BookingsData {
    summary: {
        today_total: number,
        today_booked: number,
        today_cancelled: number,
        occupancy_rate: number
    },
    trends:
    {
        date: string,
        booked: number,
        cancelled: number
    }[],
    top_facilities:
    {
        facility_id: string,
        facility_name: string,
        bookings: number
    }[],
    cancel_reasons:
    {
        reason: string,
        count: number
    }[],
}

export interface BookingsResponse {
    data: BookingsData;
}

export interface ReferendumsData {
    summary: {
        total: number,
        active: number,
        finished: number,
        participation_rate: number
    },
    trends:
    {
        referendum_id: string,
        title: string,
        date: string,
        participation: number
    }[]
}

export interface ReferendumsResponse {
    data: ReferendumsData;
}

export interface EventsData {
    by_month:
    {
        month: string,
        events: number
    }[],
    status: {
        0: number,  //Draft
        1: number,  //Pending
        2: number,  //Rejected
        3: number  //Active
    }
}

export interface EventsResponse {
    data: EventsData;
}

// BE không bọc data nên lấy thẳng RecentResponse luôn mà không có RecentData
export interface RecentResponse {
    residents:
    {
        id: string,
        name: string,
        avatar: string,
        status_resident: number, //0 - pending, 1 - active, 2 - rejected, 3 - blocked,
        created_at: string
    }[],
    news:
    {
        id: string,
        title: string,
        scope: string,
        created_at: string
    }[],
    events:
    {
        id: string,
        title: string,
        status: number, // 0 Draft 1 Pending 2 Rejected 3 Active        
        start_time: string
    }[],
    bookings:
    {
        id: string,
        facility_name: string,
        action: string,
        action_at: string
    }[],
    feedback:
    {
        id: string,
        resident_name: string,
        rating: number,
        comment: string,
        created_at: string
    }[]
}

export interface KpisData {
    residents: {
        total: number,
        new_this_month: number,
        0: number,  //pending
        // 1: number,
        2: number,  //rejected
        3: number   //blocked
    },
    news: {
        total: number,
        0: number,  //draft
        1: number,  //published
    },
    events: {
        0: number,  //draff
        1: number,  //pending
        2: number   //rejected
    },
    facilities: {
        total: number,
        0: number,  //maintenance
    },
    bookings: {
        today_booked: number,
        occupancy_rate: number
    },
    feedbacks: {
        total: number,
        average_rating: number,
        negative: number
    },
    referendums: {
        active: number,
        participation_rate: number
    }
}

export interface KpisResponse {
    data: KpisData;
}