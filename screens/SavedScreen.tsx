import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import JobCard from '../components/JobCard';
import { useSaved } from '../context/SavedContext';
import { MOCK_JOBS } from '../data/jobs';

export default function SavedScreen() {
  const { savedIds, appliedIds } = useSaved();

  const savedJobs = MOCK_JOBS.filter(j => savedIds.has(j.id));
  const appliedJobs = MOCK_JOBS.filter(j => appliedIds.has(j.id));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved & Applied</Text>

      {/* Applied summary banner */}
      {appliedJobs.length > 0 && (
        <View style={styles.appliedBanner}>
          <Ionicons name="checkmark-circle" size={18} color="#059669" />
          <Text style={styles.appliedText}>
            You've applied to <Text style={styles.appliedCount}>{appliedJobs.length}</Text> job{appliedJobs.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {savedJobs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔖</Text>
          <Text style={styles.emptyTitle}>No saved jobs yet</Text>
          <Text style={styles.emptySub}>Tap the bookmark icon on any job to save it here</Text>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <JobCard job={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.sectionLabel}>{savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  appliedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  appliedText: { fontSize: 13, color: '#166534' },
  appliedCount: { fontWeight: '700' },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  list: { padding: 20, paddingTop: 8, paddingBottom: 40 },
  empty: { flex: 1, alignItems: 'center', paddingTop: 100 },
  emptyIcon: { fontSize: 50, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 6 },
  emptySub: { fontSize: 14, color: '#aaa', textAlign: 'center', paddingHorizontal: 40 },
});
