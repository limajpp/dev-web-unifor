async function searchBook() {
  const query = document.getElementById("book-input").value.trim();

  if (!query) {
    alert("Por favor, digite um título e um autor separados por vírgula!");
    return;
  }

  const [title, author] = query.split(",").map((item) => item.trim());

  if (!title || !author) {
    alert("Formato inválido! Digite no formato: Nome do Livro, Nome do Autor");
    return;
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    title
  )}+inauthor:${encodeURIComponent(author)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      document.getElementById("results").innerHTML = "Livro não encontrado.";
      return;
    }

    const book = data.items[0].volumeInfo;

    document.getElementById("results").innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Autor:</strong> ${
          book.authors ? book.authors.join(", ") : "Desconhecido"
        }</p>
        <p><strong>Ano de Publicação:</strong> ${
          book.publishedDate || "Desconhecido"
        }</p>
        <p><strong>Descrição:</strong> ${
          book.description || "Sem descrição disponível."
        }</p>
        ${
          book.imageLinks?.thumbnail
            ? `<img src="${book.imageLinks.thumbnail}" alt="Capa do livro">`
            : ""
        }
      `;
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    document.getElementById("results").innerHTML =
      "Ocorreu um erro ao buscar o livro.";
  }
}
