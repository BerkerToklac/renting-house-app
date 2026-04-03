import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../navigation/theme';
import { MOCK_DOCUMENTS } from '../../data/mockData';
import { Document } from '../../types';
import { Badge } from '../../components/Badge';

const DOC_TYPE_MAP: Record<string, { label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  title_deed: { label: 'Tapu Belgesi', icon: 'home-outline' },
  insurance: { label: 'Sigorta', icon: 'shield-checkmark-outline' },
  identity: { label: 'Kimlik', icon: 'card-outline' },
  tax: { label: 'Vergi Levhası', icon: 'receipt-outline' },
  other: { label: 'Diğer', icon: 'document-outline' },
};

const STATUS_MAP: Record<string, { label: string; variant: any }> = {
  approved: { label: 'Onaylandı', variant: 'success' },
  pending: { label: 'İnceleniyor', variant: 'warning' },
  rejected: { label: 'Reddedildi', variant: 'error' },
};

const DocCard = ({ item }: { item: Document }) => {
  const typeInfo = DOC_TYPE_MAP[item.type];
  const statusInfo = STATUS_MAP[item.status];

  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={[
          styles.docIcon,
          { backgroundColor: item.status === 'approved' ? '#E8F8F0' : item.status === 'pending' ? '#FEF9E7' : '#FDEDEC' }
        ]}>
          <Ionicons
            name={typeInfo.icon}
            size={24}
            color={item.status === 'approved' ? COLORS.success : item.status === 'pending' ? COLORS.warning : COLORS.error}
          />
        </View>
        <View style={styles.docInfo}>
          <Text style={styles.docName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.docType}>{typeInfo.label}</Text>
          <View style={styles.docMeta}>
            {item.fileSize && <Text style={styles.docSize}>{item.fileSize}</Text>}
            <Text style={styles.docDate}>{item.uploadedAt}</Text>
          </View>
        </View>
      </View>
      <Badge label={statusInfo.label} variant={statusInfo.variant} />
    </View>
  );
};

const REQUIRED_DOCS = [
  { key: 'title_deed', label: 'Tapu Belgesi', desc: 'Mülkiyet belgesi', required: true },
  { key: 'insurance', label: 'Konut Sigortası', desc: 'Geçerli sigorta poliçesi', required: true },
  { key: 'identity', label: 'Kimlik Belgesi', desc: 'TC Kimlik veya Pasaport', required: true },
  { key: 'tax', label: 'Vergi Levhası', desc: 'Güncel vergi belgesi', required: false },
];

export const DocumentsScreen = () => {
  const insets = useSafeAreaInsets();
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);

  const handleUpload = (type: string, label: string) => {
    Alert.alert(
      'Belge Yükle',
      `"${label}" belgesi yüklenecek. Devam etmek istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Yükle',
          onPress: () => {
            const newDoc: Document = {
              id: `doc_${Date.now()}`,
              name: `${label} - ${new Date().toLocaleDateString('tr-TR')}`,
              type: type as Document['type'],
              uri: 'file://new_doc.pdf',
              uploadedAt: new Date().toISOString().split('T')[0],
              status: 'pending',
              fileSize: '1.2 MB',
            };
            setDocuments((prev) => [newDoc, ...prev]);
            Alert.alert('Başarılı', 'Belgeniz yüklendi ve incelemeye alındı.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Belgelerim</Text>
      </View>

      {/* Info Banner */}
      <View style={styles.banner}>
        <Ionicons name="information-circle" size={20} color={COLORS.info} />
        <Text style={styles.bannerText}>
          İlanlarınız yayına alınmadan önce gerekli belgeler onaylanmalıdır.
        </Text>
      </View>

      {/* Required Docs Checklist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gerekli Belgeler</Text>
        <View style={styles.checklistCard}>
          {REQUIRED_DOCS.map((doc, i) => {
            const uploaded = documents.some((d) => d.type === doc.key);
            const approved = documents.some((d) => d.type === doc.key && d.status === 'approved');
            return (
              <View key={doc.key}>
                <View style={styles.checkRow}>
                  <Ionicons
                    name={approved ? 'checkmark-circle' : uploaded ? 'time' : 'ellipse-outline'}
                    size={22}
                    color={approved ? COLORS.success : uploaded ? COLORS.warning : COLORS.border}
                  />
                  <View style={styles.checkInfo}>
                    <Text style={styles.checkLabel}>
                      {doc.label}
                      {doc.required && <Text style={{ color: COLORS.error }}> *</Text>}
                    </Text>
                    <Text style={styles.checkDesc}>{doc.desc}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={() => handleUpload(doc.key, doc.label)}
                  >
                    <Ionicons name="cloud-upload-outline" size={16} color={COLORS.primary} />
                    <Text style={styles.uploadBtnText}>Yükle</Text>
                  </TouchableOpacity>
                </View>
                {i < REQUIRED_DOCS.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </View>

      {/* Uploaded Docs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yüklenen Belgeler ({documents.length})</Text>
      </View>

      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DocCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="document-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>Henüz belge yüklenmedi</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF5FB',
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  bannerText: { flex: 1, fontSize: 13, color: COLORS.info, lineHeight: 20 },
  section: { paddingHorizontal: SPACING.md, marginBottom: SPACING.xs },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  checklistCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: SPACING.md,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, gap: SPACING.sm },
  checkInfo: { flex: 1 },
  checkLabel: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  checkDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  uploadBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: SPACING.lg + 22 },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: SPACING.sm },
  docIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  docInfo: { flex: 1 },
  docName: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  docType: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  docMeta: { flexDirection: 'row', gap: SPACING.sm, marginTop: 4 },
  docSize: { fontSize: 11, color: COLORS.textSecondary },
  docDate: { fontSize: 11, color: COLORS.textSecondary },
  empty: { alignItems: 'center', paddingVertical: 40, gap: SPACING.sm },
  emptyText: { fontSize: 14, color: COLORS.textSecondary },
});
