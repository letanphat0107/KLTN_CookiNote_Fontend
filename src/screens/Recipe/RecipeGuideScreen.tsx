import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
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
    image_url: "https://via.placeholder.com/300x200",
    suggested_time: 5, // minutes
    tips: "Nước chần phải sôi thật mạnh để loại bỏ tạp chất hiệu quả",
  },
  {
    id: 2,
    content: "Nướng hành tây và gừng trên bếp gas cho thơm, sau đó rửa sạch",
    step_no: 2,
    recipe_id: 1,
    image_url: "https://via.placeholder.com/300x200",
    suggested_time: 10,
    tips: "Nướng đến khi có mùi thơm và hơi cháy nhẹ bề mặt",
  },
  {
    id: 3,
    content:
      "Cho xương bò đã chần vào nồi nước lạnh, nấu trên lửa lớn đến khi sôi",
    step_no: 3,
    recipe_id: 1,
    image_url: "https://via.placeholder.com/300x200",
    suggested_time: 15,
    tips: "Dùng nước lạnh để nước dùng trong hơn",
  },
  {
    id: 4,
    content:
      "Hạ lửa nhỏ, vớt bọt, thêm hành tây, gừng nướng và gia vị. Niêu 2-3 tiếng",
    step_no: 4,
    recipe_id: 1,
    image_url: "https://via.placeholder.com/300x200",
    suggested_time: 120, // 2 hours
    tips: "Vớt bọt thường xuyên trong 30 phút đầu",
  },
  {
    id: 5,
    content: "Chần bánh phở, thái thịt bò mỏng, chuẩn bị rau thơm và bày biện",
    step_no: 5,
    recipe_id: 1,
    image_url: "https://via.placeholder.com/300x200",
    suggested_time: 10,
    tips: "Thịt bò cắt ngược thớ sẽ mềm hơn",
  },
];

const RecipeGuideScreen: React.FC<RecipeGuideScreenProps> = ({
  route,
  navigation,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0); // seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [customTime, setCustomTime] = useState("");

  const currentStepData = mockSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === mockSteps.length - 1;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      Alert.alert("⏰ Hết giờ!", "Thời gian cho bước này đã hoàn thành!");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

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
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const startCustomTimer = () => {
    const minutes = parseInt(customTime);
    if (minutes > 0) {
      startTimer(minutes);
      setShowTimerModal(false);
      setCustomTime("");
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      stopTimer();
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      stopTimer();
    }
  };

  const handleComplete = () => {
    Alert.alert(
      "🎉 Hoàn thành!",
      "Chúc mừng bạn đã hoàn thành món Phở Bò Truyền Thống!",
      [
        {
          text: "Đánh giá",
          onPress: () => {
            /* TODO: Rating */
          },
        },
        {
          text: "Về trang chủ",
          onPress: () => navigation?.navigate("HomeScreen"),
        },
      ]
    );
  };

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={recipeStyles.container}>
      {/* Header */}
      <View style={recipeStyles.guideHeader}>
        <TouchableOpacity onPress={handleBack} style={recipeStyles.backButton}>
          <Text style={recipeStyles.backButtonText}>←</Text>
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
            {isTimerRunning ? "Đang đếm ngược" : "Dừng"}
          </Text>
        </View>
        <View style={recipeStyles.timerControls}>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(3)}
          >
            <Text style={recipeStyles.timerButtonText}>3p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(5)}
          >
            <Text style={recipeStyles.timerButtonText}>5p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(10)}
          >
            <Text style={recipeStyles.timerButtonText}>10p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => startTimer(currentStepData?.suggested_time || 5)}
          >
            <Text style={recipeStyles.timerButtonText}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={recipeStyles.timerButton}
            onPress={() => setShowTimerModal(true)}
          >
            <Text style={recipeStyles.timerButtonText}>Tùy chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[recipeStyles.timerButton, recipeStyles.stopButton]}
            onPress={stopTimer}
          >
            <Text style={recipeStyles.timerButtonText}>Dừng</Text>
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
            isFirstStep && recipeStyles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={isFirstStep}
        >
          <Text
            style={[
              recipeStyles.navButtonText,
              isFirstStep && recipeStyles.disabledButtonText,
            ]}
          >
            ← Bước trước
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeStyles.navButton,
            isLastStep ? recipeStyles.completeButton : recipeStyles.nextButton,
          ]}
          onPress={isLastStep ? handleComplete : handleNext}
        >
          <Text style={recipeStyles.navButtonText}>
            {isLastStep ? "🎉 Hoàn thành" : "Bước tiếp →"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Custom Timer Modal */}
      <Modal
        visible={showTimerModal}
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
