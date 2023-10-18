import { FormattedMessage } from 'react-intl';
import { PageHeadline } from '@sb/webapp-core/components/pageHeadline';
import ChatSidebar from './components/ChatSidebar';
import PDFViewer from './components/PDFViewer';
import ChatComponent from './components/ChatComponent';


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
    }];
    return (
        <div className="flex-1 space-y-4 mt-4">
            <PageHeadline
                className="px-8"
                header={<FormattedMessage defaultMessage="DocGPT" id="DocGPT / title" />}
                subheader={
                    <FormattedMessage
                        defaultMessage="Chat with your documents"
                        id="DocGPT / description"
                    />
                }
            />
            <div className="flex-1">
                <div className='flex-row flex mt-0 pt-0 space-y-0 p-4'>
                    <div className='flex-[2] max-w-xs'>
                        <ChatSidebar chats={chatList} chatId={0} />
                    </div>
                    <div className='max-h-screen p-2 flex-[5]'>
                        <PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
                    </div>
                    <div className='flex-[3] border-l-4 border-l-slate-200'>
                        <ChatComponent chatId={0} />
                    </div>
                </div>
            </div>
        </div>
    )
}
