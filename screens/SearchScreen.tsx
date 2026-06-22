import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import JobCard from '../components/JobCard';
import { ExperienceLevel, MOCK_JOBS } from '../data/jobs';

const LEVELS: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];
const LOCATIONS = ['All Locations', 'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Remote'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<ExperienceLevel | null>(null);
  const [location, setLocation] = useState('All Locations');

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return MOCK_JOBS.filter(job => {
      if (level && job.experienceLevel !== level) return false;
      if (location !== 'All Locations') {
        if (location === 'Remote' && !job.remote) return false;
        if (location !== 'Remote' && !job.location.includes(location)) return false;
      }
      if (q && !job.title.toLowerCase().includes(q) &&
          !job.company.toLowerCase().includes(q) &&
          !job.description.toLowerCase().includes(q) &&
          !job.tags.some(t => t.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, level, location]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search</Text>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Search jobs, skills, companies..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          autoFocus
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color="#bbb" />
          </TouchableOpacity>
        )}
      </View>

      {/* Experience level filter */}
      <View style={styles.section}>
        <Text style={styles.filterLabel}>Experience Level</Text>
        <View style={styles.chipRow}>
          {LEVELS.map(l => (
            <TouchableOpacity
              key={l}
              style={[styles.chip, level === l && styles.chipActive]}
              onPress={() => setLevel(level === l ? null : l)}
            >
              <Text style={[styles.chipText, level === l && styles.chipTextActive]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Location filter */}
      <View style={styles.section}>
        <Text style={styles.filterLabel}>Location</Text>
        <View style={styles.chipRow}>
          {LOCATIONS.map(loc => (
            <TouchableOpacity
              key={loc}
              style={[styles.chip, location === loc && styles.chipActive]}
              onPress={() => setLocation(loc)}
            >
              <Text style={[styles.chipText, location === loc && styles.chipTextActive]}>
                {loc === 'All Locations' ? 'Anywhere' : loc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.resultCount}>{results.length} result{results.length !== 1 ? 's' : ''}</Text>

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🧐</Text>
            <Text style={styles.emptyTitle}>No results</Text>
            <Text style={styles.emptySub}>Try different keywords or filters</Text>
          </View>
        }
      />
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
    paddingBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
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
  input: { flex: 1, fontSize: 14, color: '#222' },
  section: { paddingHorizontal: 20, marginBottom: 12 },
  filterLabel: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: '#111', borderColor: '#111' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#64748b' },
  chipTextActive: { color: '#fff' },
  resultCount: { fontSize: 12, color: '#aaa', paddingHorizontal: 20, marginBottom: 4 },
  list: { padding: 20, paddingTop: 8, paddingBottom: 40 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: '#333', marginBottom: 4 },
  emptySub: { fontSize: 14, color: '#aaa' },
});
