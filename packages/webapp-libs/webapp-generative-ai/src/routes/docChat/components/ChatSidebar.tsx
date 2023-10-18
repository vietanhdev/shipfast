import { Button, Link, ButtonVariant } from '@sb/webapp-core/components/buttons';
import { PlusCircle, MessageCircle } from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';


const ChatSidebar = ({ chats, chatId }) => {

    return (
        <div className="w-full h-screen p-4 text-gray-200 bg-gray-300 rounded-md">
            <Button className='w-full border-dashed border-white border'>
                <PlusCircle className='mr-3 h-4 w-4 cursor-pointer' />
                New Chat
            </Button>
            <div className="flex flex-col gap-2 mt-5">
                {chats.map((chat: { id: Key | null | undefined; pdfName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                    <Link key={chat.id} href="en/doc-chat" variant={ButtonVariant.SECONDARY}>
                        <MessageCircle className="mr-2" />
                        <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">{chat.pdfName}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ChatSidebar