export interface BotResponse {
  message: string;
  points?: number;
  badge?: string;
}

// Career guidance data
const resumeTips = [
  "Resume banate time clarity aur keywords bahut important hote hain. ATS-friendly format use karo! 📄",
  "Apne achievements ko numbers ke saath highlight karo - 'Increased efficiency by 30%' sounds better! 📊",
  "Skills section mein relevant technologies mention karo jo job description mein hain. Match karo! 🎯",
  "Projects section mein GitHub links aur live demos zaroor add karo. Recruiters ko dekhna pasand hai! 💻",
  "One-page resume best hai for freshers. Concise aur impactful rakho! ✨",
];

const interviewTips = [
  "Interview mein confidence key hai! Practice karo mirror ke saamne. You got this! 💪",
  "STAR method use karo answers ke liye: Situation, Task, Action, Result. Structured lagta hai! ⭐",
  "Company ke baare mein research zaroor karo. 'Why this company?' ka answer ready rakho! 🔍",
  "Technical questions ke liye DSA practice karo - LeetCode, HackerRank best hain! 💻",
  "Body language matters! Eye contact rakho aur smile karo. Positive vibes! 😊",
];

const motivationalQuotes = [
  "Har expert bhi kabhi beginner tha! Keep learning, keep growing! 🌱",
  "Failure is not opposite of success, it's part of success! Himmat mat haro! 💪",
  "Small progress is still progress. Celebrate your wins! 🎉",
  "Your only competition is who you were yesterday. Keep improving! 🚀",
  "Dream big, work hard, stay focused! Success zaroor milegi! ✨",
  "Coding seekhna marathon hai, sprint nahi. Patience rakho! 🏃‍♂️",
  "Agra se bhi Silicon Valley tak ka safar possible hai! Believe in yourself! 🌟",
];

const studyHacks = [
  "Pomodoro Technique try karo: 25 min focus + 5 min break. Productivity badh jaati hai! ⏰",
  "Active recall use karo - notes padhne se zyada questions solve karo! 🧠",
  "Subah jaldi uthke padho - mind fresh rehta hai aur distractions kam! 🌅",
  "Group study sessions organize karo - ek dusre ko sikhane se khud bhi clear hota hai! 👥",
  "Handwritten notes digital se better hote hain memory ke liye! ✍️",
];

const codingPuzzles = [
  {
    question: "Quick puzzle! 🧩 Agar ek array hai [1,2,3,4,5], reverse karne ka simplest way kya hai JavaScript mein?",
    hint: "Array method hai jo directly reverse kar deta hai!",
    answer: "arr.reverse()",
  },
  {
    question: "Riddle time! 🤔 Main hamesha badhta hoon, kabhi kam nahi hota. Programmers mujhe track karte hain. Main kaun hoon?",
    hint: "Version control se related hai!",
    answer: "Commit count / Version number",
  },
  {
    question: "Coding challenge! 💻 FizzBuzz ka logic batao - 3 se divisible pe Fizz, 5 se pe Buzz, dono se pe FizzBuzz!",
    hint: "Modulo operator (%) use karo!",
    answer: "if(n%15==0) FizzBuzz, else if(n%3==0) Fizz, else if(n%5==0) Buzz",
  },
];

const communityIdeas = [
  "Study group banana chahte ho? Discord ya WhatsApp group bana lo aur regular sessions rakho! 👥",
  "Hackathons mein participate karo - MLH, DevFolio pe check karo upcoming events! 🏆",
  "Open source contribute karo - GitHub pe 'good first issue' label search karo! 🌟",
  "LinkedIn pe active raho - apne projects share karo aur network banao! 💼",
  "Local meetups attend karo - Agra mein bhi tech communities hain! 🤝",
];

const techNews = [
  "AI aur Machine Learning ka demand bahut badh raha hai! Python aur TensorFlow seekho! 🤖",
  "Web3 aur Blockchain future hai - Solidity aur smart contracts explore karo! ⛓️",
  "Cloud computing skills (AWS, Azure) bahut valuable hain companies ke liye! ☁️",
  "DevOps aur CI/CD pipeline knowledge se alag stand out kar sakte ho! 🔧",
  "Mobile development (React Native, Flutter) bhi great career option hai! 📱",
];

// Detect intent from user message
function detectIntent(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("resume") || lowerMsg.includes("cv")) return "resume";
  if (lowerMsg.includes("interview") || lowerMsg.includes("placement")) return "interview";
  if (lowerMsg.includes("motivat") || lowerMsg.includes("inspire") || lowerMsg.includes("demotivat")) return "motivation";
  if (lowerMsg.includes("study") || lowerMsg.includes("padhai") || lowerMsg.includes("learn")) return "study";
  if (lowerMsg.includes("quiz") || lowerMsg.includes("puzzle") || lowerMsg.includes("riddle") || lowerMsg.includes("challenge")) return "puzzle";
  if (lowerMsg.includes("community") || lowerMsg.includes("group") || lowerMsg.includes("friend") || lowerMsg.includes("team")) return "community";
  if (lowerMsg.includes("job") || lowerMsg.includes("internship") || lowerMsg.includes("career")) return "career";
  if (lowerMsg.includes("coding") || lowerMsg.includes("programming") || lowerMsg.includes("code")) return "coding";
  if (lowerMsg.includes("project") || lowerMsg.includes("idea")) return "project";
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("namaste") || lowerMsg.includes("hey")) return "greeting";
  
  return "general";
}

// Get random item from array
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Main bot response function
export async function getBotResponse(
  userMessage: string,
  currentPoints: number,
  currentBadges: string[]
): Promise<BotResponse> {
  const intent = detectIntent(userMessage);
  let response: BotResponse = { message: "" };

  switch (intent) {
    case "greeting":
      response.message = `Hey! 👋 Kaise ho? Main yahan hoon tumhari help ke liye! 
      
Tum mujhse ye sab pooch sakte ho:
📝 Resume aur interview tips
💻 Coding puzzles aur quizzes
🎯 Career guidance aur job search
📚 Study hacks aur learning tips
👥 Community aur networking ideas
💪 Motivational support

Kya help chahiye? 😊`;
      response.points = 5;
      break;

    case "resume":
      response.message = `${getRandom(resumeTips)}

Pro tip: Apne resume ko 3 logon se review karwao before applying. Fresh eyes mistakes catch kar lete hain! 👀

Aur kuch help chahiye resume mein? 😊`;
      response.points = 10;
      if (!currentBadges.includes("Resume Pro") && currentPoints + 10 >= 50) {
        response.badge = "Resume Pro";
      }
      break;

    case "interview":
      response.message = `${getRandom(interviewTips)}

Remember: Interview ek conversation hai, interrogation nahi! Relax raho aur apne best version dikhao! 💫

Mock interviews practice karna hai? Bolo, main questions de sakta hoon! 🎤`;
      response.points = 10;
      if (!currentBadges.includes("Interview Ready") && currentPoints + 10 >= 50) {
        response.badge = "Interview Ready";
      }
      break;

    case "motivation":
      response.message = `${getRandom(motivationalQuotes)}

Yaad rakho: Tier 2-3 college se bhi top companies mein log jaate hain! Skills matter karti hain, college tag nahi! 🎓

Aur kuch motivational support chahiye? Main hamesha yahan hoon! 💙`;
      response.points = 5;
      break;

    case "study":
      response.message = `${getRandom(studyHacks)}

Consistency is key! Roz thoda thoda karo, ek din mein sab karne se better hai! 📈

Study schedule banane mein help chahiye? 📅`;
      response.points = 10;
      if (!currentBadges.includes("Study Master") && currentPoints + 10 >= 100) {
        response.badge = "Study Master";
      }
      break;

    case "puzzle":
      const puzzle = getRandom(codingPuzzles);
      response.message = `${puzzle.question}

💡 Hint: ${puzzle.hint}

Try karo aur batao! Agar stuck ho toh answer bhi de sakta hoon! 🧠`;
      response.points = 15;
      if (!currentBadges.includes("Puzzle Solver") && currentPoints + 15 >= 75) {
        response.badge = "Puzzle Solver";
      }
      break;

    case "community":
      response.message = `${getRandom(communityIdeas)}

Community building se networking hoti hai aur opportunities milti hain! Don't underestimate the power of connections! 🌐

Koi specific community join karna hai? Batao, main suggest kar sakta hoon! 🤝`;
      response.points = 10;
      if (!currentBadges.includes("Community Builder") && currentPoints + 10 >= 80) {
        response.badge = "Community Builder";
      }
      break;

    case "career":
      response.message = `Career guidance ke liye kuch important points:

1️⃣ Skills > Degree - Focus on practical skills
2️⃣ Build projects - Portfolio matters!
3️⃣ Network actively - LinkedIn, Twitter use karo
4️⃣ Apply consistently - 100 applications normal hai
5️⃣ Keep learning - Tech field mein continuous learning zaroori hai

Entry-level jobs ke liye: Internshala, AngelList, LinkedIn Jobs check karo! 💼

Specific career path ke baare mein puchho - Web Dev, Data Science, etc.? 🚀`;
      response.points = 15;
      break;

    case "coding":
      response.message = `Coding skills improve karne ke liye:

📚 Resources:
- FreeCodeCamp (free hai!)
- The Odin Project
- CS50 (Harvard ka course)
- YouTube channels: CodeWithHarry, Apna College

💻 Practice platforms:
- LeetCode (DSA ke liye)
- HackerRank
- Codechef
- Codeforces

Daily 1-2 problems solve karo. Consistency se hi mastery aati hai! 🎯

Kaunsi language ya topic seekhna hai? 🤔`;
      response.points = 10;
      if (!currentBadges.includes("Code Warrior") && currentPoints + 10 >= 120) {
        response.badge = "Code Warrior";
      }
      break;

    case "project":
      response.message = `Project ideas jo resume mein achhe lagte hain:

🌟 Beginner:
- Todo App with authentication
- Weather App using API
- Portfolio website

🚀 Intermediate:
- E-commerce website
- Social media clone
- Chat application

💎 Advanced:
- Real-time collaboration tool
- AI-powered application
- Full-stack SaaS product

Pro tip: GitHub pe code push karo aur README achhi likho! Recruiters dekhte hain! 📝

Kaunsa project banana chahte ho? Main guide kar sakta hoon! 💪`;
      response.points = 15;
      break;

    default:
      response.message = `Hmm, interesting question! 🤔

Main tumhari help kar sakta hoon:
- 📝 Resume aur interview prep
- 💻 Coding aur learning resources
- 🎯 Career guidance
- 💪 Motivation aur study tips
- 👥 Community building

Thoda aur specific batao, main better help kar paunga! 😊

${getRandom(techNews)}`;
      response.points = 5;
      break;
  }

  return response;
}