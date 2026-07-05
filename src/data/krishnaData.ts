import { Bot, Cpu, Lock, Smartphone, Wrench, Wind, Zap, AirVent } from "lucide-react";

export type ServiceKey = "ac" | "air_purifier" | "phone" | "android" | "wiring" | "plumbing" | "electronic";

export const serviceDefinitions = [
  {
    key: "ac" as const,
    label: "AC Repairing",
    short: "Cooling, gas, remote aur power problem",
    icon: Wind,
    issues: ["AC is not working", "AC not cooling", "AC gas refill", "AC remote temperature issue", "Other"],
  },
  {
    key: "air_purifier" as const,
    label: "Air Purifier Repairing",
    short: "Filter, sensor, fan aur power problem",
    icon: AirVent,
    issues: ["Air Purifier not turning on", "Filter change needed", "Weak airflow", "Sensor / indicator issue", "Strange smell or noise", "Other"],
  },
  {
    key: "phone" as const,
    label: "Phone Repairing",
    short: "Brand/model select karke problem bhejein",
    icon: Smartphone,
  },
  {
    key: "android" as const,
    label: "Android Lock 🔒 Crack",
    short: "Owner proof ke sath lock help",
    icon: Lock,
  },
  {
    key: "wiring" as const,
    label: "Wiring",
    short: "Ghar, shop ya office wiring work",
    icon: Zap,
  },
  {
    key: "plumbing" as const,
    label: "Plumbing",
    short: "Pipe, tap, bathroom aur leakage work",
    icon: Wrench,
  },
  {
    key: "electronic" as const,
    label: "Electronic Repairing",
    short: "Fan, mixer, board aur electronic repair",
    icon: Cpu,
  },
];

export const phoneModels: Record<string, string[]> = {
  Samsung: ["Galaxy S26", "Galaxy S25 Ultra", "Galaxy S25", "Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23", "Galaxy Z Fold 6", "Galaxy Z Flip 6", "Galaxy A55", "Galaxy A35", "Galaxy M55", "Galaxy F55"],
  iPhone: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14", "iPhone SE 2022"],
  Realme: ["Realme GT 7 Pro", "Realme GT 6", "Realme 13 Pro+", "Realme 13 Pro", "Realme 12 Pro+", "Realme 12 Pro", "Realme Narzo 70 Pro", "Realme C67"],
  Oppo: ["Oppo Find X8 Pro", "Oppo Find X8", "Oppo Reno 13 Pro", "Oppo Reno 13", "Oppo Reno 12 Pro", "Oppo Reno 12", "Oppo F27 Pro+", "Oppo A79"],
  Vivo: ["Vivo X200 Pro", "Vivo X200", "Vivo V50", "Vivo V40 Pro", "Vivo V40", "Vivo V30 Pro", "Vivo V30", "Vivo T3 Ultra", "Vivo Y200"],
  "Xiaomi / Redmi": ["Xiaomi 15 Ultra", "Xiaomi 15", "Xiaomi 14 Ultra", "Xiaomi 14", "Redmi Note 14 Pro+", "Redmi Note 14 Pro", "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi 13 5G"],
  OnePlus: ["OnePlus 13", "OnePlus 13R", "OnePlus 12", "OnePlus 12R", "OnePlus 11", "OnePlus Nord 4", "OnePlus Nord CE4", "OnePlus Open"],
  Motorola: ["Motorola Edge 50 Ultra", "Motorola Edge 50 Pro", "Motorola Edge 50 Fusion", "Moto G85", "Moto G64", "Moto Razr 50 Ultra", "Moto Razr 50"],
  Nokia: ["Nokia G42", "Nokia X30", "Nokia C32", "Nokia G60", "Nokia XR21"],
  Poco: ["Poco F6", "Poco X6 Pro", "Poco X6", "Poco M6 Pro", "Poco C65"],
  Infinix: ["Infinix GT 20 Pro", "Infinix Note 40 Pro+", "Infinix Note 40 Pro", "Infinix Zero 30", "Infinix Hot 40"],
  Tecno: ["Tecno Phantom V Fold 2", "Tecno Phantom V Flip", "Tecno Camon 30 Premier", "Tecno Camon 30", "Tecno Pova 6 Pro"],
  "Google Pixel": ["Pixel 9 Pro XL", "Pixel 9 Pro", "Pixel 9", "Pixel 8 Pro", "Pixel 8", "Pixel 8a", "Pixel 7 Pro", "Pixel 7", "Pixel 7a"],
  Nothing: ["Nothing Phone 3", "Nothing Phone 2a Plus", "Nothing Phone 2a", "Nothing Phone 2", "Nothing Phone 1"],
};

export const serviceStatuses = ["new", "seen", "working", "completed", "rejected"];
export const orderStatuses = ["confirmed", "shipped", "nearby", "delivered", "rejected"];

export function getAiCustomerCareAnswer(problem: string) {
  const text = problem.toLowerCase();
  if (text.includes("price") || text.includes("₹") || /\brs\b/.test(text)) {
    const match = problem.match(/₹\s*(\d+)/);
    const amount = match ? match[1] : null;
    return `Admin ne aapki service ke liye ${amount ? `₹${amount}` : "ek"} price quote ki hai. Yeh service ka final estimated charge hai — agree karte hain to confirm karein, ya admin ko mobile number par message bhejein. Charge me visit, parts aur labour shamil ho sakte hain.`;
  }
  if (text.includes("reject")) {
    return "Aapki request reject ki gayi hai. Iska kaaran area coverage, parts ki availability, ya incomplete details ho sakta hai. Aap dobara request bhej sakte hain ya naya service select kar sakte hain.";
  }
  if (text.includes("shipped") || text.includes("nearby") || text.includes("delivered") || text.includes("order")) {
    return "Yeh aapke order ka live update hai. Order nearby aane par ₹35 delivery charge avoid karne ke liye time par receive karein. Issue ho to admin ko alternate number par contact karein.";
  }
  if (text.includes("ac") || text.includes("cool")) {
    return "AC ka filter clean karke, MCB/plug check karke 10 minute run karein. Cooling phir bhi nahi aa rahi ho to gas leakage ya compressor issue ho sakta hai — service request bhej dein.";
  }
  if (text.includes("lock") || text.includes("password")) {
    return "Phone lock help ke liye ownership proof zaroori hai: purana Gmail, mobile bill/box aur ID proof ready rakhein. Data loss ho sakta hai, isliye pehle backup option check karein.";
  }
  if (text.includes("phone") || text.includes("display") || text.includes("battery")) {
    return "Phone ko charge par 20 minute rakhein, dusra charger try karein, phir force restart karein. Display/battery/charging issue rahe to brand aur model ke sath request bhejein.";
  }
  if (text.includes("wire") || text.includes("current") || text.includes("shock")) {
    return "Safety ke liye main switch turant off karein. Current/shock/wiring smell ho to khud repair na karein; electrician request bhejein.";
  }
  if (text.includes("pipe") || text.includes("tap") || text.includes("leak")) {
    return "Water leakage me main valve band karein, leak point ki photo/problem note karein aur plumbing request bhejein.";
  }
  return "Yeh message admin ki taraf se hai. Aap is par seedhe action le sakte hain ya naya service request bhej sakte hain. Koi confusion ho to apni problem 2-3 line me likhein.";
}

export const aiQuickIcon = Bot;