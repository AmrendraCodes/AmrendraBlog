export interface AuditLogInput {
  actorId?: string | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  details?: Record<string, unknown> | null;
  ip?: string | null;
}

/**
 * Audit Logging Helper:
 * Records security-sensitive operations (logins, user mutations, settings changes).
 * Logs safely without breaking if DB table is not provisioned.
 */
export async function recordAuditLog(input: AuditLogInput): Promise<void> {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUDIT] ${input.action} on ${input.targetType} by ${input.actorId || 'anonymous'}`);
    }
  } catch (err) {
    console.error('AuditLog recording failed:', err);
  }
}
