"use client"
import React from 'react'
import { Inbox, Loader2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

const FileUpload = () => {
    const [uploading, setUploading] = React.useState(false)

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {

            const file = acceptedFiles[0]
            if (file.size > 10 * 1024 * 1024) { //>10 MB
                // alert("File size too large. Please upload a file less than 10 MB.")
                return
            }
            try {
                setUploading(true)
                // const data = await uploadToS3(file)
                const data = null;
                return;
            } catch (error) {
                console.log(error)
            }
            finally {
                setUploading(false)
            }
        }
    })
    return (
        <div className='p-4 bg-white rounded-xl'>
            <div className=' border-dashed border-2 border-slate-500  rounded-xl cursor-pointer flex flex-col items-center text-center bg-gray-50 py-8'
                {...getRootProps({

                })}
            >
                <input type="text" {...getInputProps()} />
                {uploading ? (
                    <>
                        <Loader2 className='w-8 h-8 text-blue-500 animate-spin' />
                        <p>
                            GPT is going through your PDF...
                        </p>
                    </>
                ) : (<>
                    <Inbox className='w-8 h-8 text-blue-500' />
                    <p className='mt-2 text-sm text-slate-400'>Drop PDF here</p>
                </>)}

            </div>
        </div>
    )
}

export default FileUpload