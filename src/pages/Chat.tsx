
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// In a real app, you'd connect this to an actual API
const mockResponse = async (question: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Predetermined responses based on keywords
  if (question.toLowerCase().includes('karma')) {
    return "Karma means action. The Bhagavad Gita teaches that we should perform our duties without attachment to the fruits of our actions. Chapter 2 Verse 47 states: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.'";
  } else if (question.toLowerCase().includes('dharma')) {
    return "Dharma refers to one's duty or righteous way of living. The Gita emphasizes following one's dharma (svadharma) even when it's difficult. 'It is better to perform one's own duties imperfectly than to master the duties of another.' (Chapter 3, Verse 35)";
  } else {
    return "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It records the conversation between prince Arjuna and Lord Krishna during the Kurukshetra War. Krishna counsels Arjuna about action, knowledge, devotion, and the proper understanding of one's own nature. If you have specific questions about its teachings, feel free to ask.";
  }
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Namaste 🙏 I'm your Gita Wisdom guide. Ask me anything about the Bhagavad Gita's teachings, and I'll do my best to assist you on your spiritual journey."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await mockResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Failed to get response', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I couldn't process your question. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Bhagavad Gita..."
            className="min-h-[60px] resize-none"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send />
          </Button>
        </div>
      </form>
    </div>
  );
}
