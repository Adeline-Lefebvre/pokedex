import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Pokedex.module.css";

interface PokemonInfos {
  name: string;
  abilities?: string[];
  forms?: string[];
  moves?: string[];
  types?: string[];
}

function Pokemon() {
  const router = useRouter();
  const { id } = router.query;

  const [pokeInfos, setPokeInfos] = useState<PokemonInfos | undefined>();

  useEffect(() => {
    const fetchInfos = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const poke = await res.json();
      const infos = {
        name: poke.name,
        abilities: poke.abilities?.map((ability: any) => ability.ability.name),
        forms: poke.forms?.map((form: any) => form.name),
        moves: poke.moves?.map((move: any) => move.move.name),
        types: poke.types?.map((type: any) => type.type.name),
      };
      setPokeInfos(infos);
    };

    fetchInfos();
  }, []);

  return (
    <div>
      {pokeInfos?.name ? (
        <div className={styles.name}>{pokeInfos?.name}</div>
      ) : (
        <div>Loading...</div>
      )}

      {pokeInfos?.abilities && (
        <div className={styles.infos}>
          <strong>Abilities :</strong>
          {pokeInfos.abilities.map((ability, index) => (
            <span key={index}> {ability}</span>
          ))}
        </div>
      )}

      {pokeInfos?.forms && (
        <div className={styles.infos}>
          <strong>Forms :</strong>
          {pokeInfos.forms.map((form, index) => (
            <span key={index}> {form}</span>
          ))}
        </div>
      )}

      {pokeInfos?.moves && (
        <div className={styles.infos}>
          <strong>Moves :</strong>
          {pokeInfos.moves.map((move, index) => (
            <span key={index}> {move}</span>
          ))}
        </div>
      )}

      {pokeInfos?.types && (
        <div className={styles.infos}>
          <strong>Types :</strong>
          {pokeInfos.types.map((type, index) => (
            <span key={index}> {type}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokemon;
