import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Job, JOB_TYPE_COLORS, PLATFORM_COLORS, PLATFORM_ICONS } from '../data/jobs';
import { useSaved } from '../context/SavedContext';

interface Props {
  job: Job;
  onPress?: () => void;
}

export default function JobCard({ job, onPress }: Props) {
  const { isSaved, isApplied, toggleSaved, applyToJob } = useSaved();
  const color = PLATFORM_COLORS[job.platform];
  const icon = PLATFORM_ICONS[job.platform] as any;
  const saved = isSaved(job.id);
  const applied = isApplied(job.id);

  const handleApply = () => {
    applyToJob(job.id, job.url);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      {/* Top row: platform badge + save button */}
      <View style={styles.topRow}>
        <View style={[styles.platformBadge, { backgroundColor: color + '18' }]}>
          <Ionicons name={icon} size={13} color={color} />
          <Text style={[styles.platformText, { color }]}>{job.platform}</Text>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.postedAt}>{job.postedAt}</Text>
          <TouchableOpacity onPress={() => toggleSaved(job.id)} hitSlop={8}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={saved ? '#f59e0b' : '#bbb'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Company logo + title */}
      <View style={styles.bodyRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>{job.logo}</Text>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
          <Text style={styles.company}>{job.company} · {job.location}</Text>
        </View>
      </View>

      {/* Job type + level badges */}
      <View style={styles.badgeRow}>
        <View style={[styles.typeBadge, { backgroundColor: JOB_TYPE_COLORS[job.jobType] + '18' }]}>
          <Text style={[styles.typeText, { color: JOB_TYPE_COLORS[job.jobType] }]}>{job.jobType}</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{job.experienceLevel}</Text>
        </View>
        {job.remote && (
          <View style={styles.remoteBadge}>
            <Ionicons name="wifi-outline" size={11} color="#16a34a" />
            <Text style={styles.remoteText}>Remote</Text>
          </View>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>{job.description}</Text>

      {/* Salary */}
      {job.salary && (
        <View style={styles.salaryRow}>
          <Ionicons name="cash-outline" size={13} color="#555" />
          <Text style={styles.salary}>{job.salary}</Text>
        </View>
      )}

      {/* Tags */}
      <View style={styles.tagsRow}>
        {job.tags.slice(0, 3).map(tag => (
          <View key={tag} style={[styles.tag, { borderColor: color + '40' }]}>
            <Text style={[styles.tagText, { color }]}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Apply button */}
      <TouchableOpacity
        style={[styles.applyBtn, applied && styles.applyBtnDone]}
        onPress={handleApply}
        activeOpacity={0.8}
      >
        <Ionicons name={applied ? 'checkmark-circle' : 'send'} size={15} color="#fff" />
        <Text style={styles.applyText}>{applied ? 'Applied' : 'Apply Now'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
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
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postedAt: {
    fontSize: 12,
    color: '#aaa',
  },
  bodyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  logoCircle: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#f4f6fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 22,
  },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },
  company: {
    fontSize: 13,
    color: '#777',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  typeBadge: {
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  levelBadge: {
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: '#f1f5f9',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  remoteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: '#dcfce7',
  },
  remoteText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16a34a',
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
    marginBottom: 10,
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  salary: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  tagsRow: {
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
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#111',
    borderRadius: 12,
    paddingVertical: 11,
  },
  applyBtnDone: {
    backgroundColor: '#059669',
  },
  applyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
