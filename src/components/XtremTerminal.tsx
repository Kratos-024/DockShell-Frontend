import { Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export const WebTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const terminalInstance = useRef<Terminal | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!terminalRef.current || terminalInstance.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#000000',
        foreground: '#ffffff',
        cursor: '#ffffff',
        black: '#000000',
        red: '#ff6c6b',
        green: '#98be65',
        yellow: '#ecbe7b',
        blue: '#51afef',
        magenta: '#c678dd',
        cyan: '#46d9ff',
        white: '#bbc2cf',
        brightBlack: '#5b6268',
        brightRed: '#da8548',
        brightGreen: '#4db5bd',
        brightYellow: '#ecbe7b',
        brightBlue: '#3071db',
        brightMagenta: '#a9a1e1',
        brightCyan: '#46d9ff',
        brightWhite: '#dfdfdf',
      },
      fontSize: 16,
      fontFamily:
        "SF Mono, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
      lineHeight: 1.2,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminalInstance.current = terminal;
    terminal.open(terminalRef.current);
    fitAddon.fit();

    const socket = new WebSocket('wss://dockshell-backend-1.onrender.com');
    socketRef.current = socket;

    socket.addEventListener('open', () => {
      terminal.writeln('Last login: ' + new Date().toLocaleString());
      terminal.writeln('Welcome to the Terminal Web Interface');
      terminal.writeln('Only SSH connections are allowed for security.');
      terminal.write('user@macbook ~ % ');
    });

    socket.addEventListener('message', (event) => {
      const message = event.data.toString();
      terminal.write(message);
    });

    socket.addEventListener('error', (err) => {
      console.error('WebSocket error:', err);
      terminal.writeln('\r\nzsh: connection failed');
    });

    socket.addEventListener('close', () => {
      terminal.writeln('\r\nzsh: connection lost');
    });

    terminal.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'keystroke', data }));
      }
    });

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
      socket.close();
      terminalInstance.current = null;
    };
  }, []);

  return (
    <div className="w-full h-[520px] mx-auto">
      <div className="bg-gray-200 rounded-xl rounded-t-lg shadow-2xl h-full flex flex-col">
        <div className="h-7 bg-gradient-to-b from-gray-300 to-gray-200 flex items-center px-3 border-b border-gray-300 rounded-t-lg flex-shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500 cursor-pointer"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer"></div>
          </div>
          <div className="flex-1 text-center text-gray-600 text-sm font-medium">Terminal — zsh</div>
        </div>
        <div
          ref={terminalRef}
          className="bg-black rounded-b-xl overflow-hidden flex-grow w-full h-full"
        />
      </div>
    </div>
  );
};
