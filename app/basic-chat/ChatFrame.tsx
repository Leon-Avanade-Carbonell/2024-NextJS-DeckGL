'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { chatAction } from './actions/chat'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Markdown from 'react-markdown'

export function ChatFrame() {
  const [systemMessage, setSystemMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [response, setResponse] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: chatAction,
    onSuccess: (data) => {
      console.log(data.response)
      if (data.response) setResponse(data.response)
    },
  })

  function runAction() {
    if (userMessage.length <= 3) return
    mutate({
      systemMessage,
      userMessage: userMessage,
    })
  }

  return (
    <div className="border-1 grid max-w-2xl gap-2 rounded-xl bg-cyan-100 p-2">
      <Textarea
        placeholder="System Message"
        value={systemMessage}
        onChange={(event) => setSystemMessage(event.target.value)}
      />

      <Textarea
        placeholder="User Message"
        value={userMessage}
        onChange={(event) => setUserMessage(event.target.value)}
      />
      <div className="flex flex-row-reverse">
        <Button
          disabled={userMessage.length <= 3 || isPending}
          onClick={() => runAction()}
        >
          Chat
        </Button>
      </div>
      {response.length >= 3 && !isPending && (
        <div className="grid w-full gap-4">
          <Markdown>{response}</Markdown>
        </div>
      )}
    </div>
  )
}
