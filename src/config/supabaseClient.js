/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fhvtargnfyedetteywbw.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodnRhcmduZnllZGV0dGV5d2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1NjY3MDMsImV4cCI6MjAyNjE0MjcwM30.NuxdiVQhC-9UZPkaazHuwkTRAns6q_0nM8AlGmKj5UY"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
