const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // Replace with the correct path to your app file
const LearningPath = require('./models/LearningPath'); // Adjust path as needed
const Lesson = require('./models/Lesson'); // Adjust path as needed

describe('Admin Panel API', () => {
    beforeAll(async () => {
        // Connect to your test database
        // use the url in env file
        const mongoURI = process.env.DB_URI;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Clean up and disconnect from the database
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        // Clear collections after each test
        await LearningPath.deleteMany({});
        await Lesson.deleteMany({});
    });

    test('should create a new learning path', async () => {
        const response = await request(app).post('/api/paths').send({
            title: 'Frontend Development',
            description: 'Learn how to build modern web applications.',
            slug: 'frontend-development',
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Frontend Development');
    });

    test('should fetch all learning paths', async () => {
        // Create test data
        await LearningPath.create([
            { title: 'Path 1', description: 'Description 1', slug: 'path-1' },
            { title: 'Path 2', description: 'Description 2', slug: 'path-2' },
        ]);

        const response = await request(app).get('/api/paths');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    test('should create a new lesson', async () => {
        const learningPath = await LearningPath.create({
            title: 'Backend Development',
            description: 'Learn to build scalable server-side applications.',
            slug: 'backend-development',
        });

        const response = await request(app).post('/api/lessons').send({
            title: 'Node.js Basics',
            description: 'Introduction to Node.js.',
            topic: 'Node.js',
            duration: 60,
            youtubeId: 'abcd1234',
            quizLink: 'http://quizlink.com',
            pathId: learningPath._id,
            order: 1,
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Node.js Basics');
    });

    test('should fetch all lessons for a learning path', async () => {
        const learningPath = await LearningPath.create({
            title: 'Data Science',
            description: 'Learn data analysis and machine learning.',
            slug: 'data-science',
        });

        await Lesson.create([
            {
                title: 'Lesson 1',
                description: 'Introduction to data analysis.',
                topic: 'Data Analysis',
                duration: 30,
                pathId: learningPath._id,
                order: 1,
            },
            {
                title: 'Lesson 2',
                description: 'Introduction to machine learning.',
                topic: 'Machine Learning',
                duration: 45,
                pathId: learningPath._id,
                order: 2,
            },
        ]);

        const response = await request(app).get(
            `/api/lessons?pathId=${learningPath._id}`
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    test('should update a learning path', async () => {
        const learningPath = await LearningPath.create({
            title: 'DevOps Basics',
            description: 'Learn the fundamentals of DevOps.',
            slug: 'devops-basics',
        });

        const response = await request(app)
            .put(`/api/paths/${learningPath._id}`)
            .send({ title: 'Advanced DevOps' });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Advanced DevOps');
    });

    test('should delete a learning path', async () => {
        const learningPath = await LearningPath.create({
            title: 'AI Fundamentals',
            description: 'Learn about artificial intelligence.',
            slug: 'ai-fundamentals',
        });

        const response = await request(app).delete(
            `/api/paths/${learningPath._id}`
        );
        expect(response.statusCode).toBe(200);
    });

    test('should update a lesson', async () => {
        const learningPath = await LearningPath.create({
            title: 'Web Development',
            description: 'Learn to build websites.',
            slug: 'web-development',
        });

        const lesson = await Lesson.create({
            title: 'CSS Basics',
            description: 'Introduction to CSS.',
            topic: 'CSS',
            duration: 40,
            pathId: learningPath._id,
            order: 1,
        });

        const response = await request(app)
            .put(`/api/lessons/${lesson._id}`)
            .send({ duration: 45 });

        expect(response.statusCode).toBe(200);
        expect(response.body.duration).toBe(45);
    });

    test('should delete a lesson', async () => {
        const learningPath = await LearningPath.create({
            title: 'Mobile Development',
            description: 'Learn to build mobile apps.',
            slug: 'mobile-development',
        });

        const lesson = await Lesson.create({
            title: 'React Native Basics',
            description: 'Introduction to React Native.',
            topic: 'React Native',
            duration: 50,
            pathId: learningPath._id,
            order: 1,
        });

        const response = await request(app).delete(
            `/api/lessons/${lesson._id}`
        );
        expect(response.statusCode).toBe(200);
    });
});
