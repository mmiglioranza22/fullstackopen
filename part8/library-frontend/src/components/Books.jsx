import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);

  // const allBooksResult = useQuery(ALL_BOOKS);
  const allBooksResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genreToSearch: genre },
  });

  useEffect(() => {
    if (!genre && allBooksResult.data) {
      setBooks(allBooksResult.data?.allBooks);
      const genres = new Set(
        allBooksResult.data.allBooks.map((book) => book.genres).flat()
      );
      setGenres(Array.from(genres));
    }
  }, []);
  console.log(genres, books);

  useEffect(() => {
    if (allBooksResult.data) {
      console.log({ genre, allBooksResult });
      setBooks(allBooksResult.data?.allBooks);
      // const genres = new Set(
      //   allBooksResult.data.allBooks.map((book) => book.genres).flat()
      // );
      // setGenres(Array.from(genres));
    }
  }, [allBooksResult.data]);

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null;
  }

  if (allBooksResult.loading) {
    return <div>loading...</div>;
  }

  const handleFilter = (genre) => {
    console.log(genre);
    setGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          gap: "4px",
          marginTop: "8px",
          width: "450px",
          flexWrap: "wrap",
        }}
      >
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
