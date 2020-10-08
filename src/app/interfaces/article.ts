import { Press } from './press';

export interface Article extends Press
{
    body: string,
    image_data: string,
    image_description: string,
    image_media_type: string
}