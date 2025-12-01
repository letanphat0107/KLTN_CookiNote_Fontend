import { API_CONFIG } from "../config/api";
import { EventSourcePolyfill } from "event-source-polyfill";

export interface LogMessage {
  timestamp: string;
  level: string;
  message: string;
  raw: string;
}

export class LogStreamService {
  private eventSource: EventSourcePolyfill | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectDelay = 5000; // 5 seconds
  private maxReconnectAttempts = 3;
  private reconnectAttempts = 0;
  private heartbeatTimeout: NodeJS.Timeout | null = null;
  private heartbeatInterval = 45000; // 45 seconds (same as server timeout)
  private onErrorCallback?: (error: any, shouldStop: boolean) => void;

  connect(
    accessToken: string,
    onMessage: (log: LogMessage) => void,
    onError?: (error: any, shouldStop: boolean) => void
  ): void {
    this.disconnect();
    this.onErrorCallback = onError;
    this.reconnectAttempts = 0;

    this.doConnect(accessToken, onMessage);
  }

  private doConnect(
    accessToken: string,
    onMessage: (log: LogMessage) => void
  ): void {
    try {
      const url = `${API_CONFIG.BASE_URL}/cookinote/admin/logs/stream`;

      // Create EventSource with authorization
      this.eventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: this.heartbeatInterval,
      } as any);

      this.eventSource.onmessage = (event) => {
        try {
          // Reset heartbeat timeout on every message
          this.resetHeartbeat();
          this.reconnectAttempts = 0; // Reset attempts on successful message

          const logData = this.parseLogMessage(event.data);
          onMessage(logData);
        } catch (error) {
          // Only log parsing errors, not connection errors
          if (__DEV__) {
            console.warn("Error parsing log message:", error);
          }
        }
      };

      this.eventSource.onerror = (error: any) => {
        // Clear heartbeat on error
        this.clearHeartbeat();

        // Check if it's a timeout error
        const isTimeout =
          error?.message?.includes("45000") ||
          error?.message?.includes("timeout") ||
          error?.message?.includes("No activity");

        if (isTimeout || this.reconnectAttempts < this.maxReconnectAttempts) {
          // Increment attempt counter
          this.reconnectAttempts++;

          // Notify about reconnection attempt
          if (this.onErrorCallback) {
            this.onErrorCallback(
              {
                message: `Kết nối bị gián đoạn. Đang thử kết nối lại (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`,
                isTimeout: true,
              },
              false // Don't stop streaming
            );
          }

          // Auto reconnect
          this.scheduleReconnect(accessToken, onMessage);
        } else {
          // Max attempts reached, stop streaming
          if (this.onErrorCallback) {
            this.onErrorCallback(
              {
                message:
                  "Không thể kết nối sau nhiều lần thử. Vui lòng khởi động lại.",
                isTimeout: false,
              },
              true // Stop streaming
            );
          }
          this.disconnect();
        }
      };

      this.eventSource.onopen = () => {
        // Start heartbeat monitoring
        this.resetHeartbeat();
        this.reconnectAttempts = 0;
      };
    } catch (error) {
      if (this.onErrorCallback) {
        this.onErrorCallback(error, true);
      }
    }
  }

  private resetHeartbeat(): void {
    this.clearHeartbeat();

    // Set timeout to detect no activity
    this.heartbeatTimeout = setTimeout(() => {
      // No activity detected, trigger reconnect
      if (this.eventSource) {
        this.eventSource.close();

        if (this.onErrorCallback) {
          this.onErrorCallback(
            {
              message: "Không nhận được dữ liệu từ server. Đang kết nối lại...",
              isTimeout: true,
            },
            false
          );
        }
      }
    }, this.heartbeatInterval + 5000); // Add 5s buffer
  }

  private clearHeartbeat(): void {
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
    }
  }

  private scheduleReconnect(
    accessToken: string,
    onMessage: (log: LogMessage) => void
  ): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      this.doConnect(accessToken, onMessage);
    }, this.reconnectDelay);
  }

  private parseLogMessage(data: string): LogMessage {
    const timestampRegex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})/;
    const levelRegex = /(INFO|WARN|ERROR|DEBUG|TRACE)/;

    const timestampMatch = data.match(timestampRegex);
    const levelMatch = data.match(levelRegex);

    const timestamp = timestampMatch
      ? timestampMatch[1]
      : new Date().toISOString();
    const level = levelMatch ? levelMatch[1] : "INFO";

    // Extract message after the colon
    const messageMatch = data.match(/:\s*(.+)$/);
    const message = messageMatch ? messageMatch[1] : data;

    return {
      timestamp,
      level,
      message: message.trim(),
      raw: data,
    };
  }

  disconnect(): void {
    this.clearHeartbeat();

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.reconnectAttempts = 0;
    this.onErrorCallback = undefined;
  }

  isConnected(): boolean {
    return this.eventSource !== null && this.eventSource.readyState === 1;
  }
}

export const logStreamService = new LogStreamService();
