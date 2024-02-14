export interface Post {
    titel: string,
    permalink: string,
    category: {
        categgoryId: string,
        category: string,
    },
    postImgPath: string,
    excerpt: string,
    content: string,
    isFeatured: boolean,
    views: number,
    status: string,
    createdAt: Date
}
