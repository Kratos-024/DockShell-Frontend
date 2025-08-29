import type LabInter from './types';

export const labs: LabInter[] = [
  {
    imgSrc: 'https://f4.bcbits.com/img/a3572376747_16.jpg',
    difficulty: 'Easy',
    topic: 'Linux Commands',
    title: 'frostling',
    subHeader: 'Master basic Linux command exploitation to solve challenges safely.',
    solved: 124,
  },
  {
    imgSrc:
      'https://image.api.playstation.com/cdn/UP9000/BCUS98232_00/0gXJVzxkPwjwmSs9f8P5KJcAsgZIlr6E.png?w=440&thumb=false',
    difficulty: 'Medium',
    topic: 'Networking',
    title: 'hades',
    subHeader:
      'Master core Linux networking tools—nmap, nc, tcpdump, and beyond—to uncover and control your network.',
    solved: 0,
  },
  // {
  //   imgSrc: "https://picsum.photos/400/200?random=2",
  //   difficulty: "Medium",
  //   topic: "Cryptography",
  //   header: "Weak Hash Cracking",
  //   subHeader:
  //     "Understand MD5 weaknesses and practice brute-forcing simple hashes.",
  //   solved: 98,
  // },
  // {
  //   imgSrc: "https://picsum.photos/400/200?random=3",
  //   difficulty: "Hard",
  //   topic: "Reverse Engineering",
  //   header: "CrackMe Challenge",
  //   subHeader:
  //     "Analyze binaries to bypass checks and retrieve the hidden flag.",
  //   solved: 57,
  // },
  // {
  //   imgSrc: "https://picsum.photos/400/200?random=4",
  //   difficulty: "Easy",
  //   topic: "Forensics",
  //   header: "Hidden Data in Images",
  //   subHeader:
  //     "Investigate suspicious image files and extract embedded information.",
  //   solved: 142,
  // },
  // {
  //   imgSrc: "https://picsum.photos/400/200?random=5",
  //   difficulty: "Medium",
  //   topic: "Networking",
  //   header: "Packet Sniffing 101",
  //   subHeader:
  //     "Capture and analyze network traffic to find sensitive data leaks.",
  //   solved: 76,
  // },
];
export const fakeLevelDataWithFiles = {
  uniqueId: 'frostling-level1',
  goal: 'Navigate directories and read file contents using basic commands',
  description:
    'Learn basic file navigation and content reading commands. Use cd to change directories and various commands to read file contents.',
  commands: ['cd', 'ls', 'cat', 'pwd'],
  hints: ['Look for files in subdirectories', "Use ls to see what's in each directory"],
  links: ['https://www.geeksforgeeks.org/cd-command-in-linux-with-examples/'],
  files: [
    {
      filename: 'readme.txt',
      content:
        'Welcome to Frostling CTF!\nThe password is hidden somewhere...\nUse your Linux skills to find it!',
      permissions: '644',
      hidden: false,
    },
    {
      filename: '.hidden_file',
      content: 'secret_password_123',
      permissions: '600',
      hidden: true,
    },
  ],
  expectedOutput: 'Navigate to the correct directory and read the password file',
  difficulty: 'beginner' as const,
  category: 'fileexploration' as const,
  estimatedTime: 20,
  createdAt: new Date(),
};
