export async function logDebug(message: string): Promise<void> {
  const logger = console;
  logger.debug(`[LOGGER] ${message}`);
}

export async function logInfo(message: string): Promise<void> {
  const logger = console;
  logger.info(`[LOGGER] ${message}`);
}

export async function logError(message: string): Promise<void> {
  const logger = console;
  logger.error(`[LOGGER] ${message}`);
}

export async function logWarn(message: string): Promise<void> {
  const logger = console;
  logger.warn(`[LOGGER] ${message}`);
}

export async function logCritical(message: string): Promise<void> {
  const logger = console;
  logger.error(`[LOGGER] ${message}`);
}

export async function logSQL(sql: string): Promise<void> {
  const logger = console;
  logger.debug("[LOGGER] SQL: " + sql.trim().split('\n').map((e: string) => e.trim()).filter(e => !!e).join(' '));
}