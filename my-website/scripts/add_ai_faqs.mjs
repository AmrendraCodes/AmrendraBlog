import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const faqs = [
  {
    id: "faq_1",
    question: "How much does it cost to build an AI agent for a business?",
    answer: "Building an AI agent for a business usually costs between $8,000 and $150,000. The price depends on how complex the task is and how many tools it connects with. Most small businesses end up paying $15,000 to $50,000 for a working, production ready agent."
  },
  {
    id: "faq_2",
    question: "What is the difference between an AI agent and a chatbot?",
    answer: "A chatbot mostly answers questions in one back and forth reply. An AI agent goes further. It can take a goal, decide the steps needed, and act on its own, like updating a CRM or sending a follow up, without waiting for a person to click every step."
  },
  {
    id: "faq_3",
    question: "How long does it take to build an AI agent?",
    answer: "A single, well planned AI agent can usually be built in two to three weeks if the goal is clear from the start. Bigger projects that touch several systems, like billing and support tools together, take longer and often move in weekly sprints instead of one big launch."
  },
  {
    id: "faq_4",
    question: "Is an AI agent worth it for a small business?",
    answer: "Yes, if it solves one clear problem. A small business that saves twenty hours a week on repetitive tasks can save thousands each month. Most well planned agents pay back their build cost within six to twelve months through saved time or extra leads captured."
  },
  {
    id: "faq_5",
    question: "What are the different types of AI agents?",
    answer: "There are four common types. Rule based agents follow fixed steps. RAG agents pull answers from your own documents before replying. Task agents plan and act on their own, like updating records. Multi agent systems use several agents working together on one workflow."
  },
  {
    id: "faq_6",
    question: "How much does it cost to run an AI agent every month?",
    answer: "Running costs usually sit between $200 and $1,500 a month, mostly for API calls and hosting. A simple agent that answers FAQs stays near the lower end, while an agent that connects to your CRM, billing, and support tools costs more as usage grows."
  },
  {
    id: "faq_7",
    question: "Should I hire an agency or build an AI agent in house?",
    answer: "It depends on your team's skill and time. Most businesses don't need a full in house team for one agent. Working with a vendor who hands over full source code and data ownership keeps your options open if you want to switch later."
  },
  {
    id: "faq_8",
    question: "What should I check before hiring an AI agent development company?",
    answer: "Check who owns the code, data, and prompts once the project ends. Ask for a clear split between the one time build cost and monthly API costs. Also ask what happens when the agent isn't sure about something, a good agent should ask for help instead of guessing."
  },
  {
    id: "faq_9",
    question: "What are the most common use cases for AI agents in a business?",
    answer: "The most common ones are customer support, lead qualification, and internal tasks like updating trackers or summarizing meetings. Some businesses also use AI agents to replace single purpose software tools, folding that task into a bigger workflow instead of paying for a separate seat every month."
  },
  {
    id: "faq_10",
    question: "What is a good first AI agent project for a business to start with?",
    answer: "Start small. A single, well defined agent, like one that answers support questions from your own documents or qualifies new leads, works better than trying to automate everything at once. Once that agent proves its value, it's easier to plan the next one with real data."
  }
];

async function updateFaqs() {
  const targetSlug = 'ai-agent-development-cost-guide-2026';
  
  const updated = await prisma.blog.update({
    where: { slug: targetSlug },
    data: {
      faqs: faqs
    }
  });

  console.log(`Successfully updated FAQs for: "${updated.title}" (${updated.slug})`);
  console.log(`Total FAQs saved: ${faqs.length}`);
}

updateFaqs()
  .catch((err) => {
    console.error('Failed to update blog FAQs:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
