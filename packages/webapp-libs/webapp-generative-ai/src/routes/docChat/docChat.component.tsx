import { FormattedMessage } from 'react-intl';
import { PageHeadline } from '@shipfast/webapp-core/components/pageHeadline';
import { Chat, ChatSidebar } from '@shipfast/webapp-generative-ai/components/pdfChat';
import { PDFViewer } from '@shipfast/webapp-generative-ai/components/pdf';


export function DocChat() {
    const currentChat = {
        fileKey: "file_key",
        pdfName: "Example.PDF",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        userId: "0"
    };
    const chatList = [{
        id: 0,
        pdfName: currentChat.pdfName,
    }, {
        id: 1,
        pdfName: currentChat.pdfName,
    }];
    return (
        <div className="relative mt-4 h-full w-full">
            <PageHeadline
                className="px-8 pb-4"
                header={<FormattedMessage defaultMessage="Ask Document (Coming Soon)" id="Ask Document / title" />}
                subheader={
                    <FormattedMessage
                        defaultMessage="Chat with your documents"
                        id="Ask Document / description"
                    />
                }
            />
            <div className='h-[calc(100vh-160px)] flex-row flex mt-0 pt-0 overflow-hidden'>
                <div className='flex-[2] border-r-2 border-r-slate-200'>
                    <ChatSidebar chats={chatList} chatId={0} />
                </div>
                <div className='flex-[5] bg-gray-100'>
                    <PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
                </div>
                <div className='flex-[4] border-l-2 border-l-slate-200'>
                    <Chat chatId={0} />
                </div>
            </div>
        </div>
    )
}
