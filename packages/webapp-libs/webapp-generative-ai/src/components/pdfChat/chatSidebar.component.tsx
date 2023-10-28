import { FileTextIcon } from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { Dropzone } from '@shipfast/webapp-core/components/forms';


export const ChatSidebar = ({ chats, chatId }: { chats: any, chatId: number }) => {
    return (
        <div className="w-full h-screen p-4 text-gray-200">
            <Dropzone label="Upload new file" />
            <div className="flex flex-col gap-2 mt-8">
                {chats.map((chat: { id: Key | null | undefined; pdfName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                    <a key={chat.id} href="en/doc-chat" className={"flex px-2 py-1 mt-1" + (chatId === chat.id ? " text-gray-800 border-2 border-gray-300 rounded-md" : " text-gray-300")}>
                        <FileTextIcon className="mr-2" />
                        <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis font-bold">{chat.pdfName}</p>
                    </a>
                ))}
            </div>
        </div>
    )
};