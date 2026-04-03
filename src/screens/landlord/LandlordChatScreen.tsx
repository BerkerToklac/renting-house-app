import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_CHAT_ROOMS, MOCK_CHAT_MESSAGES } from '../../data/mockData';
import { ChatMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';

const ChatRoomList = ({ userId, onSelect }: { userId: string; onSelect: (id: string, name: string) => void }) => {
  const insets = useSafeAreaInsets();
  const rooms = MOCK_CHAT_ROOMS.filter(
    (r) => r.participants.includes(userId) || r.type === 'support'
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Sohbetler</Text>
      </View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const otherName = item.participantNames.find((n) => !n.includes('Destek') && n !== 'Destek Ekibi') ?? item.participantNames[0];
          return (
            <TouchableOpacity style={styles.roomItem} onPress={() => onSelect(item.id, otherName)}>
              <View style={[styles.avatar, { backgroundColor: item.type === 'support' ? COLORS.primary : COLORS.secondary }]}>
                <Text style={styles.avatarText}>{otherName[0]}</Text>
              </View>
              <View style={styles.roomInfo}>
                <View style={styles.roomRow}>
                  <Text style={styles.roomName}>{otherName}</Text>
                  <Text style={styles.roomTime}>{item.lastMessageTime}</Text>
                </View>
                <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
              </View>
              {item.unreadCount > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{item.unreadCount}</Text></View>
              )}
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      />
    </View>
  );
};

const ChatDetail = ({ roomId, userName, userId, onBack }: { roomId: string; userName: string; userId: string; onBack: () => void }) => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES[roomId] ?? []);

  const send = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: userId,
      senderName: 'Siz',
      senderRole: 'landlord',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages((p) => [...p, msg]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.chatName}>{userName}</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => {
            const isMe = item.senderId === userId;
            return (
              <View style={[styles.msgRow, isMe ? styles.msgRight : styles.msgLeft]}>
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                  {!isMe && <Text style={styles.bubbleSender}>{item.senderName}</Text>}
                  <Text style={[styles.bubbleText, isMe && { color: COLORS.white }]}>{item.text}</Text>
                  <Text style={[styles.bubbleTime, isMe && { color: 'rgba(255,255,255,0.7)' }]}>{item.timestamp}</Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={{ padding: SPACING.md }}
          showsVerticalScrollIndicator={false}
        />
        <View style={[styles.inputRow, { paddingBottom: insets.bottom + SPACING.xs }]}>
          <TextInput
            style={styles.msgInput}
            placeholder="Mesajınızı yazın..."
            placeholderTextColor={COLORS.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Ionicons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const LandlordChatScreen = () => {
  const { user } = useAuth();
  const [activeRoom, setActiveRoom] = useState<{ id: string; name: string } | null>(null);

  if (!user) return null;

  if (activeRoom) {
    return <ChatDetail roomId={activeRoom.id} userName={activeRoom.name} userId={user.id} onBack={() => setActiveRoom(null)} />;
  }
  return <ChatRoomList userId={user.id} onSelect={(id, name) => setActiveRoom({ id, name })} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  roomItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  avatarText: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  roomInfo: { flex: 1 },
  roomRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  roomName: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  roomTime: { fontSize: 12, color: COLORS.textSecondary },
  lastMsg: { fontSize: 13, color: COLORS.textSecondary },
  badge: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  separator: { height: 1, backgroundColor: COLORS.border, marginLeft: 76 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backBtn: { padding: SPACING.xs, marginRight: SPACING.sm },
  chatName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  msgRow: { marginBottom: SPACING.sm },
  msgRight: { alignItems: 'flex-end' },
  msgLeft: { alignItems: 'flex-start' },
  bubble: { maxWidth: '75%', padding: SPACING.sm, borderRadius: RADIUS.md },
  bubbleMe: { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: COLORS.surface, borderBottomLeftRadius: 4 },
  bubbleSender: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 2 },
  bubbleText: { fontSize: 14, color: COLORS.text },
  bubbleTime: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4, alignSelf: 'flex-end' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white, gap: SPACING.sm },
  msgInput: { flex: 1, backgroundColor: COLORS.surface, borderRadius: RADIUS.round, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, maxHeight: 100, color: COLORS.text, fontSize: 14 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
});
