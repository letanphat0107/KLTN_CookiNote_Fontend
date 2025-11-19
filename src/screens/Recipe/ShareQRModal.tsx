// src/components/Recipe/ShareQRModal.tsx
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Share,
  Alert,
} from "react-native";

interface ShareQRModalProps {
  visible: boolean;
  onClose: () => void;
  shareData: {
    shareCode: string;
    shareUrl: string;
    qrCodeBase64: string;
  } | null;
  recipeTitle: string;
}

const ShareQRModal: React.FC<ShareQRModalProps> = ({
  visible,
  onClose,
  shareData,
  recipeTitle,
}) => {
  const handleShareLink = async () => {
    if (!shareData) return;

    try {
      await Share.share({
        message: `Xem công thức "${recipeTitle}" tại: ${shareData.shareUrl}`,
        url: shareData.shareUrl,
        title: `Chia sẻ công thức: ${recipeTitle}`,
      });
    } catch (error) {
      console.error("Error sharing link:", error);
    }
  };

  if (!shareData) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chia sẻ công thức</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Recipe Title */}
          <Text style={styles.recipeTitle} numberOfLines={2}>
            {recipeTitle}
          </Text>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: shareData.qrCodeBase64 }}
              style={styles.qrCode}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.instructionText}>
            Quét mã QR để xem công thức
          </Text>

          {/* Share Code */}
          <View style={styles.shareCodeContainer}>
            <Text style={styles.shareCodeLabel}>Mã chia sẻ:</Text>
            <Text style={styles.shareCodeText}>{shareData.shareCode}</Text>
          </View>

          {/* Share URL */}
          {/* <View style={styles.shareUrlContainer}>
            <Text style={styles.shareUrlText} numberOfLines={2}>
              {shareData.shareUrl}
            </Text>
          </View> */}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {/* <TouchableOpacity
              style={styles.shareLinkButton}
              onPress={handleShareLink}
            >
              <Text style={styles.shareLinkButtonText}>📤 Chia sẻ link</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
              <Text style={styles.closeModalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#666",
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B35",
    marginBottom: 20,
    textAlign: "center",
  },
  qrContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  qrCode: {
    width: 250,
    height: 250,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  shareCodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  shareCodeLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  shareCodeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  shareUrlContainer: {
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 20,
  },
  shareUrlText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  actionButtons: {
    gap: 12,
  },
  shareLinkButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  shareLinkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeModalButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ShareQRModal;
