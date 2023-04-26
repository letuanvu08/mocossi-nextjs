export function isProduction() {
  return process.env.NEXT_PUBLIC_ENV === 'production';
}

export function isClientSide() {
  return typeof window !== 'undefined' && window.document && typeof window.document.createElement === 'function';
}