import { supabase } from "../config/supabaseClient.js";

export const getAnimes = async (req, res) => {
  // supabase => server/database => response = { data: [], error: {} ||  null }

  const { data, error } = await supabase.from("animes").select();

  return res.send(data);
};

export const createAnime = async (req, res) => {
  const { title, rating, release_year, episodes, hasDub } = req.body;

  if (!title || !rating || !release_year || !episodes || !hasDub) {
    throw new Error("Theres a missing field");
  }

  const { error } = await supabase.from("animes").insert(req.body);

  if (error) {
    console.log(error);

    return res.status(500).send({
      msg: "There was an error trying to create an anime on the database",
    });
  }

  return res
    .status(200)
    .send({ success: true, msg: "Successfully created a new anime" });
};
