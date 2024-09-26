import { AzureOpenAI } from 'openai'

const apiKey = process.env.AZURE_OPENAI_KEY || ''
const baseURL = process.env.AZURE_OPENAI_ENDPOINT || ''

const deployment = 'gpt-4o-mini'
const apiVersion = '2023-03-15-preview'
export const azureOpenAI = new AzureOpenAI({
  endpoint: baseURL,
  apiKey,
  apiVersion,
  deployment,
})
