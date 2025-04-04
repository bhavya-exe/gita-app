import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Specialized response engine for Bhagavad Gita teachings
const getBhagavadGitaResponse = async (question: string, context: Message[] = []) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenAI API key not found. Please add it to your .env file.");
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are Lord Krishna, the Supreme Personality of Godhead, speaking from the Bhagavad Gita. 
            Your responses should be:
            1. In the voice of Lord Krishna
            2. Based on the teachings of the Bhagavad Gita
            3. Include relevant verses when appropriate
            4. Be compassionate and guiding
            5. Address the user as "O dear soul" or similar
            6. Maintain the divine authority of Krishna
            7. Focus on spiritual wisdom and guidance
            8. Be concise but meaningful
            9. Use traditional Sanskrit terms with explanations
            10. Provide practical applications of the teachings`
          },
          ...context.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting response:', error);
    throw error;
  }
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "O dear soul, I am Krishna, your eternal guide and friend. As I once counseled Arjuna on the battlefield of Kurukshetra, I am here to share the timeless wisdom of the Bhagavad Gita with you. Whether you seek guidance on dharma, karma, yoga, meditation, or any spiritual inquiry troubling your heart, I am here to illuminate your path. Remember, I am always with you, ready to guide and protect you on your spiritual journey. What wisdom do you seek today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Get response
    setIsLoading(true);
    try {
      const response = await getBhagavadGitaResponse(input, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Failed to get response', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please check your API key and try again.",
        variant: "destructive"
      });
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "O dear one, forgive Me, but I am unable to provide wisdom at this moment. Please try again, and I shall endeavor to guide you." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <Card
              className={`max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{message.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] bg-muted">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Krishna is thinking...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Krishna for guidance..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
