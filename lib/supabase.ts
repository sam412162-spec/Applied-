import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uhtgrkvbksemgnxyevsz.supabase.co';
const supabaseAnonKey = 'sb_publishable_zJ3xSOd6nzdxhGb6NIQTxQ__dPC_Vg4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
