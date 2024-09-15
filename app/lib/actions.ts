"use server"

import {Storage} from '@google-cloud/storage';

export const UploadFile = async (form: FormData) => {
    try {

        const file = form.get('file') as File;
        if (!file) throw new Error('No file provided.');
        if (file.size < 1) throw new Error('File is empty.');

        const storage = new Storage();

        await storage


        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}