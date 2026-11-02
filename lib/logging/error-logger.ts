import { createAdminClient } from '@/lib/supabase/admin';

export interface SystemErrorLog {
  message: string;
  context?: string;
  stack?: string;
  path?: string;
  severity?: 'critical' | 'error' | 'warning' | 'info';
  meta?: Record<string, unknown>;
}

/**
 * Enregistre une erreur ou exception système dans le journal d'audit
 * pour permettre un diagnostic et une correction immédiate par l'équipe.
 */
export async function logSystemError({
  message,
  context = 'system',
  stack,
  path,
  severity = 'error',
  meta = {},
}: SystemErrorLog) {
  try {
    const admin = createAdminClient();
    await admin.from('audit_logs').insert({
      action: `error.${severity}`,
      target_type: 'exception',
      meta: {
        message,
        context,
        stack: stack ? stack.slice(0, 1000) : undefined,
        path,
        severity,
        timestamp: new Date().toISOString(),
        ...meta,
      },
    });
  } catch (err) {
    console.warn('Echec enregistrement log erreur:', err);
  }
}

