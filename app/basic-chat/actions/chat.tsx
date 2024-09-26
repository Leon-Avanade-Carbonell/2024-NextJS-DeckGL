'use server'

type ChatActionProps = {
  systemMessage?: string
  userMessage: string
}

async function chatAction(props: ChatActionProps) {
  console.table(props)
}

export { chatAction }
