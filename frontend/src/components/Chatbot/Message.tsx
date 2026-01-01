'use client';

export type ChatRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  role: Exclude<ChatRole, 'system'>;
  content: string;
  createdAt: number;
};

export default function Message({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isUser
            ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-accent text-white px-4 py-2 text-sm leading-relaxed shadow'
            : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 px-4 py-2 text-sm leading-relaxed shadow'
        }
      >
        {message.content}
      </div>
    </div>
  );
}
