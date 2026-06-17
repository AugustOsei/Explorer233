export async function subscribeEmail(
  email: string
): Promise<{ success: boolean; duplicate: boolean; error?: string }> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.duplicate) return { success: false, duplicate: true };
    if (data.success) return { success: true, duplicate: false };
    return { success: false, duplicate: false, error: data.error };
  } catch (err) {
    return { success: false, duplicate: false, error: String(err) };
  }
}
