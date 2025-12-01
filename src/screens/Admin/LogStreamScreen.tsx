import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/hooks";
import { logStreamService, LogMessage } from "../../services/logStreamService";
import { adminStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const LogStreamScreen = () => {
  const navigation = useNavigation();
  const { tokens } = useAppSelector((state) => state.auth);

  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isLogStreamActive, setIsLogStreamActive] = useState(false);
  const [logStreamError, setLogStreamError] = useState<string | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const logFlatListRef = useRef<FlatList>(null);
  const maxLogs = 200;
  const MAX_LOG_LENGTH = 150; // Character limit before showing expand button

  useEffect(() => {
    // Auto start when screen opens
    if (tokens?.accessToken) {
      setIsLogStreamActive(true);
    }

    return () => {
      stopLogStream();
    };
  }, []);

  useEffect(() => {
    if (isLogStreamActive && tokens?.accessToken) {
      startLogStream();
    } else {
      stopLogStream();
    }

    return () => {
      stopLogStream();
    };
  }, [isLogStreamActive, tokens?.accessToken]);

  const startLogStream = () => {
    if (!tokens?.accessToken) return;

    setLogStreamError(null);

    logStreamService.connect(
      tokens.accessToken,
      (log: LogMessage) => {
        setLogs((prevLogs) => {
          const newLogs = [log, ...prevLogs];
          return newLogs.slice(0, maxLogs);
        });

        setTimeout(() => {
          logFlatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }, 100);
      },
      (error: any, shouldStop: boolean) => {
        const errorMessage = error?.message || "Lỗi kết nối";
        setLogStreamError(errorMessage);

        // If shouldStop is true, automatically stop streaming
        if (shouldStop) {
          setIsLogStreamActive(false);

          Alert.alert(
            "Kết nối thất bại",
            errorMessage + "\n\nVui lòng kiểm tra kết nối và thử lại.",
            [
              {
                text: "OK",
                onPress: () => setLogStreamError(null),
              },
            ]
          );
        }
      }
    );
  };

  const stopLogStream = () => {
    logStreamService.disconnect();
    setLogStreamError(null);
  };

  const toggleLogStream = () => {
    const newState = !isLogStreamActive;
    setIsLogStreamActive(newState);

    if (!newState) {
      // When stopping, clear logs and error
      setLogs([]);
      setLogStreamError(null);
      setExpandedLogs(new Set());
    }
  };

  const clearLogs = () => {
    Alert.alert("Xóa logs", "Bạn có chắc muốn xóa tất cả logs?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setLogs([]);
          setExpandedLogs(new Set());
        },
      },
    ]);
  };

  const toggleLogExpansion = (logKey: string) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(logKey)) {
        newSet.delete(logKey);
      } else {
        newSet.add(logKey);
      }
      return newSet;
    });
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "#E74C3C";
      case "WARN":
        return "#FF9800";
      case "INFO":
        return "#2196F3";
      case "DEBUG":
        return "#9C27B0";
      case "TRACE":
        return "#607D8B";
      default:
        return "#7F8C8D";
    }
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return "close-circle";
      case "WARN":
        return "warning";
      case "INFO":
        return "information-circle";
      case "DEBUG":
        return "bug";
      case "TRACE":
        return "code-slash";
      default:
        return "ellipse";
    }
  };

  const renderLogItem = ({
    item,
    index,
  }: {
    item: LogMessage;
    index: number;
  }) => {
    const logKey = `log-${index}-${item.timestamp}`;
    const isExpanded = expandedLogs.has(logKey);
    const isLongMessage = item.message.length > MAX_LOG_LENGTH;
    const displayMessage =
      isExpanded || !isLongMessage
        ? item.message
        : item.message.substring(0, MAX_LOG_LENGTH) + "...";

    return (
      <View style={adminStyles.logItem}>
        <View style={adminStyles.logHeader}>
          <View style={adminStyles.logLevelContainer}>
            <Ionicons
              name={getLogLevelIcon(item.level) as any}
              size={16}
              color={getLogLevelColor(item.level)}
            />
            <Text
              style={[
                adminStyles.logLevel,
                { color: getLogLevelColor(item.level) },
              ]}
            >
              {item.level}
            </Text>
          </View>
          <Text style={adminStyles.logTimestamp}>{item.timestamp}</Text>
        </View>

        <Text
          style={adminStyles.logMessage}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {displayMessage}
        </Text>

        {isLongMessage && (
          <TouchableOpacity
            style={adminStyles.logExpandButton}
            onPress={() => toggleLogExpansion(logKey)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={16}
              color="#4A90E2"
            />
            <Text style={adminStyles.logExpandButtonText}>
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </Text>
          </TouchableOpacity>
        )}

        {isExpanded && (
          <View style={adminStyles.logMetadata}>
            <Text style={adminStyles.logMetadataText}>
              Độ dài: {item.message.length} ký tự
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={adminStyles.logStreamFullScreen}>
      {/* Header */}
      <View style={adminStyles.logStreamFullHeader}>
        <TouchableOpacity
          style={adminStyles.logStreamBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>

        <View style={adminStyles.logStreamFullHeaderContent}>
          <Text style={adminStyles.logStreamFullTitle}>Logs Realtime</Text>
          <View style={adminStyles.logStreamFullStatus}>
            <View
              style={[
                adminStyles.logStreamIndicator,
                !isLogStreamActive && adminStyles.logStreamIndicatorInactive,
                logStreamError && adminStyles.logStreamIndicatorError,
              ]}
            />
            <Text style={adminStyles.logStreamFullStatusText}>
              {!isLogStreamActive
                ? "Đã dừng"
                : logStreamError
                ? "Đang kết nối lại..."
                : "Đang lắng nghe..."}
            </Text>
          </View>
        </View>

        <View style={adminStyles.logStreamFullActions}>
          {isLogStreamActive && logs.length > 0 && (
            <TouchableOpacity
              style={adminStyles.clearLogsButtonFull}
              onPress={clearLogs}
            >
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              adminStyles.toggleLogButtonFull,
              isLogStreamActive && adminStyles.toggleLogButtonActiveFull,
            ]}
            onPress={toggleLogStream}
          >
            <Ionicons
              name={isLogStreamActive ? "pause" : "play"}
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Banner */}
      {logStreamError && isLogStreamActive && (
        <View style={adminStyles.logStreamError}>
          <Ionicons name="alert-circle" size={16} color="#E74C3C" />
          <Text style={adminStyles.logStreamErrorText}>{logStreamError}</Text>
        </View>
      )}

      {/* Logs List */}
      {!isLogStreamActive ? (
        <View style={adminStyles.logStreamPlaceholderFull}>
          <Ionicons name="terminal-outline" size={64} color="#BDC3C7" />
          <Text style={adminStyles.logStreamPlaceholderTextFull}>
            Nhấn nút phát để bắt đầu xem logs realtime
          </Text>
        </View>
      ) : logs.length === 0 ? (
        <View style={adminStyles.logStreamEmptyFull}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={adminStyles.logStreamEmptyTextFull}>
            Chờ logs từ server...
          </Text>
        </View>
      ) : (
        <FlatList
          ref={logFlatListRef}
          data={logs}
          keyExtractor={(item, index) => `log-${index}-${item.timestamp}`}
          renderItem={renderLogItem}
          style={adminStyles.logListFull}
          contentContainerStyle={adminStyles.logListContentFull}
          showsVerticalScrollIndicator={true}
          initialNumToRender={30}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      )}

      {/* Footer Info */}
      <View style={adminStyles.logStreamFooter}>
        <Text style={adminStyles.logStreamFooterText}>
          {logs.length} logs (Max: {maxLogs})
        </Text>
        {isLogStreamActive && !logStreamError && (
          <Text style={adminStyles.logStreamFooterTextGreen}>● Live</Text>
        )}
        {isLogStreamActive && logStreamError && (
          <Text style={adminStyles.logStreamFooterTextOrange}>
            ● Reconnecting...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LogStreamScreen;
