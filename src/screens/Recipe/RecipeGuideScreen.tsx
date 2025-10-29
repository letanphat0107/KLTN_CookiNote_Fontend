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
} from "react-native";
import { recipeStyles } from "./styles";
import { RecipeStep } from "../../types/recipe";

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
  // Get steps and recipe info from navigation params
  const steps = route?.params?.steps || [];
  const recipeTitle = route?.params?.recipeTitle || "Hướng dẫn nấu ăn";
  const recipeId = route?.params?.recipeId;

  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0); // seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [countdownTimer, setCountdownTimer] = useState(0); // For auto-next countdown
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Toast message state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];
  const toastTranslateY = useState(new Animated.Value(-100))[0];

  // Check if we have valid steps
  const hasSteps = steps && steps.length > 0;
  const currentStepData = hasSteps ? steps[currentStep] : null;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

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

  // Set default timer when step changes and auto-start
  useEffect(() => {
    hideToast();

    if (currentStepData) {
      const suggestedTime = currentStepData.suggestedTime;
      if (suggestedTime) {
        setTimer(suggestedTime * 60); // convert minutes to seconds
        setIsTimerRunning(true); // Auto-start timer
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

  // Countdown effect for auto-next step
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

  // Show error if no steps provided
  if (!hasSteps) {
    return (
      <View style={recipeStyles.container}>
        <View style={recipeStyles.guideHeader}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={recipeStyles.backButton}
          >
            <Image
              source={require("../../../assets/images/vector.png")}
              style={recipeStyles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={recipeStyles.guideTitle}>Hướng dẫn nấu ăn</Text>
          <View style={recipeStyles.stepIndicator} />
        </View>

        <View style={recipeStyles.errorContainer}>
          <Text style={recipeStyles.errorTitle}>😔 Oops!</Text>
          <Text style={recipeStyles.errorMessage}>
            Không có hướng dẫn nấu ăn cho công thức này
          </Text>
          <TouchableOpacity
            style={recipeStyles.retryButton}
            onPress={() => navigation?.goBack()}
          >
            <Text style={recipeStyles.retryButtonText}>Quay lại</Text>
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

  const stopTimer = () => {
    setIsTimerRunning(false);
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

  const handleComplete = () => {
    showToastMessage(
      `🎉 Hoàn thành! Chúc mừng bạn đã hoàn thành món ${recipeTitle}!`,
      4000
    );

    setTimeout(() => {
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainTabs",
              params: { recipeId },
            },
          ],
        });
      }
    }, 2000);
  };

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  // Render step images with horizontal scroll
// src/screens/Recipe/RecipeGuideScreen.tsx
// Cập nhật renderStepImages function

const renderStepImages = (images?: string[]) => {
  if (!images || images.length === 0) return null;

  return (
    <View style={recipeStyles.stepImagesWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={recipeStyles.stepImagesContainer}
        contentContainerStyle={{ paddingRight: 15 }}
      >
        {images.map((imageUrl, index) => (
          <View
            key={index}
            style={[
              recipeStyles.stepImageContainer,
              index === 0 && { marginLeft: 0 },
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={recipeStyles.stepImage} // Changed from stepGuideImage to stepImage
              resizeMode="cover"
            />
            
            {/* Image counter */}
            <View style={recipeStyles.imageCounter}>
              <Text style={recipeStyles.imageCounterText}>
                {index + 1}/{images.length}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Instructions for multiple images */}
      {images.length > 1 && (
        <Text style={recipeStyles.scrollHint}>
          📸 Lướt để xem {images.length} ảnh hướng dẫn
        </Text>
      )}
    </View>
  );
};

  return (
    <View style={recipeStyles.container}>
      {/* Toast Message */}
      {showToast && (
        <Animated.View
          style={[
            recipeStyles.toastContainer,
            {
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <View style={recipeStyles.toastContent}>
            <Text style={recipeStyles.toastText}>{toastMessage}</Text>
            <TouchableOpacity
              style={recipeStyles.toastCloseButton}
              onPress={hideToast}
            >
              <Text style={recipeStyles.toastCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Header */}
      <View style={recipeStyles.guideHeader}>
        <TouchableOpacity onPress={handleBack} style={recipeStyles.backButton}>
          <Image
            source={require("../../../assets/images/vector.png")}
            style={recipeStyles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={recipeStyles.guideTitle} numberOfLines={1}>
          {recipeTitle}
        </Text>
        <View style={recipeStyles.stepIndicator}>
          <Text style={recipeStyles.stepIndicatorText}>
            {currentStep + 1}/{steps.length}
          </Text>
        </View>
      </View>

      {/* Timer Section */}
      <View style={recipeStyles.timerSection}>
        <View style={recipeStyles.timerDisplay}>
          <Text style={recipeStyles.timerText}>{formatTime(timer)}</Text>
          <Text style={recipeStyles.timerStatus}>
            {isTimerRunning
              ? "Đang đếm ngược"
              : isCountingDown
              ? `Chuyển bước sau ${countdownTimer}s`
              : "Dừng"}
          </Text>
        </View>

        {isCountingDown && (
          <View style={recipeStyles.countdownContainer}>
            <Text style={recipeStyles.countdownText}>
              Chuyển sang bước tiếp theo trong: {countdownTimer}s
            </Text>
          </View>
        )}

        <View style={recipeStyles.mainTimerControl}>
          <TouchableOpacity
            style={[
              recipeStyles.mainTimerButton,
              isTimerRunning
                ? recipeStyles.stopMainButton
                : recipeStyles.startMainButton,
            ]}
            onPress={toggleTimer}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.mainTimerButtonText}>
              {isTimerRunning ? "⏸️ Dừng" : "▶️ Bắt đầu"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={recipeStyles.timerControls}>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(3)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>3p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(5)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>5p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(10)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>10p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(currentStepData?.suggestedTime || 5)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => setShowTimerModal(true)}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>Tùy chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={resetTimer}
            disabled={isCountingDown}
          >
            <Text style={recipeStyles.timerButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Step Content */}
      <ScrollView
        style={recipeStyles.stepContentGUI}
        contentContainerStyle={recipeStyles.stepScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={recipeStyles.currentStep}>
          <Text style={recipeStyles.currentStepNumber}>
            Bước {currentStepData?.stepNo || currentStep + 1}
          </Text>

          {/* Step Images */}
          {renderStepImages(currentStepData?.images)}

          <Text style={recipeStyles.currentStepContent}>
            {currentStepData?.content}
          </Text>

          {currentStepData?.suggestedTime && (
            <View style={recipeStyles.suggestedTimeContainer}>
              <Text style={recipeStyles.suggestedTimeText}>
                ⏱️ Thời gian gợi ý: {currentStepData.suggestedTime} phút
              </Text>
            </View>
          )}

          {currentStepData?.tips && (
            <View style={recipeStyles.tipsContainer}>
              <Text style={recipeStyles.tipsTitle}>💡 Mẹo nhỏ:</Text>
              <Text style={recipeStyles.tipsText}>{currentStepData.tips}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={recipeStyles.navigationButtons}>
        <TouchableOpacity
          style={[
            recipeStyles.navButton,
            recipeStyles.prevButton,
            (isFirstStep || isCountingDown) && recipeStyles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={isFirstStep || isCountingDown}
        >
          <Text
            style={[
              recipeStyles.navButtonText,
              (isFirstStep || isCountingDown) &&
                recipeStyles.disabledButtonText,
            ]}
          >
            ← Bước trước
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeStyles.navButton,
            isLastStep ? recipeStyles.completeButton : recipeStyles.nextButton,
            isCountingDown && recipeStyles.disabledButton,
          ]}
          onPress={isLastStep ? handleComplete : handleNext}
          disabled={isCountingDown}
        >
          <Text
            style={[
              recipeStyles.navButtonText,
              isCountingDown && recipeStyles.disabledButtonText,
            ]}
          >
            {isLastStep ? "🎉 Hoàn thành" : "Bước tiếp →"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Custom Timer Modal */}
      <Modal
        visible={showTimerModal && !isCountingDown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimerModal(false)}
      >
        <View style={recipeStyles.modalOverlay}>
          <View style={recipeStyles.modalContent}>
            <Text style={recipeStyles.modalTitle}>Đặt thời gian tùy chỉnh</Text>
            <TextInput
              style={recipeStyles.modalInput}
              placeholder="Nhập số phút"
              value={customTime}
              onChangeText={setCustomTime}
              keyboardType="numeric"
            />
            <View style={recipeStyles.modalButtons}>
              <TouchableOpacity
                style={recipeStyles.modalCancelButton}
                onPress={() => setShowTimerModal(false)}
              >
                <Text style={recipeStyles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={recipeStyles.modalConfirmButton}
                onPress={startCustomTimer}
              >
                <Text style={recipeStyles.modalConfirmText}>Bắt đầu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RecipeGuideScreen;
