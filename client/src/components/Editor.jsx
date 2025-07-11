import React, { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './firebase'; // Assuming you have initialized Firebase in a separate file
// import { data } from 'autoprefixer';
import { toast } from 'react-hot-toast';

const Editor = ({ editorContent, onChange, isReadOnly = false }) => {
    // const [editorContent, setEditorContent] = useState(blogContent[0] || {});

    useEffect(() => {
        const editor = new EditorJS({
            readOnly: isReadOnly,
            holder: 'editorjs',
            placeholder: 'Blog Content',
            data: editorContent,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link'],
                },
                list: {
                    class: List,
                    inlineToolbar: ['link', 'bold'],
                },
                embed: {
                    class: Embed,
                    inlineToolbar: false,
                    config: {
                        services: {
                            youtube: true,
                            coub: true,
                        },
                    },
                },
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
            },
            onChange: () => {
                editor.save().then((outputData) => {
                    onChange(outputData);
                });
            },
        });

        return () => {
            editor.destroy();
        };
    }, []);

    return <div id="editorjs"></div>;
};

export default Editor;
