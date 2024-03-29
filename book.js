export class Book {
  constructor(bookData) {
    if (!bookData.title) {
      throw new Error("Не задано название")
    }
    if (!bookData.author) {
      throw new Error("Не задан автор")
    }
    if (!bookData.year) {
      throw new Error("Не задан год")
    }
    if (!bookData.genre) {
      throw new Error("Не задан жанр")
    }
    if (!bookData.rating && !bookData.rating_ && bookData.rating !== 0 && bookData.rating_ !== 0) {
      throw new Error("Не задан рейтинг")
    }
    this.title = bookData.title
    this.author = bookData.author
    this.year = bookData.year
    this.genre = bookData.genre
    this.rating = bookData.rating || bookData.rating_

    // уникальный идентификатор
    this.uuid = bookData.uuid || this._generateUUID()
  }

  set rating(value) {
    if (value >= 0 && value <= 10) {
      this.rating_ = parseInt(value)
    } else {
      throw new Error('Некорректное значение рейтинга')
    }
  }

  get rating() {
    return this.rating_
  }

  get getAll() {
    return `"${this.title}", ${this.author}, ${this.year}, ${this.genre}, ${this.rating}`
  }

  toString() {
    return this.getAll
  }

  toExport() {
    let {title, author, year, genre, rating} = this;
    return {
      title,
      author,
      year,
      genre,
      rating
    }
  }

  /**
   * Генерирует уникальный id книги
   * @return {string}
   * @private
   */
  _generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Далее тестовые данные (по условию задания):

const booksData = [
  {
    title: "Преступление и наказание",
    author: "Ф. М. Достоевский",
    year: 1866,
    genre: "Роман",
    rating: 10,
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    year: 1949,
    genre: "Роман",
    rating: 7,
  },
  {
    title: "О мышах и людях",
    author: "Джон Стейнбек",
    year: 1937,
    genre: "Повесть",
    rating: 5,
  }
]

const books = booksData.map(bookData => new Book(bookData))

function sortBooksByRating(books) {
  return books.sort((a, b) => b.rating - a.rating);
}

function filterBooksByGenre(books, genre) {
  return books.filter(book => book.genre === genre);
}

function findBookByTitle(books, title) {
  return books.find(book => book.title === title) || null;
}

console.log(sortBooksByRating(books))
console.log(filterBooksByGenre(books, "Роман"))
console.log(filterBooksByGenre(books, "Повесть"))
console.log(filterBooksByGenre(books, ""))
console.log(findBookByTitle(books, "1984"))
console.log(findBookByTitle(books, ""))