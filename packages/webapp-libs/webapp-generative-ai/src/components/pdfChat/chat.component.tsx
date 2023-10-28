"use client"
import { Button, ButtonVariant } from '@shipfast/webapp-core/components/buttons';
import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { useEffect } from 'react';
import { Input } from "./input.component";
import { MessageList } from './messageList.component';

type Props = { chatId: number }

const Chat = ({ chatId }: Props) => {
    const data: any[] = [];
    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: '/api/chat',
        body: {
            chatId
        },
        initialMessages: data || []
    })
    useEffect(() => {
        const messageContainer = document.getElementById('message-container')
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: 'smooth'
            })
        }
    })

    return (
        <div
            className="relative max-h-screen overflow-auto h-full"
            id="message-container"
        >
            <div className="absolute top-0 inset-x-0 p-4 bg-white">
                <h3 className="text-xl font-bold">Chat</h3>
            </div>
            <MessageList messages={messages} isLoading={true} />
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 inset-x-0 px-4 py-4 bg-white"
            >
                <div className="flex">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask any question..."
                        className="w-full"
                    />
                    <Button className='ml-2' variant={ButtonVariant.PRIMARY}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export { Chat };
