export default function authGuard(token: string | null) {
  if (!token) {
    return false;
  }

  return true;
}
