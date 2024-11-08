enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

class Logger {
  /**
   * Logs an informational message.
   * @param message - The message to log.
   */
  public static info(message: string): void {
    Logger.log(LogLevel.INFO, message);
  }

  /**
   * Logs a warning message.
   * @param message - The message to log.
   */
  public static warn(message: string): void {
    Logger.log(LogLevel.WARN, message);
  }

  /**
   * Logs an error message.
   * @param message - The message to log.
   */
  public static error(message: string): void {
    Logger.log(LogLevel.ERROR, message);
  }

  /**
   * Centralized logging method that formats and outputs messages.
   * @param level - The level of the log (e.g., INFO, WARN, ERROR).
   * @param message - The message to log.
   */
  private static log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }
}

export default Logger;
