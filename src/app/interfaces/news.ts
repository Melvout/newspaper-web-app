import { Press } from './press';

export interface News extends Press
{
    thumbnail_image: string,
    thumbnail_media_type: string
}