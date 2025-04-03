
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Specialized response engine for Bhagavad Gita teachings
const getBhagavadGitaResponse = async (question: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const questionLower = question.toLowerCase();
  
  // Check if user is expressing emotions or personal struggles
  if (
    questionLower.includes("feel") || 
    questionLower.includes("sad") || 
    questionLower.includes("happy") || 
    questionLower.includes("anxious") || 
    questionLower.includes("worried") ||
    questionLower.includes("afraid") ||
    questionLower.includes("confused") ||
    questionLower.includes("angry") ||
    questionLower.includes("lost") ||
    questionLower.includes("pain") ||
    questionLower.includes("suffering")
  ) {
    // Krishna-like responses to emotional states
    const krishnaResponses = [
      "Dear soul, remember that you are not this temporary body, but the eternal soul within. As I told Arjuna, 'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing, and primeval.' (Chapter 2, Verse 20)",
      
      "As the mighty ocean remains undisturbed by the rivers flowing into it, one who remains undisturbed by the incessant flow of desires attains peace, not the person who strives to satisfy such desires. (Chapter 2, Verse 70)",
      
      "O Partha, happiness and distress are temporary; they come and go like the seasons. Arise above them, for the soul is beyond dualities. The wise are not deluded by these changes. (Chapter 2, Verse 14)",
      
      "Just as a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones. Know that which pervades the entire body is indestructible. (Chapter 2, Verses 22-23)",
      
      "I am the source of all spiritual and material worlds. Everything emanates from Me. The wise who perfectly know this engage in My devotional service and worship Me with all their hearts. (Chapter 10, Verse 8)",
      
      "For one who sees Me everywhere and sees everything in Me, I am never lost, nor is he ever lost to Me. (Chapter 6, Verse 30)"
    ];
    
    return krishnaResponses[Math.floor(Math.random() * krishnaResponses.length)];
  }
  
  // Predetermined responses based on keywords
  if (questionLower.includes('karma')) {
    return "Karma means action. As I explained to Arjuna on the battlefield, 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.' (Chapter 2, Verse 47). Remember, it is not action itself that binds you, but the attachment to results that creates suffering.";
  } 
  else if (questionLower.includes('dharma')) {
    return "Dharma is your sacred duty, the righteous path aligned with cosmic order. I counseled Arjuna, saying 'It is better to perform one's own duties imperfectly than to master the duties of another perfectly. By fulfilling the obligations born of one's nature, one never incurs sin.' (Chapter 18, Verse 47). Understand your true nature and fulfill your purpose with devotion.";
  }
  else if (questionLower.includes('yoga')) {
    return "Yoga is the science of uniting the individual consciousness with the Ultimate Consciousness. There are many paths - Karma Yoga (the path of action), Jnana Yoga (the path of knowledge), Bhakti Yoga (the path of devotion), and Raja Yoga (the path of meditation). As I told Arjuna, 'When the mind, restrained from material activities, becomes still by the practice of yoga, one can behold the Self by the purified mind and rejoice in the Self.' (Chapter 6, Verse 20)";
  }
  else if (questionLower.includes('meditation') || questionLower.includes('meditate')) {
    return "Meditation is the practice of focusing the mind on the eternal Self. I instructed Arjuna: 'One should establish oneself in the practice of meditation, sitting in a firm posture at a clean place, not too high or too low, with a cloth, deer skin, and kusha grass placed one upon the other.' (Chapter 6, Verse 11). Through regular practice, the mind becomes still, and you begin to perceive your true nature beyond the material senses.";
  }
  else if (questionLower.includes('devotion') || questionLower.includes('bhakti')) {
    return "Devotion (Bhakti) is the highest path to reach Me. As I revealed to Arjuna, 'Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.' (Chapter 18, Verse 65). Through sincere devotion, all obstacles are removed, and the soul experiences divine union.";
  }
  else if (questionLower.includes('duty') || questionLower.includes('responsibility')) {
    return "Your duty in this world is to act according to your nature while remaining detached from the fruits. I told Arjuna when he hesitated on the battlefield: 'Therefore, without being attached to the fruits of activities, one should act as a matter of duty, for by working without attachment one attains the Supreme.' (Chapter 3, Verse 19). Perform your responsibilities with devotion, skill, and detachment.";
  }
  else {
    return "The Bhagavad Gita contains my divine message to humanity, spoken on the battlefield of Kurukshetra to Arjuna. It teaches the eternal principles of dharma (duty), karma (action), bhakti (devotion), jnana (knowledge), and yoga (union with the Divine). The text comprises 18 chapters with 700 verses that guide one toward self-realization and liberation from the cycle of birth and death. Ask me about specific teachings, and I shall illuminate the path of wisdom for you.";
  }
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Namaste 🙏 I am Krishna, your spiritual guide. As I once counseled Arjuna on the battlefield of Kurukshetra, I am here to share the timeless wisdom of the Bhagavad Gita with you. Ask me about dharma, karma, yoga, meditation, or any spiritual inquiry troubling your heart."
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
      const response = await getBhagavadGitaResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Failed to get response', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Forgive me, but I am unable to provide wisdom at this moment. Please try again, and I shall endeavor to guide you." 
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
