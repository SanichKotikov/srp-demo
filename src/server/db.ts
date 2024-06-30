interface IUser {
  salt: string;
  verifier: string;
}

const db = new Map<string, IUser>();

export function initDB(): void {
  const prevV = localStorage.getItem('users');

  if (prevV) {
    (JSON.parse(prevV) as ([string, IUser])[])
      .forEach((item) => db.set(...item));
  }
}

export function setUser({ username, ...data }: { username: string, salt: string, verifier: string }): void {
  db.set(username, data);
  localStorage.setItem('users', JSON.stringify([...db.entries()]));
}

export function getUser(username: string): IUser {
  return db.get(username)!;
}
