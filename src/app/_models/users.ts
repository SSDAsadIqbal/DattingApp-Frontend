export interface User {
        username: string;
        token: string;
        userPhotoUrl: string;
}

export interface Root {
        id: number
        userName: string
        age: number
        knownAs: string
        created: string
        lastActive: string
        gender: string
        introduction: string
        lookingFor: string
        interests: string
        city: string
        country: string
        photos: Photo[]
}

export interface Photo {
        id: number
        data: string
        isMain: string
}
