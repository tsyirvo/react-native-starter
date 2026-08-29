declare module '*.png' {
  const content: number;

  export default content;
}
declare module '*.jpg' {
  const content: number;

  export default content;
}
declare module '*.jpeg' {
  const content: number;

  export default content;
}
declare module '*.webp' {
  const content: number;

  export default content;
}
declare module '*.gif' {
  const content: number;

  export default content;
}
declare module '*.mp4' {
  const content: number;

  export default content;
}

interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining(): number;
}

declare function requestIdleCallback(
  callback: (deadline: IdleDeadline) => void,
  options?: { timeout?: number },
): number;

declare function cancelIdleCallback(handle: number): void;
