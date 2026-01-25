const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');

const dbConnect = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// const authRoutes=require('./routes/authRoutes')
const authRoutes=require('./routes/authRoutes')

dotenv.config();

const app = express();
const server = http.createServer(app);

dbConnect().then(() => console.log('Connected to DB'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use('/', authRoutes);
app.use('/', productRoutes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
