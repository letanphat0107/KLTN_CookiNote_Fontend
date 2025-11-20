import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Animated,
  Alert,
  Dimensions,
} from "react-native";
import { recipeStyles } from "./styles";
import { RecipeStep } from "../../types/recipe";
import { markRecipeAsCooked } from "../../services/favoriteService";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface RecipeGuideScreenProps {
  route?: {
    params?: {
      steps?: RecipeStep[];
      recipeTitle?: string;
      recipeId?: string | number;
    };
  };
  navigation?: any;
}

const RecipeGuideScreen: React.FC<RecipeGuideScreenProps> = ({
  route,
  navigation,
}) => {
  const steps = route?.params?.steps || [];
  const recipeTitle = route?.params?.recipeTitle || "Hướng dẫn nấu ăn";
  const recipeId = route?.params?.recipeId;

  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [countdownTimer, setCountdownTimer] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isMarkingCooked, setIsMarkingCooked] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];
  const toastTranslateY = useState(new Animated.Value(-100))[0];

  // Progress animation
  const progressAnim = useState(new Animated.Value(0))[0];

  const hasSteps = steps && steps.length > 0;
  const currentStepData = hasSteps ? steps[currentStep] : null;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const progress = hasSteps ? ((currentStep + 1) / steps.length) * 100 : 0;

  // Toast functions
  const showToastMessage = (message: string, duration: number = 3000) => {
    hideToast();
    setToastMessage(message);
    setShowToast(true);

    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    if (showToast) {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowToast(false);
        setToastMessage("");
      });
    }
  };

  // Progress animation
  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: progress,
      useNativeDriver: false,
      tension: 40,
      friction: 8,
    }).start();
  }, [progress]);

  // Set default timer when step changes
  useEffect(() => {
    hideToast();

    if (currentStepData) {
      const suggestedTime = currentStepData.suggestedTime;
      if (suggestedTime) {
        setTimer(suggestedTime * 60);
        setIsTimerRunning(true);
      } else {
        setTimer(0);
        setIsTimerRunning(false);
      }
    }
    setIsCountingDown(false);
    setCountdownTimer(0);
  }, [currentStep, currentStepData]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);

      if (!isLastStep) {
        showToastMessage(
          "⏰ Hết giờ! Thời gian cho bước này đã hoàn thành!\nBước tiếp theo sẽ diễn ra trong 5s nữa",
          5000
        );
        setIsCountingDown(true);
        setCountdownTimer(5);
      } else {
        showToastMessage(
          "⏰ Hết giờ! Thời gian cho bước này đã hoàn thành!",
          3000
        );
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, isLastStep]);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountingDown && countdownTimer > 0) {
      interval = setInterval(() => {
        setCountdownTimer(countdownTimer - 1);
      }, 1000);
    } else if (countdownTimer === 0 && isCountingDown) {
      setIsCountingDown(false);
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdownTimer, isLastStep, currentStep]);

  // Error screen
  if (!hasSteps) {
    return (
      <View style={recipeStyles.container}>
        <View style={recipeStyles.modernGuideHeader}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={recipeStyles.modernHeaderButton}
          >
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={recipeStyles.modernGuideTitle}>Hướng dẫn nấu ăn</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={recipeStyles.modernErrorContainer}>
          <View style={recipeStyles.modernErrorIcon}>
            <Ionicons name="restaurant-outline" size={64} color="#E0E0E0" />
          </View>
          <Text style={recipeStyles.modernErrorTitle}>Không có hướng dẫn</Text>
          <Text style={recipeStyles.modernErrorMessage}>
            Công thức này chưa có các bước hướng dẫn nấu ăn
          </Text>
          <TouchableOpacity
            style={recipeStyles.modernRetryButton}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#FFF" />
            <Text style={recipeStyles.modernRetryButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
    setIsCountingDown(false);
    setCountdownTimer(0);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsCountingDown(false);
    setCountdownTimer(0);
    const suggestedTime = currentStepData?.suggestedTime;
    if (suggestedTime) {
      setTimer(suggestedTime * 60);
    } else {
      setTimer(0);
    }
  };

  const startCustomTimer = () => {
    const minutes = parseInt(customTime);
    if (minutes > 0) {
      startTimer(minutes);
      setShowTimerModal(false);
      setCustomTime("");
    }
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      if (timer > 0) {
        setIsTimerRunning(true);
        setIsCountingDown(false);
        setCountdownTimer(0);
      } else {
        const suggestedTime = currentStepData?.suggestedTime;
        if (suggestedTime) {
          setTimer(suggestedTime * 60);
          setIsTimerRunning(true);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    setIsMarkingCooked(true);

    showToastMessage(
      `🎉 Hoàn thành! Chúc mừng bạn đã hoàn thành món ${recipeTitle}!`,
      4000
    );

    try {
      if (recipeId) {
        const numericRecipeId =
          typeof recipeId === "string" ? parseInt(recipeId, 10) : recipeId;

        const success = await markRecipeAsCooked(numericRecipeId);
        if (success) {
          console.log("Recipe marked as cooked successfully");
        }
      }
    } catch (error) {
      console.error("Error marking recipe as cooked:", error);
    } finally {
      setIsMarkingCooked(false);

      setTimeout(() => {
        if (navigation) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "MainTabs",
                params: {
                  screen: "Favorite",
                  params: {
                    recipeId,
                    fromGuide: true,
                  },
                },
              },
            ],
          });
        }
      }, 4000);
    }
  };

  const renderStepImages = (images?: string[]) => {
    if (!images || images.length === 0) return null;

    return (
      <View style={recipeStyles.modernStepImagesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={recipeStyles.modernStepImagesScroll}
          contentContainerStyle={{ paddingRight: 20 }}
          pagingEnabled
          snapToInterval={width - 60}
          decelerationRate="fast"
        >
          {images.map((imageUrl, index) => (
            <View
              key={index}
              style={{
                width: width - 80,
                marginLeft: 20,
                position: "relative",
              }}
            >
              <Image
                source={{ uri: imageUrl }}
                style={recipeStyles.modernStepImage}
                resizeMode="cover"
              />
              <View style={recipeStyles.modernImageBadge}>
                <Ionicons name="images" size={12} color="#FFF" />
                <Text style={recipeStyles.modernImageBadgeText}>
                  {index + 1}/{images.length}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {images.length > 1 && (
          <View style={recipeStyles.modernScrollHint}>
            <Ionicons name="swap-horizontal" size={16} color="#7F8C8D" />
            <Text style={recipeStyles.modernScrollHintText}>
              Lướt để xem {images.length} ảnh
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={recipeStyles.container}>
      {/* Toast */}
      {showToast && (
        <Animated.View
          style={[
            recipeStyles.modernToast,
            {
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <View style={recipeStyles.modernToastContent}>
            <Ionicons name="information-circle" size={24} color="#FFF" />
            <Text style={recipeStyles.modernToastText}>{toastMessage}</Text>
            <TouchableOpacity
              style={recipeStyles.modernToastClose}
              onPress={hideToast}
            >
              <Ionicons name="close" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Header */}
      <View style={recipeStyles.modernGuideHeader}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={recipeStyles.modernHeaderButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <View style={recipeStyles.modernHeaderCenter}>
          <Text style={recipeStyles.modernGuideTitle} numberOfLines={1}>
            {recipeTitle}
          </Text>
          <Text style={recipeStyles.modernGuideSubtitle}>
            Bước {currentStep + 1} / {steps.length}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={recipeStyles.modernProgressContainer}>
        <View style={recipeStyles.modernProgressBar}>
          <Animated.View
            style={[
              recipeStyles.modernProgressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <Text style={recipeStyles.modernProgressText}>
          {Math.round(progress)}%
        </Text>
      </View>

      {/* Timer Section */}
      <View style={recipeStyles.modernTimerSection}>
        <View style={recipeStyles.modernTimerDisplay}>
          <View style={recipeStyles.modernTimerIconWrapper}>
            <Ionicons
              name={isTimerRunning ? "timer" : "timer-outline"}
              size={32}
              color={isTimerRunning ? "#FF6B6B" : "#95A5A6"}
            />
          </View>
          <View style={recipeStyles.modernTimerInfo}>
            <Text style={recipeStyles.modernTimerText}>
              {formatTime(timer)}
            </Text>
            <Text style={recipeStyles.modernTimerStatus}>
              {isTimerRunning
                ? "Đang chạy"
                : isCountingDown
                ? `Chuyển sau ${countdownTimer}s`
                : "Đã dừng"}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              recipeStyles.modernTimerToggle,
              isTimerRunning && recipeStyles.modernTimerToggleActive,
            ]}
            onPress={toggleTimer}
            disabled={isCountingDown}
          >
            <Ionicons
              name={isTimerRunning ? "pause" : "play"}
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>

        {isCountingDown && (
          <View style={recipeStyles.modernCountdownBanner}>
            <Ionicons name="time" size={16} color="#FF9800" />
            <Text style={recipeStyles.modernCountdownText}>
              Tự động chuyển sang bước tiếp theo sau {countdownTimer}s
            </Text>
          </View>
        )}

        {/* Timer Quick Actions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={recipeStyles.modernTimerQuickActions}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {/*
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(3)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>3p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(5)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>5p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(10)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>10p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(currentStepData?.suggestedTime || 5)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => setShowTimerModal(true)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>Tùy chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={resetTimer}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>Reset</Text>
          </TouchableOpacity>
          */}
          {/*
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(3)}
            disabled={isCountingDown}
          >
            <Ionicons name="time-outline" size={18} color="#FF6B6B" />
            <Text style={recipeStyles.modernTimerPresetText}>3 phút</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(5)}
            disabled={isCountingDown}
          >
            <Ionicons name="time-outline" size={18} color="#FF6B6B" />
            <Text style={recipeStyles.modernTimerPresetText}>5 phút</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(10)}
            disabled={isCountingDown}
          >
            <Ionicons name="time-outline" size={18} color="#FF6B6B" />
            <Text style={recipeStyles.modernTimerPresetText}>10 phút</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => startTimer(currentStepData?.suggestedTime || 5)}
            disabled={isCountingDown}
          >
            <Ionicons name="bulb-outline" size={18} color="#FF6B6B" />
            <Text style={recipeStyles.modernTimerPresetText}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.modernTimerPreset}
            onPress={() => setShowTimerModal(true)}
            disabled={isCountingDown}
          >
            <Ionicons name="create-outline" size={18} color="#FF6B6B" />
            <Text style={recipeStyles.modernTimerPresetText}>Tùy chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              recipeStyles.modernTimerPreset,
              recipeStyles.modernTimerPresetReset,
            ]}
            onPress={resetTimer}
            disabled={isCountingDown}
          >
            <Ionicons name="refresh-outline" size={18} color="#E74C3C" />
            <Text
              style={[
                recipeStyles.modernTimerPresetText,
                { color: "#E74C3C" },
              ]}
            >
              Reset
            </Text>
          </TouchableOpacity>
          */}
        </ScrollView>
      </View>

      {/* Step Content */}
      <ScrollView
        style={recipeStyles.modernStepContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={recipeStyles.modernStepCard}>
          {/* Step Header */}
          <View style={recipeStyles.modernStepHeader}>
            <View style={recipeStyles.modernStepBadge}>
              <Ionicons name="footsteps" size={16} color="#FFF" />
              <Text style={recipeStyles.modernStepBadgeText}>
                Bước {currentStepData?.stepNo || currentStep + 1}
              </Text>
            </View>
            {currentStepData?.suggestedTime && (
              <View style={recipeStyles.modernStepTimeBadge}>
                <Ionicons name="time-outline" size={14} color="#FF9800" />
                <Text style={recipeStyles.modernStepTimeBadgeText}>
                  {currentStepData.suggestedTime} phút
                </Text>
              </View>
            )}
          </View>

          {/* Step Images */}
          {renderStepImages(currentStepData?.images)}

          {/* Step Content */}
          <Text style={recipeStyles.modernStepText}>
            {currentStepData?.content}
          </Text>

          {/* Step Tips */}
          {currentStepData?.tips && (
            <View style={recipeStyles.modernTipsCard}>
              <View style={recipeStyles.modernTipsHeader}>
                <Ionicons name="bulb" size={20} color="#FFA726" />
                <Text style={recipeStyles.modernTipsTitle}>Mẹo hữu ích</Text>
              </View>
              <Text style={recipeStyles.modernTipsText}>
                {currentStepData.tips}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={recipeStyles.modernNavigation}>
        <TouchableOpacity
          style={[
            recipeStyles.modernNavButton,
            recipeStyles.modernNavButtonPrev,
            (isFirstStep || isCountingDown || isMarkingCooked) &&
              recipeStyles.modernNavButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={isFirstStep || isCountingDown || isMarkingCooked}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={
              isFirstStep || isCountingDown || isMarkingCooked
                ? "#BDC3C7"
                : "#2C3E50"
            }
          />
          <Text
            style={[
              recipeStyles.modernNavButtonText,
              (isFirstStep || isCountingDown || isMarkingCooked) &&
                recipeStyles.modernNavButtonTextDisabled,
            ]}
          >
            Quay lại
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeStyles.modernNavButton,
            isLastStep
              ? recipeStyles.modernNavButtonComplete
              : recipeStyles.modernNavButtonNext,
            (isCountingDown || isMarkingCooked) &&
              recipeStyles.modernNavButtonDisabled,
          ]}
          onPress={isLastStep ? handleComplete : handleNext}
          disabled={isCountingDown || isMarkingCooked}
        >
          {isMarkingCooked ? (
            <>
              <Ionicons name="hourglass-outline" size={20} color="#FFF" />
              <Text style={recipeStyles.modernNavButtonTextWhite}>
                Đang lưu...
              </Text>
            </>
          ) : (
            <>
              <Text style={recipeStyles.modernNavButtonTextWhite}>
                {isLastStep ? "Hoàn thành" : "Tiếp theo"}
              </Text>
              <Ionicons
                name={isLastStep ? "checkmark-circle" : "chevron-forward"}
                size={20}
                color="#FFF"
              />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Custom Timer Modal */}
      <Modal
        visible={showTimerModal && !isCountingDown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimerModal(false)}
      >
        <View style={recipeStyles.modernModalOverlay}>
          <View style={recipeStyles.modernModalContainer}>
            <View style={recipeStyles.modernModalHeader}>
              <Ionicons name="time" size={24} color="#FF6B6B" />
              <Text style={recipeStyles.modernModalTitle}>
                Đặt thời gian tùy chỉnh
              </Text>
            </View>

            <View style={recipeStyles.modernModalBody}>
              <Text style={recipeStyles.modernModalLabel}>
                Nhập số phút (1-999)
              </Text>
              <View style={recipeStyles.modernModalInputWrapper}>
                <Ionicons name="timer-outline" size={20} color="#7F8C8D" />
                <TextInput
                  style={recipeStyles.modernModalInput}
                  placeholder="Ví dụ: 15"
                  value={customTime}
                  onChangeText={setCustomTime}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor="#95A5A6"
                />
                <Text style={recipeStyles.modernModalInputUnit}>phút</Text>
              </View>
            </View>

            <View style={recipeStyles.modernModalFooter}>
              <TouchableOpacity
                style={recipeStyles.modernModalButtonCancel}
                onPress={() => {
                  setShowTimerModal(false);
                  setCustomTime("");
                }}
              >
                <Text style={recipeStyles.modernModalButtonCancelText}>
                  Hủy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={recipeStyles.modernModalButtonConfirm}
                onPress={startCustomTimer}
              >
                <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                <Text style={recipeStyles.modernModalButtonConfirmText}>
                  Bắt đầu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RecipeGuideScreen;
