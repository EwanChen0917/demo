export default class Typewriter {
  element;

  speed: number;

  minInterval: number;

  decayFactor: number;

  delay: number;

  loop: boolean;

  queue: string[];

  isTyping: boolean;

  isPaused: boolean;

  currentText: string;

  typingInterval: NodeJS.Timeout | null;

  currentIndex: number;

  currentTextLength: number;

  currentSpeed: number;

  speedDisplay: HTMLElement;

  lengthDisplay: HTMLElement;

  constructor(options = {}) {
    this.speed = options.speed || 100; // 基础速度（ms/字）
    this.minInterval = 1000 / 37; // 最慢速率：37字/秒（约27ms/字）
    this.decayFactor = options.decayFactor || 0.025; // 指数衰减因子
    this.delay = options.delay || 500;
    this.loop = options.loop || false;

    this.queue = [];
    this.isTyping = false;
    this.isPaused = false;
    this.currentText = '';
    this.typingInterval = null;
    this.currentIndex = 0;
    this.currentTextLength = 0;
    this.currentSpeed = 0;
  }

  // 使用指数函数计算打字速度
  calculateSpeed(length) {
    // 指数函数：速度 = 基础速度 * e^(-k*长度)
    // 确保最小间隔为27ms
    const interval = Math.max(this.minInterval, this.speed * Math.exp(-this.decayFactor * length));
    this.currentSpeed = Math.round(1000 / interval);
    this.speedDisplay.textContent = `${this.currentSpeed} 字/秒`;
    return interval;
  }

  // 打字效果
  type(text, callback) {
    this.currentTextLength = text.length;
    const speed = this.calculateSpeed(text.length);
    let i = 0;

    this.isTyping = true;
    const typeNextChar = () => {
      if (this.isPaused) return;

      if (i < text.length) {
        this.currentText += text.charAt(i);
        this.element.textContent = this.currentText;
        i++;
        this.currentIndex = i;
        this.typingInterval = setTimeout(typeNextChar, speed);
      } else if (callback) {
        callback();
      }
    };

    setTimeout(typeNextChar, this.delay);
  }

  // 添加文本到队列
  addText(text) {
    this.queue.push(text);
    return this;
  }

  // 开始打字
  start() {
    if (this.isTyping || this.queue.length === 0) return;

    const nextText = this.queue.shift();
    this.type(nextText, () => {
      if (this.loop) {
        this.queue.push(nextText!);
      }
      if (this.queue.length > 0) {
        setTimeout(() => {
          this.currentText = '';
          this.start();
        }, 1000);
      } else {
        this.isTyping = false;
      }
    });
  }

  // 暂停打字
  pause() {
    this.isPaused = true;
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
    }
  }

  // 继续打字
  resume() {
    if (!this.isPaused || !this.isTyping) return;

    this.isPaused = false;
    const remainingText = this.queue[0]?.substring(this.currentIndex) || '';
    this.type(remainingText, () => {
      if (this.loop) {
        this.queue.push(this.queue.shift()!);
      }
      if (this.queue.length > 0) {
        setTimeout(() => {
          this.currentText = '';
          this.start();
        }, 1000);
      } else {
        this.isTyping = false;
      }
    });
  }

  // 重置
  reset() {
    this.pause();
    this.queue = [];
    this.currentText = '';
    this.element.textContent = '';
    this.currentIndex = 0;
    this.isTyping = false;
    this.isPaused = false;
  }
}

export function useTypewriter() {
  const chatText = ref('');
  const status = ref<'pending' | 'pause' | 'end'>();
  let index = 0;
  let text = '';
  const start = (message) => {
    chatText.value = '';
    text = message || '';
    if (status.value === 'pending' || status.value === 'pause' || !text) return;
    status.value = 'pending';
    type(index);
  };
  const type = (idx: number) => {
    if (idx >= text.length) {
      status.value = 'end';
      return;
    }
    let curChar = text[idx];
    let step = 1;
    // 双字节需要一次打印两个字符
    if (isDoubleChar(curChar)) {
      step = 2;
      curChar += text[idx + 1];
    }
    chatText.value += curChar;
    setTimeout(() => {
      type(idx + step);
    }, generateRandomValue() * 20 || 500);
  };
  const reset = () => {
    chatText.value = '';
    index = 0;
    text = '';
  };
  return {
    chatText,
    status,
    start,
    reset,
  };
}

function generateRandomValue() {
  const random = Math.random(); // 生成0到1之间的随机数

  if (random < 0.4) {
    return 0.5; // 30%概率返回1
  }
  if (random < 0.41) {
    return 0; // 10%概率返回-1 (0.3到0.4之间)
  }
  return 1; // 剩余60%概率返回0
}

// 判断是否为双字节字符（如中文、日文等）
function isDoubleChar(char: string): boolean {
  return char.charCodeAt(0) > 255;
}
