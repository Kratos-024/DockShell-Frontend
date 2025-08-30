import { Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import '@xterm/xterm/css/xterm.css';

export const WebTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const terminalInstance = useRef<Terminal | null>(null);
  const currentInput = useRef<string>('');
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);
  const socketRef = useRef<WebSocket | null>(null);
  const waitingForPrompt = useRef<boolean>(false);

  const passwordMode = useRef<boolean>(false);
  const passwordBuffer = useRef<string>('');

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1E1E1E',
        foreground: '#ECECEC',
        cursor: '#FFFFFF',
        black: '#000000',
        red: '#FF3B30',
        green: '#4CD964',
        yellow: '#FFCC00',
        blue: '#007AFF',
        magenta: '#AF52DE',
        cyan: '#5AC8FA',
        white: '#FFFFFF',
        brightBlack: '#8E8E93',
        brightRed: '#FF453A',
        brightGreen: '#32D74B',
        brightYellow: '#FFD60A',
        brightBlue: '#0A84FF',
        brightMagenta: '#BF5AF2',
        brightCyan: '#64D2FF',
        brightWhite: '#F2F2F7',
      },
      fontSize: 18,
      fontFamily: "SF Mono, Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace",
      rows: 24,
      cols: 80,
    });

    terminalInstance.current = terminal;
    terminal.open(terminalRef.current);

    const socket = new WebSocket('ws://localhost:8080');
    socketRef.current = socket;

    let isConnected = false;
    socket.addEventListener('open', () => {
      if (!isConnected) {
        isConnected = true;
        terminal.writeln('\x1B[1;32m✓ Connected to server\x1B[0m');
        terminal.write('$ ');
      }
    });

    socket.addEventListener('message', (event) => {
      terminal.write(event.data);
      waitingForPrompt.current = false;
    });

    socket.addEventListener('error', () => {
      terminal.writeln('\r\n\x1B[1;31m✗ Connection failed\x1B[0m');
    });

    socket.addEventListener('close', () => {
      terminal.writeln('\r\n\x1B[1;31m✗ Connection lost\x1B[0m');
    });

    const replaceCurrentLine = (newText: string) => {
      for (let i = 0; i < currentInput.current.length; i++) {
        terminal.write('\b \b');
      }
      currentInput.current = newText;
      terminal.write(newText);
    };

    const parseSSHCommand = (command: string) => {
      const parts = command.trim().split(/\s+/);
      if (parts[0] !== 'ssh') throw new Error('Not a valid SSH command');

      let username = '';
      let host = '';
      let port = 22;

      if (parts[1].includes('@')) {
        const [user, hostname] = parts[1].split('@');
        username = user;
        host = hostname;
      } else {
        host = parts[1];
      }

      const pIndex = parts.indexOf('-p');
      if (pIndex !== -1 && parts[pIndex + 1]) {
        port = parseInt(parts[pIndex + 1], 10);
      }

      return { host, port, username };
    };

    const handleSSHLogin = (command: string) => {
      const sshConfig = parseSSHCommand(command);
      terminal.writeln(`Connecting to ${sshConfig.username}@${sshConfig.host}:${sshConfig.port}`);
      terminal.write('Password: ');
      passwordMode.current = true;
      passwordBuffer.current = '';
      const handlePasswordInput = (char: string) => {
        if (char === '\r') {
          terminal.write('\r\n');
          passwordMode.current = false;

          const fullConfig = { ...sshConfig, password: passwordBuffer.current };
          socket.send(JSON.stringify({ type: 'connect-ssh', data: fullConfig }));

          passwordBuffer.current = '';
          terminal.write('$ ');
          return;
        }
        if (char === '\u007F') {
          if (passwordBuffer.current.length > 0) {
            passwordBuffer.current = passwordBuffer.current.slice(0, -1);
            terminal.write('\b \b');
          }
        } else {
          passwordBuffer.current += char;
          terminal.write('*');
        }
      };
      terminal.onData((data) => {
        if (passwordMode.current) {
          handlePasswordInput(data);
        }
      });
    };

    const handleEnterKey = () => {
      const command = currentInput.current.trim();
      terminal.write('\r\n');

      if (!command) {
        terminal.write('$ ');
        return;
      }

      commandHistory.current.push(command);
      historyIndex.current = commandHistory.current.length;

      if (command.startsWith('ssh')) {
        handleSSHLogin(command);
      } else if (socket.readyState === WebSocket.OPEN) {
        socket.send(command + '\n');
      } else {
        terminal.writeln('\x1B[1;31mError: Not connected to server\x1B[0m');
        terminal.write('$ ');
      }

      currentInput.current = '';
    };

    const handleBackspace = () => {
      if (currentInput.current.length > 0) {
        currentInput.current = currentInput.current.slice(0, -1);
        terminal.write('\b \b');
      }
    };

    const handleUpArrow = () => {
      if (historyIndex.current > 0) {
        historyIndex.current--;
        replaceCurrentLine(commandHistory.current[historyIndex.current]);
      }
    };

    const handleDownArrow = () => {
      if (historyIndex.current < commandHistory.current.length - 1) {
        historyIndex.current++;
        replaceCurrentLine(commandHistory.current[historyIndex.current]);
      } else if (historyIndex.current === commandHistory.current.length - 1) {
        historyIndex.current++;
        replaceCurrentLine('');
      }
    };
    terminal.onData((data) => {
      if (waitingForPrompt.current || passwordMode.current) return;

      if (data === '\r') {
        handleEnterKey();
      } else if (data === '\u007F') {
        handleBackspace();
      } else if (data === '\u001b[A') {
        handleUpArrow();
      } else if (data === '\u001b[B') {
        handleDownArrow();
      } else if (data >= ' ' && data <= '~') {
        currentInput.current += data;
        terminal.write(data);
      }
    });

    return () => {
      terminal.dispose();
      socket.close();
    };
  }, []);

  return (
    <div
      className="w-full bg-[#1d1f21] rounded-lg
     overflow-hidden  shadow-2xl  font-sans"
    >
      <div className="h-9 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center px-4 border-b border-gray-400 relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-600 text-sm font-medium">
          Terminal — xterm — 80×24
        </div>
      </div>

      <div
        ref={terminalRef}
        className="px-4 py-9 custom-scrollbar bg-[#1d1f21] overflow-auto scrollbar-thin"
      />
    </div>
  );
};
