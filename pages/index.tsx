import Head from "next/head";
import styles from "../styles/Pokedex.module.css";
import { useState } from "react";
import Link from "next/link";
import { Autocomplete, Grid, TextField } from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
}

interface Type {
  name: string;
  url: string;
}

interface PokeProps {
  pokemons: Pokemon[];
  types: Type[];
}

const Home = (props: PokeProps) => {
  const { pokemons, types } = props;
  const [pokes, setPokes] = useState<Pokemon[]>(pokemons);

  const fetchPokemons = async (url?: string) => {
    if (!url) {
      setPokes(pokemons);
    } else {
      const res = await fetch(url);
      const type = await res.json();
      setPokes(type.pokemon.map((poke: any) => poke.pokemon));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex by Adeline</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <img className={styles.img1} src="/pokemon.svg" alt="" />
          <h1 className={styles.title}>Pokedex</h1>
        </div>

        <p>Filtrer par type :</p>

        <Autocomplete
          options={types}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Type" />}
          onChange={(e, value) => fetchPokemons(value?.url)}
        />

        <Grid
          container
          spacing={6}
          justifyContent="center"
          sx={{ marginTop: "1em" }}
        >
          {pokes.map((pokemon, index) => {
            const { name, url } = pokemon;
            const tab = url.split("/");
            const id = tab[tab.length - 2];
            return (
              <Grid item key={index}>
                <Link href="/pokemon/[id]" as={`/pokemon/${id}`}>
                  <a>{name}</a>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </main>

      <footer className={styles.footer}>
        <div>Pokedex by Adeline</div>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const pokeRes = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemons = await pokeRes.json();

  const typesRes = await fetch("https://pokeapi.co/api/v2/type");
  const types = await typesRes.json();
  return { props: { pokemons: pokemons.results, types: types.results } };
}

export default Home;
