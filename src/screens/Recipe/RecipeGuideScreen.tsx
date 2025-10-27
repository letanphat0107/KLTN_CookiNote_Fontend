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

interface RecipeGuideScreenProps {
  route?: {
    params?: {
      recipeId?: string;
    };
  };
  navigation?: any;
}

// Mock data with timer suggestions for each step
const mockSteps = [
  {
    id: 1,
    content:
      "Rửa sạch xương bò, cho vào nồi nước sôi chần 5 phút để loại bỏ tạp chất",
    step_no: 1,
    recipe_id: 1,
    image_url:
      "https://www.vinmec.com/static/uploads/20210427_031826_543746_rua_rau_dung_cach_6_max_1800x1800_jpg_6b3b189b71.jpg",
    suggested_time: 1, // minutes
    tips: "Nước chần phải sôi thật mạnh để loại bỏ tạp chất hiệu quả",
  },
  {
    id: 2,
    content: "Nướng hành tây và gừng trên bếp gas cho thơm, sau đó rửa sạch",
    step_no: 2,
    recipe_id: 1,
    image_url:
      "https://www.vinmec.com/static/uploads/20210427_031826_543746_rua_rau_dung_cach_6_max_1800x1800_jpg_6b3b189b71.jpg",
    suggested_time: 10,
    tips: "Nướng đến khi có mùi thơm và hơi cháy nhẹ bề mặt",
  },
  {
    id: 3,
    content:
      "Cho xương bò đã chần vào nồi nước lạnh, nấu trên lửa lớn đến khi sôi",
    step_no: 3,
    recipe_id: 1,
    image_url:
      "https://www.vinmec.com/static/uploads/20210427_031826_543746_rua_rau_dung_cach_6_max_1800x1800_jpg_6b3b189b71.jpg",
    suggested_time: 15,
    tips: "Dùng nước lạnh để nước dùng trong hơn",
  },
  {
    id: 4,
    content:
      "Hạ lửa nhỏ, vớt bọt, thêm hành tây, gừng nướng và gia vị. Niêu 2-3 tiếng",
    step_no: 4,
    recipe_id: 1,
    image_url:
      "https://www.vinmec.com/static/uploads/20210427_031826_543746_rua_rau_dung_cach_6_max_1800x1800_jpg_6b3b189b71.jpg",
    suggested_time: 120, // 2 hours
    tips: "Vớt bọt thường xuyên trong 30 phút đầu",
  },
  {
    id: 5,
    content: "Chần bánh phở, thái thịt bò mỏng, chuẩn bị rau thơm và bày biện",
    step_no: 5,
    recipe_id: 1,
    image_url:
      "https://www.vinmec.com/static/uploads/20210427_031826_543746_rua_rau_dung_cach_6_max_1800x1800_jpg_6b3b189b71.jpg",
    suggested_time: 10,
    tips: "Thịt bò cắt ngược thớ sẽ mềm hơn",
  },
];

const RecipeGuideScreen: React.FC<RecipeGuideScreenProps> = ({
  route,
  navigation,
}) => {
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

  const currentStepData = mockSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === mockSteps.length - 1;

  // Toast functions
  const showToastMessage = (message: string, duration: number = 3000) => {
    // Hide any existing toast first
    hideToast();

    setToastMessage(message);
    setShowToast(true);

    // Animate in
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

    // Auto hide after duration
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
    // Close any existing toast when changing steps
    hideToast();

    const suggestedTime = currentStepData?.suggested_time;
    if (suggestedTime) {
      setTimer(suggestedTime * 60); // convert minutes to seconds
      setIsTimerRunning(true); // Auto-start timer
    } else {
      setTimer(0); // 00:00 if no suggested time
      setIsTimerRunning(false);
    }
    setIsCountingDown(false); // Reset countdown when changing steps
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
        // Show toast and start countdown for next step
        showToastMessage(
          "⏰ Hết giờ! Thời gian cho bước này đã hoàn thành!\nBước tiếp theo sẽ diễn ra trong 5s nữa",
          5000
        );
        setIsCountingDown(true);
        setCountdownTimer(5);
      } else {
        // Last step - just show completion toast
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
      // Auto move to next step
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdownTimer, isLastStep, currentStep]);

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
    setIsCountingDown(false); // Stop any countdown
    setCountdownTimer(0);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsCountingDown(false);
    setCountdownTimer(0);
    const suggestedTime = currentStepData?.suggested_time;
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
        setIsCountingDown(false); // Stop countdown if manually starting timer
        setCountdownTimer(0);
      } else {
        // If timer is 0, start with suggested time
        const suggestedTime = currentStepData?.suggested_time;
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
      "🎉 Hoàn thành! Chúc mừng bạn đã hoàn thành món Phở Bò Truyền Thống!",
      4000
    );

    // Navigate after toast and reset navigation stack
    setTimeout(() => {
      if (navigation) {
        // Replace current stack with RecipeDetail (remove RecipeGuide from stack)
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
        <Text style={recipeStyles.guideTitle}>Hướng dẫn nấu ăn</Text>
        <View style={recipeStyles.stepIndicator}>
          <Text style={recipeStyles.stepIndicatorText}>
            {currentStep + 1}/{mockSteps.length}
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

        {/* Countdown indicator when auto-transitioning */}
        {isCountingDown && (
          <View style={recipeStyles.countdownContainer}>
            <Text style={recipeStyles.countdownText}>
              Chuyển sang bước tiếp theo trong: {countdownTimer}s
            </Text>
          </View>
        )}

        {/* Main Start/Stop Button */}
        <View style={recipeStyles.mainTimerControl}>
          <TouchableOpacity
            style={[
              recipeStyles.mainTimerButton,
              isTimerRunning
                ? recipeStyles.stopMainButton
                : recipeStyles.startMainButton,
            ]}
            onPress={toggleTimer}
            disabled={isCountingDown} // Disable during countdown
          >
            <Text style={recipeStyles.mainTimerButtonText}>
              {isTimerRunning ? "⏸️ Dừng" : "▶️ Bắt đầu"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Timer Controls */}
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
            onPress={() => startTimer(currentStepData?.suggested_time || 5)}
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
            Bước {currentStepData.step_no}
          </Text>

          {currentStepData.image_url && (
            <Image
              source={{ uri: currentStepData.image_url }}
              style={recipeStyles.stepGuideImage}
            />
          )}

          <Text style={recipeStyles.currentStepContent}>
            {currentStepData.content}
          </Text>

          {currentStepData.suggested_time && (
            <View style={recipeStyles.suggestedTimeContainer}>
              <Text style={recipeStyles.suggestedTimeText}>
                ⏱️ Thời gian gợi ý: {currentStepData.suggested_time} phút
              </Text>
            </View>
          )}

          {currentStepData.tips && (
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
