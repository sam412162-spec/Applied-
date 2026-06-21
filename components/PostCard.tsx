import { Ionicons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PLATFORM_COLORS, PLATFORM_ICONS, Post } from '../data/posts';

export default function PostCard({ post }: { post: Post }) {
  const color = PLATFORM_COLORS[post.platform];
  const icon = PLATFORM_ICONS[post.platform] as any;

  return (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(post.url)} activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={[styles.platformBadge, { backgroundColor: color + '18' }]}>
          <Ionicons name={icon} size={14} color={color} />
          <Text style={[styles.platformText, { color }]}>{post.platform}</Text>
        </View>
        <Text style={styles.time}>{post.postedAt}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.emoji}>{post.logo}</Text>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
          <Text style={styles.source} numberOfLines={1}>{post.source}</Text>
          <Text style={styles.description} numberOfLines={2}>{post.description}</Text>
        </View>
      </View>

      <View style={styles.tags}>
        {post.tags.map(tag => (
          <View key={tag} style={[styles.tag, { borderColor: color + '40' }]}>
            <Text style={[styles.tagText, { color }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.footer, { borderTopColor: color + '20' }]}>
        <Ionicons name="open-outline" size={13} color={color} />
        <Text style={[styles.footerText, { color }]}>View on {post.platform}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  platformText: {
    fontSize: 12,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  body: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
    lineHeight: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  source: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
