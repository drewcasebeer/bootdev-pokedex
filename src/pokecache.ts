export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#cache = new Map();
    this.#interval = interval;

    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const createdAt = new Date().getDate();
    this.#cache.set(key, { createdAt, val });
  }

  get<T>(key: string): T | undefined {
    if (this.#cache.has(key)) {
      return this.#cache.get(key)?.val ?? undefined;
    }

    return undefined;
  }

  #reap() {
    const reapTime = Date.now() - this.#interval;

    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < reapTime) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    const interval = this.#interval;
    this.#reapIntervalId = setInterval(this.#reap.bind(this), interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
  }
}
