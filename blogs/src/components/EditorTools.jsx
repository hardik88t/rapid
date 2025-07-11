// tools.js
import React, { useEffect, useState } from 'react';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
// import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
// import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { toast } from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './firebase'; // Assuming you have initialized Firebase in a separate file


export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    // warning: Warning,
    code: Code,
    linkTool: LinkTool,
    // image: ImageTool,
    image: {
        class: ImageTool,
        config: {
            uploader: {
                async uploadByFile(file) {
                    const storage = getStorage(app);
                    const fileName = new Date().getTime() + '-' + file.name;
                    const storageRef = ref(storage, fileName);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    // Show a toast indicating file upload is in progress
                    const toastId = toast.loading('Uploading file...');

                    try {
                        await uploadTask;
                        const downloadURL = await getDownloadURL(storageRef);
                        // Dismiss the toast when the upload is complete
                        toast.success('File uploaded successfully.');
                        return {
                            success: 1,
                            file: {
                                url: downloadURL,
                            },
                        };
                    } catch (error) {
                        console.error('Error uploading file:', error);
                        // Dismiss the toast and show an error toast if the upload fails
                        toast.error('File upload failed.');
                        return {
                            success: 0,
                            message: 'File upload failed',
                        };
                    } finally {
                        // Dismiss the toast when the upload process is complete (whether successful or failed)
                        toast.dismiss(toastId);
                    }
                },
            },
        },
    },

    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
}
