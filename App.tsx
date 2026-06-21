import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PostCard from './components/PostCard';
import { MOCK_POSTS, PLATFORM_COLORS, Platform } from './data/posts';

const ALL_PLATFORMS: Platform[] = ['Indeed', 'LinkedIn', 'Google', 'Twitter', 'Reddit', 'Glassdoor'];

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Platform | null>(null);

  const filtered = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchPlatform = selected ? post.platform === selected : true;
      const query = search.toLowerCase();
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));
      return matchPlatform && matchSearch;
    });
  }, [search, selected]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PostFinder</Text>
        <Text style={styles.subtitle}>Discover opportunities across platforms</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts, skills, roles..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#bbb" />
          </TouchableOpacity>
        )}
      </View>

      {/* Platform filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillScroll}
        contentContainerStyle={styles.pillContent}
      >
        <TouchableOpacity
          style={[styles.pill, !selected && styles.pillActive]}
          onPress={() => setSelected(null)}
        >
          <Text style={[styles.pillText, !selected && styles.pillTextActive]}>All</Text>
        </TouchableOpacity>
        {ALL_PLATFORMS.map(p => {
          const active = selected === p;
          return (
            <TouchableOpacity
              key={p}
              style={[styles.pill, active && { backgroundColor: PLATFORM_COLORS[p], borderColor: PLATFORM_COLORS[p] }]}
              onPress={() => setSelected(active ? null : p)}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results count */}
      <Text style={styles.count}>{filtered.length} post{filtered.length !== 1 ? 's' : ''} found</Text>

      {/* Post list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No posts match your search</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  pillScroll: {
    maxHeight: 44,
  },
  pillContent: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  pillActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  pillTextActive: {
    color: '#fff',
  },
  count: {
    fontSize: 12,
    color: '#aaa',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 4,
  },
  list: {
    padding: 20,
    paddingTop: 8,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#aaa',
  },
});
