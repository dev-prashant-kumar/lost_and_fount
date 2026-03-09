import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ixexerxfjbbkidcqafpw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZXhlcnhmamJia2lkY3FhZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5ODI4MTAsImV4cCI6MjA4NjU1ODgxMH0.xHak7Pxc_uW92FrSYJhVhsz_1ZmvOR-JHRgfpZNHwxo";

export const supabase = createClient(supabaseUrl, supabaseKey);