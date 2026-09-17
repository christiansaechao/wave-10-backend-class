import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("There was an issue with the credentials");
}

// creating a client connection => connecting to the database
// identify our database, something we own
export const supabase = createClient(supabaseUrl, supabaseKey);