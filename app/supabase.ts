import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { FeedbackDatabase } from './feedbacksupabasetypes';
import { Database } from './supabasetypes';

const supabaseUrlStatisticFeedback = 'https://abwihcvfcdrutnjdghbw.supabase.co';
const supabaseAnonKeyStatisticFeedback = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2loY3ZmY2RydXRuamRnaGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTMzMDYsImV4cCI6MjA3MzAyOTMwNn0.D40AvvDjGWObGUFiNTN0k6ReMoXb1BHG5qpPtXoF5w4';

export const supabaseStatisticFeedback = createClient<FeedbackDatabase>(supabaseUrlStatisticFeedback, supabaseAnonKeyStatisticFeedback, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false,
  },
});


const supabaseUrl = 'https://odzsnrjocdmbajksnzpk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenNucmpvY2RtYmFqa3NuenBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNjk3NTcsImV4cCI6MjA3NDg0NTc1N30.LE8xoK5-rmAXnRJBx60-tNEIQq350sEs43PLoYWtQ8M';
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type LiveDataInsert = Database["public"]["Tables"]["Live Data"]["Insert"];
export type FeedbackDataInsert = FeedbackDatabase["public"]["Tables"]["matches_predictions"]["Insert"];
