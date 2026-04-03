import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_CHAT_ROOMS, MOCK_CHAT_MESSAGES } from '../../data/mockData';
import { ChatMessage } from '../../types';

const ChatRoomList = ({ onSelect }: { onSelect: (roomId: string, name: string) => void }) => {
  const insets = useSafeAreaInsets();
  const supportRooms = MOCK_CHAT_ROOMS;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Destek Sohbetleri</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>2 Yeni</Text></View>
      </View>
      <FlatList
        data={supportRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.roomItem} onPress={() => onSelect(item.id, item.participantNames[0])}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.participantNames[0][0]}</Text>
            </View>
            <View style={styles.roomInfo}>
              <View style={styles.roomHeader}>
                <Text style={styles.roomName}>{item.participantNames[0]}</Text>
                <Text style={styles.roomTime}>{item.lastMessageTime}</Text>
              </View>
              <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      />
    </View>
  );
};

const ChatDetail = ({
  roomId,
  userName,
  onBack,
}: {
  roomId: string;
  userName: string;
  onBack: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES[roomId] ?? []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'admin1',
      senderName: 'Destek Ekibi',
      senderRole: 'admin',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{userName}</Text>
            <Text style={styles.chatOnline}>Çevrimiçi</Text>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => {
            const isMe = item.senderId === 'admin1';
            return (
              <View style={[styles.msgRow, isMe ? styles.msgRowRight : styles.msgRowLeft]}>
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                  {!isMe && <Text style={styles.bubbleSender}>{item.senderName}</Text>}
                  <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{item.text}</Text>
                  <Text style={[styles.bubbleTime, isMe && styles.bubbleTimeMe]}>{item.timestamp}</Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.msgList}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View style={[styles.inputRow, { paddingBottom: insets.bottom + SPACING.xs }]}>
          <TextInput
            style={styles.msgInput}
            placeholder="Mesajınızı yazın..."
            placeholderTextColor={COLORS.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const AdminChatScreen = () => {
  const [activeRoom, setActiveRoom] = useState<{ id: string; name: string } | null>(null);

  if (activeRoom) {
    return <ChatDetail roomId={activeRoom.id} userName={activeRoom.name} onBack={() => setActiveRoom(null)} />;
  }
  return <ChatRoomList onSelect={(id, name) => setActiveRoom({ id, name })} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, gap: SPACING.sm },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  badge: { backgroundColor: COLORS.primary, borderRadius: RADIUS.round, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  roomItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  avatarText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  roomInfo: { flex: 1 },
  roomHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  roomName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  roomTime: { fontSize: 12, color: COLORS.textSecondary },
  lastMsg: { fontSize: 13, color: COLORS.textSecondary },
  unreadBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  unreadText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  separator: { height: 1, backgroundColor: COLORS.border, marginLeft: 76 },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { padding: SPACING.xs, marginRight: SPACING.sm },
  chatHeaderInfo: {},
  chatHeaderName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  chatOnline: { fontSize: 12, color: COLORS.success },
  msgList: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  msgRow: { marginBottom: SPACING.sm },
  msgRowRight: { alignItems: 'flex-end' },
  msgRowLeft: { alignItems: 'flex-start' },
  bubble: {
    maxWidth: '75%',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  bubbleMe: { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: COLORS.surface, borderBottomLeftRadius: 4 },
  bubbleSender: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 2, fontWeight: '600' },
  bubbleText: { fontSize: 14, color: COLORS.text },
  bubbleTextMe: { color: COLORS.white },
  bubbleTime: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4, alignSelf: 'flex-end' },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.7)' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
    gap: SPACING.sm,
  },
  msgInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    maxHeight: 100,
    color: COLORS.text,
    fontSize: 14,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
