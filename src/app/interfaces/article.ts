export interface Article
{
    id?: number,
    id_user?: number,
    is_public: boolean,
    is_deleted: boolean,
    abstract: string,
    subtitle: string,
    update_date: string,
    category: string,
    title: string

    body?: string,
    image_data?: string,
    image_description?: string,
    image_media_type?: string,

    thumbnail_image?: string,
    thumbnail_media_type?: string
}