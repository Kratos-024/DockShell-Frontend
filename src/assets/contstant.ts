export default interface LabInter {
  imgSrc: string;
  difficulty: "Easy" | "Medium" | "Hard";
  header: string;
  subHeader: string;
  solved: number;
  topic: string;
}
export const labs: LabInter[] = [
  {
    imgSrc: "https://picsum.photos/400/200?random=1",
    difficulty: "Easy",
    topic: "Web Exploitation",
    header: "SQL Injection Basics",
    subHeader:
      "Learn how to exploit poorly sanitized SQL queries to gain unauthorized access.",
    solved: 124,
  },
  {
    imgSrc: "https://picsum.photos/400/200?random=2",
    difficulty: "Medium",
    topic: "Cryptography",
    header: "Weak Hash Cracking",
    subHeader:
      "Understand MD5 weaknesses and practice brute-forcing simple hashes.",
    solved: 98,
  },
  {
    imgSrc: "https://picsum.photos/400/200?random=3",
    difficulty: "Hard",
    topic: "Reverse Engineering",
    header: "CrackMe Challenge",
    subHeader:
      "Analyze binaries to bypass checks and retrieve the hidden flag.",
    solved: 57,
  },
  {
    imgSrc: "https://picsum.photos/400/200?random=4",
    difficulty: "Easy",
    topic: "Forensics",
    header: "Hidden Data in Images",
    subHeader:
      "Investigate suspicious image files and extract embedded information.",
    solved: 142,
  },
  {
    imgSrc: "https://picsum.photos/400/200?random=5",
    difficulty: "Medium",
    topic: "Networking",
    header: "Packet Sniffing 101",
    subHeader:
      "Capture and analyze network traffic to find sensitive data leaks.",
    solved: 76,
  },
];
