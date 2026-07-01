import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSaved } from '../context/SavedContext';
import { MOCK_JOBS } from '../data/jobs';
import { fetchProfile, Profile, updateProfile } from '../lib/profile';

const SOURCES = [
  { name: 'Indeed', icon: 'briefcase', color: '#2164f3', connected: true },
  { name: 'LinkedIn', icon: 'logo-linkedin', color: '#0077b5', connected: true },
  { name: 'Google Jobs', icon: 'search', color: '#4285f4', connected: false },
  { name: 'Glassdoor', icon: 'star', color: '#0caa41', connected: false },
  { name: 'Twitter/X', icon: 'logo-twitter', color: '#000', connected: false },
  { name: 'Reddit', icon: 'logo-reddit', color: '#ff4500', connected: false },
];

type FieldKey = 'full_name' | 'tagline' | 'location' | 'preferred_salary' | 'job_type_pref';

function defaultProfile(userId: string, fallbackName?: string): Profile {
  return {
    id: userId,
    full_name: fallbackName || 'Job Seeker',
    tagline: 'Open to new opportunities',
    skills: [],
    open_to_work: true,
  };
}

export default function ProfileScreen() {
  const { user } = useAuth();
  const { savedIds, appliedIds } = useSaved();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState<{ key: FieldKey; label: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [addingSkill, setAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchProfile(user.id)
      .then(p => setProfile(p ?? defaultProfile(user.id, user.user_metadata?.full_name)))
      .finally(() => setLoading(false));
  }, [user]);

  const persist = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;
    const previous = profile;
    setProfile({ ...profile, ...updates });
    try {
      await updateProfile(user.id, updates);
    } catch {
      setProfile(previous);
      Alert.alert('Update failed', 'Could not save your changes. Please try again.');
    }
  };

  const openFieldEditor = (key: FieldKey, label: string) => {
    setEditValue((profile?.[key] as string) ?? '');
    setEditField({ key, label });
  };

  const saveField = () => {
    if (!editField) return;
    persist({ [editField.key]: editValue.trim() });
    setEditField(null);
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    setNewSkill('');
    setAddingSkill(false);
    if (!skill || !profile || profile.skills.includes(skill)) return;
    persist({ skills: [...profile.skills, skill] });
  };

  const removeSkill = (skill: string) => {
    if (!profile) return;
    persist({ skills: profile.skills.filter(s => s !== skill) });
  };

  const toggleOpenToWork = () => {
    if (!profile) return;
    persist({ open_to_work: !profile.open_to_work });
  };

  if (loading || !profile) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color="#111" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(profile.full_name || 'J')[0].toUpperCase()}</Text>
        </View>
        <TouchableOpacity onPress={() => openFieldEditor('full_name', 'Name')}>
          <Text style={styles.name}>{profile.full_name || 'Job Seeker'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openFieldEditor('tagline', 'Tagline')}>
          <Text style={styles.tagline}>{profile.tagline || 'Open to new opportunities'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.openBadge} onPress={toggleOpenToWork}>
          <View style={[styles.greenDot, !profile.open_to_work && styles.greyDot]} />
          <Text style={[styles.openText, !profile.open_to_work && styles.greyText]}>
            {profile.open_to_work ? 'Open to work' : 'Not looking'}
          </Text>
        </TouchableOpacity>
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
          {profile.skills.map(skill => (
            <TouchableOpacity key={skill} style={styles.skillChip} onPress={() => removeSkill(skill)}>
              <Text style={styles.skillText}>{skill}</Text>
              <Ionicons name="close" size={12} color="#6366f1" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          ))}
          {addingSkill ? (
            <View style={styles.addSkillRow}>
              <TextInput
                style={styles.addSkillInput}
                placeholder="New skill"
                placeholderTextColor="#aaa"
                value={newSkill}
                onChangeText={setNewSkill}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={addSkill}
              />
              <TouchableOpacity onPress={addSkill} hitSlop={8}>
                <Ionicons name="checkmark" size={20} color="#059669" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setAddingSkill(false); setNewSkill(''); }} hitSlop={8}>
                <Ionicons name="close" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addChip} onPress={() => setAddingSkill(true)}>
              <Ionicons name="add" size={14} color="#6366f1" />
              <Text style={styles.addText}>Add skill</Text>
            </TouchableOpacity>
          )}
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
        <TouchableOpacity style={styles.prefRow} onPress={() => openFieldEditor('preferred_salary', 'Preferred salary')}>
          <Ionicons name="cash-outline" size={18} color="#6366f1" style={{ marginRight: 12 }} />
          <Text style={styles.prefLabel}>Preferred salary</Text>
          <Text style={styles.prefValue}>{profile.preferred_salary || 'Not set'}</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.prefRow} onPress={() => openFieldEditor('job_type_pref', 'Job type')}>
          <Ionicons name="briefcase-outline" size={18} color="#6366f1" style={{ marginRight: 12 }} />
          <Text style={styles.prefLabel}>Job type</Text>
          <Text style={styles.prefValue}>{profile.job_type_pref || 'Not set'}</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.prefRow} onPress={() => openFieldEditor('location', 'Location')}>
          <Ionicons name="location-outline" size={18} color="#6366f1" style={{ marginRight: 12 }} />
          <Text style={styles.prefLabel}>Location</Text>
          <Text style={styles.prefValue}>{profile.location || 'Not set'}</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>

      <Modal visible={!!editField} transparent animationType="fade" onRequestClose={() => setEditField(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit {editField?.label}</Text>
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              autoFocus
              placeholder={editField?.label}
              placeholderTextColor="#aaa"
              returnKeyType="done"
              onSubmitEditing={saveField}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setEditField(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={saveField}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  centered: { alignItems: 'center', justifyContent: 'center' },
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
  greyDot: { backgroundColor: '#9ca3af' },
  openText: { fontSize: 12, fontWeight: '600', color: '#16a34a' },
  greyText: { color: '#6b7280' },
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
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10, alignItems: 'center' },
  skillChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ede9fe', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6 },
  skillText: { fontSize: 13, fontWeight: '600', color: '#6366f1' },
  addChip: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1.5, borderColor: '#c7d2fe', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6, borderStyle: 'dashed' },
  addText: { fontSize: 13, fontWeight: '600', color: '#6366f1' },
  addSkillRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 4, borderWidth: 1.5, borderColor: '#c7d2fe' },
  addSkillInput: { fontSize: 13, color: '#222', minWidth: 90, paddingVertical: 4 },
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 30 },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%' },
  modalTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 14 },
  modalInput: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#222',
    marginBottom: 16,
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  modalCancelBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  modalCancelText: { fontSize: 14, fontWeight: '600', color: '#888' },
  modalSaveBtn: { backgroundColor: '#111', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  modalSaveText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
