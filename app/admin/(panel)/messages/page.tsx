import { MessageList } from '@/components/admin/message-list';
import { PageTitle } from '@/components/admin/page-title';
import { adminGetMessages } from '@/lib/admin-content';

export default async function AdminMessagesPage() {
  const messages = await adminGetMessages();
  const unread = messages.filter((message) => !message.read).length;

  return (
    <div>
      <PageTitle
        title="Messages"
        description={
          unread > 0
            ? `${unread} unread of ${messages.length} total.`
            : 'Everything sent through the contact form.'
        }
      />
      <MessageList messages={messages} />
    </div>
  );
}
