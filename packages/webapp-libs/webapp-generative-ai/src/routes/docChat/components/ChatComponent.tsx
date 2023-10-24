"use client"
import { useEffect, useState } from 'react'
import { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { Button, Link, ButtonVariant } from '@sb/webapp-core/components/buttons';
import { Input } from "./ui/input"
import MessageList from './MessageList'

type Props = { chatId: number }

const ChatComponent = ({ chatId }: Props) => {
    const data: any[] = [];
    const [isLoading, setIsLoading] = useState(false);

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
            <MessageList messages={messages} isLoading={isLoading} />
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

export default ChatComponent;
