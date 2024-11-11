enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

class Logger {
  /**
   * Logs an informational message.
   */
  public static info(message: string, details?: Record<string, any>): void {
    Logger.log(LogLevel.INFO, message, details);
  }

  /**
   * Logs a warning message.
   */
  public static warn(message: string, details?: Record<string, any>): void {
    Logger.log(LogLevel.WARN, message, details);
  }

  /**
   * Logs an error message.
   */
  public static error(message: string, details?: Record<string, any>): void {
    Logger.log(LogLevel.ERROR, message, details);
  }

  /**
   * Logs a debug message.
   */
  public static debug(message: string, details?: Record<string, any>): void {
    Logger.log(LogLevel.DEBUG, message, details);
  }

  /**
   * Centralized logging method that formats and outputs messages.
   */
  private static log(
    level: LogLevel,
    message: string,
    details?: Record<string, any>
  ): void {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${level}] ${message}`;
    if (details) {
      logMessage += ` | Details: ${JSON.stringify(details)}`;
    }
    console.log(logMessage);
  }
}

export default Logger;
