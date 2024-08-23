const Book = require('../models/book');

exports.getBooks = async (req, res, next) => {
    console.log("get Books Called");

    try {
        // Fetch all books from the database
        const books = await Book.findAll();

        // Update the fine for each book dynamically
        const updatedBooks = books.map(book => {
            const currentTime = new Date();
            const timeDifference = currentTime - book.updatedAt;

            // Convert milliseconds to hours
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            book.currentFine = hours * 10;

            return book;
        });

        // Save updated fines to the database (if you want to persist the changes)
        for (let book of updatedBooks) {
            await book.save();
        }

        // Send the books data as the response
        res.send(updatedBooks);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching books:", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
};

exports.createBook = async (req, res, next)=>{
    try {
        // create book in the databas
        let name = req.body.name;
        // console.log(name);
        let status = req.body.status;
        // console.log(status);
        
        
        const book = await Book.create({name, status});
        
        // Send the book data as the response
        res.send(book);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error Creating book:", error);
        res.status(500).send({ message: "Failed to Create the book" });
    }
}

exports.updateBook = async (req, res, next)=>{
    try{
        let id = req.body.id;
        let book = await Book.findByPk(id);
        book.status = "returned";
        let currentTime = new Date();

        let timeDifference = currentTime - book.updatedAt;

        // Convert milliseconds to a more human-readable format (e.g., seconds, minutes, hours)
        let seconds = Math.floor(timeDifference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        book.currentFine = hours*10;
        console.log(book);
        

        book.save();
        res.send(book);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error returning book:", error);
        res.status(500).send({ message: "Failed to return the book" });
    }   
}