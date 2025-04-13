// app/lib/aiClient.ts
export async function fetchAIResponse(question: string): Promise<string> {
  const url = 'https://chat-gpt-v2.p.rapidapi.com/generate_content';

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'chat-gpt-v2.p.rapidapi.com',
    },
    body: JSON.stringify({ q: question }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data.result || 'No response received.';
}
