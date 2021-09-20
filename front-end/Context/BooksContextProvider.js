import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const BooksContext = React.createContext();

export default function BooksContextProvider({ children }) {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddBookBarVisible, setIsAddBookBarVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    id: uuidv4(),
    title: "",
    author: "",
    genre: "",
    readingFlag: true,
  });
  const [books, setBooks] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const showAddBookBar = () => {
    setIsAddBookBarVisible(true);
  };

  const hideAddBookBar = () => {
    setIsAddBookBarVisible(false);
  };

  const addBook = () => {
    const emptyString = "";
    const checkIfBookAlreadyExists = books.find(
      (book) => book.title === newBook.title
    );
    if (
      newBook.title !== emptyString &&
      typeof checkIfBookAlreadyExists !== "object"
    ) {
      setBooks([...books, newBook]);
      setBooksReading([...booksReading, newBook]);
    }
  };

  const markAsRead = (selectedBook) => {
    const checkIfBookAlreadyExists = completedBooks.find(
      (book) => book.title === selectedBook.title
    );
    if (typeof checkIfBookAlreadyExists !== "object") {
      selectedBook.readingFlag = false;
      let newBooksList = books.filter((book) => book.id !== selectedBook.id);
      setBooksReading(newBooksList);
      let completedBook = books.filter((book) => book.id === selectedBook.id);
      setCompletedBooks([...completedBooks, ...completedBook]);
    }
  };

  const deleteBookEntry = (selectedBook) => {
    let updatedBooks = books.filter((book) => book.id !== selectedBook.id);
    let updatedBooksReading = booksReading.filter(
      (book) => book.id !== selectedBook.id
    );
    let updatedBooksCompleted = completedBooks.filter(
      (book) => book.id !== selectedBook.id
    );
    setNewBook({
      id: uuidv4(),
      title: "",
      author: "",
      genre: "",
      readingFlag: true,
    });
    setBooks(updatedBooks);
    setBooksReading(updatedBooksReading);
    setCompletedBooks(updatedBooksCompleted);
  };

  const addFormValues = (formValues) => {
    setNewBook((newBook) => ({
      ...newBook,
      ...formValues,
      id: uuidv4(),
    }));
  };

  useEffect(() => {
    addBook();
    setTotalCount(books.length);
    setReadingCount(booksReading.length);
    setReadCount(completedBooks.length);
  }, [newBook, booksReading, completedBooks, books]);

  useEffect(() => {
    setTotalCount(books.length);
    setReadingCount(booksReading.length);
    setReadCount(completedBooks.length);
  }, [booksReading, completedBooks, books]);

  const valObj = {
    totalCount,
    setTotalCount,
    readingCount,
    setReadingCount,
    readCount,
    setReadCount,
    isAddBookBarVisible,
    setIsAddBookBarVisible,
    newBook,
    setNewBook,
    books,
    setBooks,
    booksReading,
    setBooksReading,
    completedBooks,
    setCompletedBooks,
    addBook,
    markAsRead,
    addFormValues,
    deleteBookEntry,
    showAddBookBar,
    hideAddBookBar,
  };

  return (
    <BooksContext.Provider value={valObj}>{children}</BooksContext.Provider>
  );
}
