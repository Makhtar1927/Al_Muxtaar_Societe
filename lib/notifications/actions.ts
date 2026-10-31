'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  meta: Record<string, unknown> | null;
  created_at: string;
}

export async function fetchMyNotificationsAction(): Promise<
  ActionResult<{ notifications: NotificationItem[]; unreadCount: number }>
> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Non authentifié' };
  }

  const { data, error } = await supabase
    .from('notifications')
    .select('id, type, title, body, read, meta, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(30);

  if (error) {
    return { success: false, error: error.message };
  }

  const list = (data ?? []) as unknown as NotificationItem[];
  const unreadCount = list.filter((n) => !n.read).length;

  return { success: true, data: { notifications: list, unreadCount } };
}

export async function markNotificationAsReadAction(
  notificationId: string,
): Promise<ActionResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Non authentifié' };

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .eq('user_id', user.id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/notifications');
  return { success: true, data: null };
}

export async function markAllNotificationsAsReadAction(): Promise<ActionResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Non authentifié' };

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', user.id)
    .eq('read', false);

  if (error) return { success: false, error: error.message };

  revalidatePath('/notifications');
  return { success: true, data: null };
}

