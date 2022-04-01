export default function authGuard(token: string) {
  if (!token) {
    return false;
  }

  return true;
}
