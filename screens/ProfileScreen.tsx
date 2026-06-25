import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSaved } from '../context/SavedContext';
import { MOCK_JOBS } from '../data/jobs';

const SKILLS = ['React Native', 'TypeScript', 'Node.js', 'UI/UX', 'SQL'];
const SOURCES = [
  { name: 'Indeed', icon: 'briefcase', color: '#2164f3', connected: true },
  { name: 'LinkedIn', icon: 'logo-linkedin', color: '#0077b5', connected: true },
  { name: 'Google Jobs', icon: 'search', color: '#4285f4', connected: false },
  { name: 'Glassdoor', icon: 'star', color: '#0caa41', connected: false },
  { name: 'Twitter/X', icon: 'logo-twitter', color: '#000', connected: false },
  { name: 'Reddit', icon: 'logo-reddit', color: '#ff4500', connected: false },
];

export default function ProfileScreen() {
  const { savedIds, appliedIds } = useSaved();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.name}>Job Seeker</Text>
        <Text style={styles.tagline}>Open to new opportunities</Text>
        <View style={styles.openBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.openText}>Open to work</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{MOCK_JOBS.length}</Text>
          <Text style={styles.statLabel}>Jobs found</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{savedIds.size}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: '#059669' }]}>{appliedIds.size}</Text>
          <Text style={styles.statLabel}>Applied</Text>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Skills</Text>
        <View style={styles.skillsRow}>
          {SKILLS.map(skill => (
            <View key={skill} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addChip}>
            <Ionicons name="add" size={14} color="#6366f1" />
            <Text style={styles.addText}>Add skill</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Job sources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Sources</Text>
        <Text style={styles.sectionSub}>Connect platforms to see their listings</Text>
        {SOURCES.map(src => (
          <View key={src.name} style={styles.sourceRow}>
            <View style={[styles.sourceIcon, { backgroundColor: src.color + '18' }]}>
              <Ionicons name={src.icon as any} size={18} color={src.color} />
            </View>
            <Text style={styles.sourceName}>{src.name}</Text>
            <TouchableOpacity style={[styles.connectBtn, src.connected && styles.connectedBtn]}>
              <Text style={[styles.connectText, src.connected && styles.connectedText]}>
                {src.connected ? '✓ Connected' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {[
          { label: 'Job alerts', icon: 'notifications-outline', value: 'On' },
          { label: 'Preferred salary', icon: 'cash-outline', value: 'R40k+/mo' },
          { label: 'Job type', icon: 'briefcase-outline', value: 'Full-time / Remote' },
          { label: 'Location', icon: 'location-outline', value: 'Cape Town & Remote' },
        ].map(item => (
          <TouchableOpacity key={item.label} style={styles.prefRow}>
            <Ionicons name={item.icon as any} size={18} color="#6366f1" style={{ marginRight: 12 }} />
            <Text style={styles.prefLabel}>{item.label}</Text>
            <Text style={styles.prefValue}>{item.value}</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  content: { paddingBottom: 50 },
  avatarSection: { alignItems: 'center', paddingTop: 30, paddingBottom: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 4 },
  tagline: { fontSize: 14, color: '#777', marginBottom: 10 },
  openBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#dcfce7', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  greenDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#16a34a' },
  openText: { fontSize: 12, fontWeight: '600', color: '#16a34a' },
  statsRow: { flexDirection: 'row', marginHorizontal: 20, gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNum: { fontSize: 24, fontWeight: '800', color: '#111', marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#aaa', fontWeight: '600' },
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 4 },
  sectionSub: { fontSize: 12, color: '#aaa', marginBottom: 12 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  skillChip: { backgroundColor: '#ede9fe', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6 },
  skillText: { fontSize: 13, fontWeight: '600', color: '#6366f1' },
  addChip: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1.5, borderColor: '#c7d2fe', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6, borderStyle: 'dashed' },
  addText: { fontSize: 13, fontWeight: '600', color: '#6366f1' },
  sourceRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8 },
  sourceIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  sourceName: { flex: 1, fontSize: 14, fontWeight: '600', color: '#222' },
  connectBtn: { borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  connectedBtn: { borderColor: '#059669', backgroundColor: '#dcfce7' },
  connectText: { fontSize: 12, fontWeight: '600', color: '#64748b' },
  connectedText: { color: '#059669' },
  prefRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  prefLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#222' },
  prefValue: { fontSize: 13, color: '#aaa', marginRight: 6 },
});
