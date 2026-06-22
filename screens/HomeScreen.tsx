import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import JobCard from '../components/JobCard';
import { ALL_JOB_TYPES, ALL_PLATFORMS, JobType, MOCK_JOBS, Platform, PLATFORM_COLORS } from '../data/jobs';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedType, setSelectedType] = useState<JobType | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_JOBS.filter(job => {
      if (selectedPlatform && job.platform !== selectedPlatform) return false;
      if (selectedType && job.jobType !== selectedType) return false;
      if (remoteOnly && !job.remote) return false;
      if (q && !job.title.toLowerCase().includes(q) &&
          !job.company.toLowerCase().includes(q) &&
          !job.tags.some(t => t.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [search, selectedPlatform, selectedType, remoteOnly]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.title}>Find your next role</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Job title, company, skill..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color="#bbb" />
          </TouchableOpacity>
        )}
      </View>

      {/* Remote toggle */}
      <View style={styles.remoteRow}>
        <TouchableOpacity
          style={[styles.remoteToggle, remoteOnly && styles.remoteToggleOn]}
          onPress={() => setRemoteOnly(v => !v)}
        >
          <Ionicons name="wifi-outline" size={14} color={remoteOnly ? '#fff' : '#16a34a'} />
          <Text style={[styles.remoteToggleText, remoteOnly && { color: '#fff' }]}>Remote only</Text>
        </TouchableOpacity>
        <Text style={styles.resultsCount}>{filtered.length} job{filtered.length !== 1 ? 's' : ''}</Text>
      </View>

      {/* Platform filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillScroll}
        contentContainerStyle={styles.pillContent}
      >
        <TouchableOpacity
          style={[styles.pill, !selectedPlatform && styles.pillActive]}
          onPress={() => setSelectedPlatform(null)}
        >
          <Text style={[styles.pillText, !selectedPlatform && styles.pillTextActive]}>All Platforms</Text>
        </TouchableOpacity>
        {ALL_PLATFORMS.map(p => {
          const active = selectedPlatform === p;
          const c = PLATFORM_COLORS[p];
          return (
            <TouchableOpacity
              key={p}
              style={[styles.pill, active && { backgroundColor: c, borderColor: c }]}
              onPress={() => setSelectedPlatform(active ? null : p)}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Job type filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.pillScroll, { marginTop: 4 }]}
        contentContainerStyle={styles.pillContent}
      >
        <TouchableOpacity
          style={[styles.pill, !selectedType && styles.pillActive]}
          onPress={() => setSelectedType(null)}
        >
          <Text style={[styles.pillText, !selectedType && styles.pillTextActive]}>All Types</Text>
        </TouchableOpacity>
        {ALL_JOB_TYPES.map(t => {
          const active = selectedType === t;
          return (
            <TouchableOpacity
              key={t}
              style={[styles.pill, active && styles.pillActive]}
              onPress={() => setSelectedType(active ? null : t)}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{t}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Job list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your filters</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  remoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  remoteToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1.5,
    borderColor: '#16a34a',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  remoteToggleOn: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  remoteToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#16a34a',
  },
  resultsCount: {
    fontSize: 12,
    color: '#aaa',
  },
  pillScroll: {
    maxHeight: 42,
  },
  pillContent: {
    paddingHorizontal: 20,
    gap: 7,
    alignItems: 'center',
  },
  pill: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  pillActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  pillTextActive: {
    color: '#fff',
  },
  list: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#aaa',
  },
});
