import express from 'express';
import routes from '../routes.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

try {
    //change the uri to the one provided by mongodb
    const uri = 'mongodb://localhost:27017/techstore';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to MongoDB: ', err);
}

app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);

app.listen(3000, () => { console.log('Server started on http://localhost:3000'); });