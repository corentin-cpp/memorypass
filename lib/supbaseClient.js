import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qxtmxsqywsbdvcjvsoyn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dG14c3F5d3NiZHZjanZzb3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjI1MTcsImV4cCI6MjA2MDczODUxN30.G3FDohI_q-aqmAd5ViO1iRcIXgyViAGFzzxD-1TBMt0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);