'use server'

import { azureOpenAI } from '@/lib/openai'

type ChatActionProps = {
  systemMessage: string
  userMessage: string
}

async function chatAction(props: ChatActionProps) {
  const { systemMessage, userMessage } = props

  try {
    const response = await azureOpenAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
    })

    const textResponse = response.choices[0].message.content
    return { response: textResponse }
  } catch (e) {
    console.error(e)
  }

  return { response: `failed to generate response` }
}

export { chatAction }
